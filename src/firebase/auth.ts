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
 * Sends OTP code via Cloud Function on secondary Firebase app.
 *
 * @param phoneNumber - E.164 format (e.g., "+9647XXXXXXXXX")
 * @param options - Optional configuration
 * @returns Promise with confirm function to verify OTP
 */
export async function startPhoneSignIn(
  phoneNumber: string,
  options?: WhatsAppOTPOptions
): Promise<StartPhoneSignInResult> {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }

  console.log("[firebase:startPhoneSignIn]", { phoneNumber });

  const { getSecondaryApp } = await import("./config");
  const { getFunctions, httpsCallable } = await import("firebase/functions");

  const secondaryApp = await getSecondaryApp();
  const functions = getFunctions(secondaryApp);
  const sendFunctionName = options?.sendFunctionName || "whatsapp";

  // Call Cloud Function to send OTP via WhatsApp
  const sendOtpFunction = httpsCallable(functions, sendFunctionName);

  try {
    await sendOtpFunction({
      phoneNumber,
      projectName: options?.projectName || "serlab",
    });
    console.log("[firebase:startPhoneSignIn] OTP sent via WhatsApp");
  } catch (error) {
    console.error("[firebase:startPhoneSignIn] failed to send OTP", error);
    throw error;
  }

  // Return confirmation object with verify method
  return {
    confirm: async (code: string) => {
      console.log("[firebase:confirmPhoneCode] verifying code");

      // Set flag to prevent auth state sync during login
      __isSigningIn = true;

      const verifyFunctionName = options?.verifyFunctionName || "verifySMS";
      const verifyOtpFunction = httpsCallable(functions, verifyFunctionName);

      try {
        const response = await verifyOtpFunction({
          phoneNumber,
          code,
          projectName: options?.projectName || "serlab",
        });

        const customToken = (response.data as { token: string }).token;
        console.log("[firebase:confirmPhoneCode] custom token received");

        // Sign in with custom token on PRIMARY app
        const { getPrimaryApp } = await import("./config");
        const {
          getAuth,
          signInWithCustomToken,
          setPersistence,
          browserLocalPersistence,
        } = await import("firebase/auth");

        const primaryApp = await getPrimaryApp();
        const auth = getAuth(primaryApp);

        try {
          await setPersistence(auth, browserLocalPersistence);
          console.log("[firebase:confirmPhoneCode] persistence set to LOCAL");
        } catch (e) {
          console.warn(
            "[firebase:confirmPhoneCode] failed to set persistence",
            e
          );
        }
        // Try to sign in; if mismatch, provide a clear diagnostic error
        try {
          await signInWithCustomToken(auth, customToken);
          console.log(
            "[firebase:confirmPhoneCode] user signed in on primary app"
          );
        } catch (e: any) {
          const appProjectId = (primaryApp as any)?.options?.projectId;
          const payload = decodeJwtPayload(customToken) || {};
          // For Firebase custom tokens, aud is a fixed IdentityToolkit URL.
          // The projectId is best inferred from the issuer service account email.
          const tokenProjectId =
            extractProjectIdFromIss(payload.iss) || payload.project_id || null;
          const code = e?.code || e?.message || String(e);
          const likelyMismatch =
            code?.includes("auth/custom-token-mismatch") ||
            code?.includes("custom-token-mismatch") ||
            code?.includes("auth/invalid-custom-token") ||
            code?.includes("invalid-custom-token") ||
            code?.includes("CREDENTIAL_MISMATCH");

          if (likelyMismatch) {
            console.error(
              "[firebase:confirmPhoneCode] CREDENTIAL_MISMATCH → token project != client app",
              {
                code,
                clientProjectId: appProjectId,
                tokenIss: payload.iss,
                tokenProjectId,
                tokenAud: payload.aud,
              }
            );
            throw new Error(
              `CREDENTIAL_MISMATCH: Custom token was minted for project "${
                tokenProjectId ?? "<unknown>"
              }" but you are signing into "${appProjectId}". ` +
                `Ensure your verifySMS Cloud Function mints tokens using the PRIMARY project's service account (the same project used by getPrimaryApp).`
            );
          }
          // Re-throw any other error as-is
          throw e;
        }

        // Wait for auth state to update
        const { onAuthStateChanged } = await import("firebase/auth");
        await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {
              unsubscribe();
              resolve();
            }
          });
        });

        // Get fresh ID token with force refresh to ensure it's valid
        const { getIdToken } = await import("firebase/auth");
        const idToken = await getIdToken(auth.currentUser!, true);

        console.log(
          "[firebase:confirmPhoneCode] ID token obtained (refreshed)"
        );

        // Clear the flag BEFORE returning so app can proceed
        // The onIdTokenChanged from the refresh above will be skipped because flag is cleared
        __isSigningIn = false;
        console.log("[firebase:confirmPhoneCode] sign-in flag cleared");

        return idToken;
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
    console.log("[firebase:getFirebaseIdToken] fetching token", {
      forceRefresh,
    });
    return await getIdToken(user, forceRefresh);
  } catch (e) {
    console.log("[firebase:getFirebaseIdToken] failed to get ID token", e);
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

  console.log("[firebase:signOutFirebase] signing out");
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

/**
 * Start auth state synchronization.
 * Listens to Firebase token changes and syncs to backend automatically.
 * Implements singleton pattern, debouncing, and persistent guard.
 *
 * @param options - Configuration options
 * @returns Unsubscribe function
 */
export async function startAuthStateSync(options?: {
  loginEndpoint?: string;
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
    const endpoint = options?.loginEndpoint || "/api/auth/login";

    try {
      await setPersistence(auth, browserLocalPersistence);
      console.log("[firebase:startAuthStateSync] persistence set");
    } catch (e) {
      console.warn(
        "[firebase:startAuthStateSync] failed to set persistence",
        e
      );
    }

    const STORAGE_KEY = "erp_core_last_tp_id";
    const pushTokenToServer = async (forceRefresh = false) => {
      // Skip if currently signing in to prevent duplicate token syncs
      if (__isSigningIn) {
        console.log(
          "[firebase:startAuthStateSync] skipping sync during sign-in"
        );
        return;
      }

      try {
        const user = auth.currentUser;
        if (!user) return;
        // Only read the current token; don't force refresh unless explicitly requested
        const token = await getIdToken(user, forceRefresh);
        if (!token) return;

        const now = Date.now();
        // In-memory debounce
        if (token === __lastSyncedToken && now - __lastSyncTime < 3000) return;
        // Persistent guard: if token equals the one we already synced on last session reload, skip
        try {
          const lastPersisted = localStorage.getItem(STORAGE_KEY);
          if (lastPersisted && lastPersisted === token) {
            return;
          }
        } catch {}

        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ thirdPartyToken: token }),
        });

        __lastSyncedToken = token;
        __lastSyncTime = now;
        try {
          localStorage.setItem(STORAGE_KEY, token);
        } catch {}
        console.log("[firebase:startAuthStateSync] token synced → server");
      } catch (e) {
        console.error("[firebase:startAuthStateSync] sync failed", e);
        options?.onError?.(e);
      }
    };

    // Subscribe once
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) return;
      // Only push when the token actually changes; onIdTokenChanged already signals that
      await pushTokenToServer(false);
    });

    // Do NOT push on init; only sync when the token changes

    __authSyncUnsubscribe = () => {
      try {
        unsubscribe();
      } catch {}
      __authSyncPromise = null;
      __authSyncUnsubscribe = null;
    };

    return __authSyncUnsubscribe;
  })();

  return __authSyncPromise;
}
