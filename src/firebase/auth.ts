
// Client-side helpers for Firebase Phone Auth

export type StartPhoneSignInResult = {
  confirm: (code: string) => Promise<any>;
};

// --- (UNCHANGED) startPhoneSignIn ---
export async function startPhoneSignIn(
  phoneNumber: string,
  recaptchaContainerId?: string
): Promise<StartPhoneSignInResult> {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber, recaptchaContainerId });

  const [
    { getAuth, signInWithPhoneNumber, setPersistence, browserLocalPersistence },
    { getFirebaseApp },
  ] = await Promise.all([import("firebase/auth"), import("./config")]);

  const app = await getFirebaseApp();
  const auth = getAuth(app);

  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("[firebase:startPhoneSignIn] persistence set to LOCAL");
  } catch (e) {
    console.warn("[firebase:startPhoneSignIn] failed to set persistence", e);
  }

  const verifier: any = {
    type: "recaptcha",
    verify: () => Promise.resolve(""),
    clear: () => {},
    _reset: () => {},
    _destroy: () => {},
    _widgetId: 0,
  };

  const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  console.log("[firebase:startPhoneSignIn] confirmation received");
  return confirmation as any;
}

// --- (UNCHANGED) confirmPhoneCode ---
export async function confirmPhoneCode(
  confirmation: StartPhoneSignInResult,
  code: string
): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("confirmPhoneCode must be called in the browser");
  }
  console.log("[firebase:confirmPhoneCode] confirming code");

  const result = await confirmation.confirm(code);
  const user = result.user;

  console.log("[firebase:confirmPhoneCode] user signed in", { uid: user?.uid });

  const { getIdToken } = await import("firebase/auth");
  const idToken = await getIdToken(user, true);

  try {
    const { getIdTokenResult } = await import("firebase/auth");
    const tokenResult = await getIdTokenResult(user);
    console.log("[firebase:confirmPhoneCode] token metadata", {
      expiresAt: tokenResult.expirationTime,
      issuedAt: tokenResult.issuedAtTime,
    });
  } catch (e) {
    console.log("[firebase:confirmPhoneCode] idTokenResult unavailable", e);
  }

  return idToken;
}

// --- (UNCHANGED) getFirebaseIdToken ---
export async function getFirebaseIdToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;

  const [{ getAuth }, { getIdToken }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth"),
  ]);
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;

  try {
    console.log("[firebase:getFirebaseIdToken] fetching token", { forceRefresh });
    return await getIdToken(user, forceRefresh);
  } catch (e) {
    console.log("[firebase:getFirebaseIdToken] failed to get ID token", e);
    return null;
  }
}

// --- (UNCHANGED) signOutFirebase ---
export async function signOutFirebase(): Promise<void> {
  if (typeof window === "undefined") return;
  const { getAuth, signOut } = await import("firebase/auth");
  const auth = getAuth();
  console.log("[firebase:signOutFirebase] signing out");
  await signOut(auth);
}

// ============================================================================
// ✔ REWRITTEN: startAuthStateSync (optimized forever-session)
// ============================================================================

// Global singleton control
let __authSyncUnsubscribe: (() => void) | null = null;
let __authSyncStarted = false;
let __lastSyncedToken: string | null = null;
let __lastSyncTime = 0;

const TOKEN_SYNC_DEBOUNCE = 3000;

export async function startAuthStateSync(options?: {
  loginEndpoint?: string;
  onError?: (e: any) => void;
  refreshOnInit?: boolean;
}): Promise<() => void> {
  if (typeof window === "undefined") {
    console.warn("[firebase:startAuthStateSync] cannot run on server");
    return () => {};
  }

  // Already running → return the unsubscribe
  if (__authSyncStarted && __authSyncUnsubscribe) {
    return __authSyncUnsubscribe;
  }

  const {
    getAuth,
    onIdTokenChanged,
    getIdToken,
    setPersistence,
    browserLocalPersistence,
  } = await import("firebase/auth");

  const auth = getAuth();
  const endpoint = options?.loginEndpoint || "/api/auth/login";

  // Ensure Firebase session persists forever
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("[firebase:startAuthStateSync] persistence = browserLocalPersistence");
  } catch (e) {
    console.warn("[firebase:startAuthStateSync] failed to set persistence", e);
  }

  const pushTokenToServer = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await getIdToken(user, true);
      if (!token) return;

      const now = Date.now();

      // Prevent duplicate / spam pushes
      if (token === __lastSyncedToken && now - __lastSyncTime < TOKEN_SYNC_DEBOUNCE) {
        console.log("[firebase:startAuthStateSync] skip duplicate token sync");
        return;
      }

      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thirdPartyToken: token }),
      });

      __lastSyncedToken = token;
      __lastSyncTime = now;

      console.log("[firebase:startAuthStateSync] token synced → server");
    } catch (e) {
      console.error("[firebase:startAuthStateSync] sync failed", e);
      options?.onError?.(e);
    }
  };

  // Subscribe ONCE
  const unsubscribe = onIdTokenChanged(auth, async (user) => {
    if (!user) return;
    await pushTokenToServer();
  });

  // Optional initial sync
  if (options?.refreshOnInit) pushTokenToServer();

  // Save global unsubscribe
  __authSyncUnsubscribe = () => {
    try {
      unsubscribe();
    } catch {}
    __authSyncStarted = false;
    __authSyncUnsubscribe = null;
  };

  __authSyncStarted = true;

  return __authSyncUnsubscribe;
}
