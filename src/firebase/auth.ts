/**
 * Client-side helpers for Firebase Phone Auth via WhatsApp.
 * Uses dual Firebase apps: Primary for auth, Secondary for Cloud Functions.
 */

export type StartPhoneSignInResult = {
  confirm: (code: string) => Promise<string>;
};

export interface WhatsAppOTPOptions {
  /** Cloud Function name for sending OTP (default: "whatsapp") */
  sendFunctionName?: string;
  /** Cloud Function name for verifying OTP (default: "verifySMS") */
  verifyFunctionName?: string;
  /** Project name to pass to Cloud Functions */
  projectName?: string;
}

// Decode JWT payload without verification (for diagnostics only)
function decodeJwtPayload(token: string): any | null {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    // atob expects standard base64 (replace URL-safe chars)
    const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof window !== "undefined" && typeof atob === "function"
        ? atob(normalized)
        : Buffer.from(normalized, "base64").toString();
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function extractProjectIdFromIss(iss?: string | null): string | null {
  if (!iss) return null;
  // iss is usually a service account email like:
  //   firebase-adminsdk-xxxxx@PROJECT_ID.iam.gserviceaccount.com
  const atIdx = iss.indexOf("@");
  const suffix = ".iam.gserviceaccount.com";
  if (atIdx > -1 && iss.endsWith(suffix)) {
    const host = iss.slice(atIdx + 1); // PROJECT_ID.iam.gserviceaccount.com
    const projectId = host.slice(0, host.length - suffix.length);
    return projectId || null;
  }
  return null;
}

/**
 * Start phone sign-in via WhatsApp OTP.
 * Calls secure server-side API route to send OTP (keeps Cloud Functions hidden from client).
 *
 * @param phoneNumber - E.164 format (e.g., "+9647XXXXXXXXX")
 * @param options - Optional configuration
 * @returns Promise with confirm function to verify OTP
 */
export async function startPhoneSignIn(
  phoneNumber: string,
  options?: WhatsAppOTPOptions,
): Promise<StartPhoneSignInResult> {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }

  // Call secure server-side API route to send OTP
  // Server handles Cloud Functions, keeping them hidden from client
  const sendOtpEndpoint = options?.sendFunctionName || "/api/auth/send-otp";
  const projectName = options?.projectName || "serlab";

  try {
    const response = await fetch(sendOtpEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        projectName,
      }),
      credentials: "include",
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to send OTP");
    }
  } catch (error) {
    console.error("[firebase:startPhoneSignIn] failed to send OTP", error);
    throw error;
  }

  // Return confirmation object with verify method
  return {
    confirm: async (code: string) => {
      // Set flag to prevent auth state sync during login
      __isSigningIn = true;

      // Call secure server-side API route to verify OTP and complete login
      // Server handles: OTP verification, token exchange, backend login, cookie setting
      const verifyOtpEndpoint =
        options?.verifyFunctionName || "/api/auth/verify-otp";
      const projectName = options?.projectName || "serlab";

      try {
        const response = await fetch(verifyOtpEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber,
            code,
            projectName,
          }),
          credentials: "include",
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Failed to verify OTP");
        }

        // Server has already authenticated and set cookies
        // Now sync to Firebase by getting fresh token
        const { getPrimaryApp } = await import("./config");
        const { getAuth, setPersistence, browserLocalPersistence } =
          await import("firebase/auth");

        const primaryApp = await getPrimaryApp();
        const auth = getAuth(primaryApp);

        try {
          await setPersistence(auth, browserLocalPersistence);
        } catch {}

        // Wait a moment for auth state to update if needed
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get current token (server has authenticated the user)
        const { getIdToken } = await import("firebase/auth");
        const user = auth.currentUser;
        if (user) {
          const idToken = await getIdToken(user, true);
          __isSigningIn = false;
          return idToken;
        }

        __isSigningIn = false;
        // Return a dummy token - user is authenticated via session cookies
        return "";
      } catch (error) {
        console.error("[firebase:confirmPhoneCode] verification failed", error);
        __isSigningIn = false; // Clear flag on error
        throw error;
      }
    },
  };
}

/**
 * Get current user's Firebase ID token from primary app.
 *
 * @param forceRefresh - Force token refresh
 * @returns ID token or null if no user
 */
export async function getFirebaseIdToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;

  const [{ getAuth }, { getIdToken }, { getPrimaryApp }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth"),
    import("./config"),
  ]);

  const app = await getPrimaryApp();
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await getIdToken(user, forceRefresh);
  } catch (e) {
    return null;
  }
}

/**
 * Sign out current user from Firebase primary app.
 */
export async function signOutFirebase(): Promise<void> {
  if (typeof window === "undefined") return;

  const [{ getAuth, signOut }, { getPrimaryApp }] = await Promise.all([
    import("firebase/auth"),
    import("./config"),
  ]);

  const app = await getPrimaryApp();
  const auth = getAuth(app);

  await signOut(auth);
}

// ============================================================================
// startAuthStateSync: Syncs Firebase token changes to backend
// ============================================================================

const TOKEN_SYNC_DEBOUNCE = 3000;

let __authSyncUnsubscribe: (() => void) | null = null;
let __authSyncPromise: Promise<() => void> | null = null;
let __lastSyncedToken: string | null = null;
let __lastSyncTime = 0;
let __isSigningIn = false; // Flag to prevent sync during login
let __tokenRefreshTimer: ReturnType<typeof setTimeout> | null = null; // Timer for proactive token refresh

/**
 * Schedule proactive token refresh before expiration.
 * Prevents tp_id cookie from expiring by refreshing the Firebase token early.
 * 
 * @param token - Current Firebase ID token
 * @param auth - Firebase Auth instance
 */
const scheduleTokenRefresh = (token: string, auth: any) => {
  // Clear existing timer
  if (__tokenRefreshTimer) {
    clearTimeout(__tokenRefreshTimer);
    __tokenRefreshTimer = null;
  }

  // Decode token to get expiration time
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    console.warn("[firebase:scheduleTokenRefresh] Could not decode token expiration");
    return;
  }

  const expiresAt = payload.exp * 1000; // Convert to milliseconds
  const now = Date.now();
  const timeUntilExpiry = expiresAt - now;

  // Dynamic refresh timing based on token lifetime:
  // - For tokens > 10 min: refresh 5 min before expiration
  // - For tokens < 10 min: refresh at 80% of lifetime
  // This allows testing with short-lived tokens (e.g., 2 min → refresh at 1m36s)
  let refreshIn: number;
  const TEN_MINUTES = 10 * 60 * 1000;
  
  if (timeUntilExpiry > TEN_MINUTES) {
    // Long-lived token: refresh 5 minutes before expiration
    const REFRESH_BEFORE_EXPIRY_MS = 5 * 60 * 1000;
    refreshIn = Math.max(60000, timeUntilExpiry - REFRESH_BEFORE_EXPIRY_MS);
  } else {
    // Short-lived token (testing): refresh at 80% of lifetime
    refreshIn = Math.max(10000, timeUntilExpiry * 0.8); // Minimum 10 seconds
  }

  console.log(
    `[firebase:scheduleTokenRefresh] ⏰ Token expires in ${Math.round(timeUntilExpiry / 1000)}s, refreshing in ${Math.round(refreshIn / 1000)}s`
  );

  __tokenRefreshTimer = setTimeout(async () => {
    console.log("[firebase:scheduleTokenRefresh] 🔄 Proactively refreshing token before expiration...");
    try {
      const user = auth.currentUser;
      if (user) {
        const { getIdToken } = await import("firebase/auth");
        const newToken = await getIdToken(user, true); // Force refresh
        console.log("[firebase:scheduleTokenRefresh] ✅ Token refreshed successfully");
        // onIdTokenChanged will fire and handle syncing + rescheduling
      }
    } catch (e) {
      console.error("[firebase:scheduleTokenRefresh] ❌ Token refresh failed:", e);
    }
  }, refreshIn);
};

/**
 * Start auth state synchronization.
 * Listens to Firebase token changes and syncs to backend automatically.
 * Implements singleton pattern, debouncing, and persistent guard.
 * NOW WITH PROACTIVE TOKEN REFRESH to prevent tp_id expiration.
 *
 * @param options - Configuration options
 * @returns Unsubscribe function
 */
export async function startAuthStateSync(options?: {
  /** Deprecated alias retained for consumers; this is now a proof-sync endpoint. */
  loginEndpoint?: string;
  proofSyncEndpoint?: string;
  onError?: (e: any) => void;
  refreshOnInit?: boolean;
}): Promise<() => void> {
  if (typeof window === "undefined") return () => {};

  // Already initializing or running → return the same promise
  if (__authSyncPromise) return __authSyncPromise;

  __authSyncPromise = (async () => {
    const {
      getAuth,
      onIdTokenChanged,
      getIdToken,
      setPersistence,
      browserLocalPersistence,
    } = await import("firebase/auth");

    const { getPrimaryApp } = await import("./config");

    const app = await getPrimaryApp();
    const auth = getAuth(app);
    // Firebase refresh only updates validated proof. ERP token issuance remains
    // an explicit login/logout/expiry/revocation operation on the server.
    const endpoint = options?.proofSyncEndpoint || options?.loginEndpoint || "/api/auth/proof/sync";

    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      console.warn(
        "[firebase:startAuthStateSync] failed to set persistence",
        e,
      );
    }

    // Use sessionStorage (cleared on tab close) with a hash instead of the raw token
    const STORAGE_KEY = "erp_core_last_sync_hash";

    // Simple hash function for deduplication (not for security)
    const hashToken = async (token: string): Promise<string> => {
      try {
        // Use SubtleCrypto if available for a quick hash
        if (typeof crypto !== "undefined" && crypto.subtle) {
          const encoder = new TextEncoder();
          const data = encoder.encode(token);
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        }
      } catch {}
      // Fallback: simple string hash (FNV-1a variant)
      let hash = 2166136261;
      for (let i = 0; i < token.length; i++) {
        hash ^= token.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      return (hash >>> 0).toString(36);
    };

    const pushTokenToServer = async (forceRefresh = false) => {
      // Skip if currently signing in to prevent duplicate token syncs
      if (__isSigningIn) {
        console.log("[firebase:startAuthStateSync] ⏭️ Skipping push (sign-in in progress)");
        return;
      }

      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("[firebase:startAuthStateSync] ℹ️ No current user found during push");
          return;
        }
        // Only read the current token; don't force refresh unless explicitly requested
        const token = await getIdToken(user, forceRefresh);
        if (!token) {
          console.log("[firebase:startAuthStateSync] ⚠️ Could not retrieve token during push");
          return;
        }

        const now = Date.now();
        // In-memory debounce
        if (token === __lastSyncedToken && now - __lastSyncTime < 3000) {
          console.log("[firebase:startAuthStateSync] ⏭️ Skipping push (debounced)");
          return;
        }

        // Persistent guard using hash: check sessionStorage (safer than localStorage)
        const tokenHash = await hashToken(token);
        try {
          const lastPersistedHash = sessionStorage.getItem(STORAGE_KEY);
          if (lastPersistedHash && lastPersistedHash === tokenHash) {
            console.log("[firebase:startAuthStateSync] ⏭️ Skipping push (already synced in this session)");
            return;
          }
        } catch {}
        console.log(
          "[firebase:startAuthStateSync] 🔄 Syncing fresh token to server at",
          endpoint,
        );

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ thirdPartyToken: token }),
        });
        console.log("[firebase:startAuthStateSync] ✅ Server responded to token sync:", response.status);

        __lastSyncedToken = token;
        __lastSyncTime = now;

        // Store only the hash in sessionStorage (cleared when tab closes)
        try {
          sessionStorage.setItem(STORAGE_KEY, tokenHash);
        } catch {}

        // Schedule proactive token refresh to prevent tp_id expiration
        scheduleTokenRefresh(token, auth);
      } catch (e) {
        console.error("[firebase:startAuthStateSync] ❌ Sync failed", e);
        options?.onError?.(e);
      }
    };

    // Subscribe once
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      console.log("[firebase:startAuthStateSync] 🔔 onIdTokenChanged triggered for user:", user?.uid || "none");
      if (!user) return;
      // Only push when the token actually changes; onIdTokenChanged already signals that
      await pushTokenToServer(false);
    });

    // Check if user is already logged in and schedule initial token refresh
    // This ensures we schedule refresh on page reload without forcing a sync
    if (auth.currentUser) {
      try {
        const token = await getIdToken(auth.currentUser, false);
        if (token) {
          console.log("[firebase:startAuthStateSync] 👤 User already logged in, scheduling token refresh");
          scheduleTokenRefresh(token, auth);
        }
      } catch (e) {
        console.warn("[firebase:startAuthStateSync] ⚠️ Could not schedule initial token refresh:", e);
      }
    }

    __authSyncUnsubscribe = () => {
      try {
        unsubscribe();
      } catch {}
      if (__tokenRefreshTimer) {
        clearTimeout(__tokenRefreshTimer);
        __tokenRefreshTimer = null;
      }
      __authSyncPromise = null;
      __authSyncUnsubscribe = null;
    };

    return __authSyncUnsubscribe;
  })();

  return __authSyncPromise;
}
