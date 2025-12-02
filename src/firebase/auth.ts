// Client-side helpers for Firebase Phone Auth

export type StartPhoneSignInResult = {
  // Firebase ConfirmationResult shape (minimal subset used)
  confirm: (code: string) => Promise<any>;
};

// Start phone auth using invisible or visible reCAPTCHA
export async function startPhoneSignIn(
  phoneNumber: string,
  recaptchaContainerId?: string
): Promise<StartPhoneSignInResult> {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber, recaptchaContainerId });

  const [{ getAuth, signInWithPhoneNumber, setPersistence, browserLocalPersistence }, { getFirebaseApp }] = await Promise.all([
    import("firebase/auth"),
    import("./config"),
  ]);

  const app = await getFirebaseApp();
  const auth = getAuth(app);

  // Ensure persistence is LOCAL so the user stays signed in across reloads until explicit sign-out
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("[firebase:startPhoneSignIn] persistence set to browserLocalPersistence");
  } catch (e) {
    console.warn("[firebase:startPhoneSignIn] failed to set persistence", e);
  }

  // Always disable reCAPTCHA per request: using a no-op ApplicationVerifier.
  // WARNING: This removes abuse protection and is not recommended for production environments.
  const verifier: any = {
    type: "recaptcha",
    verify: () => Promise.resolve("") as Promise<string>,
    clear: () => {},
    // Firebase internals may call private methods on RecaptchaVerifier; provide no-op shims
    _reset: () => {},
    _destroy: () => {},
    // Some flows expect a widget id; set to a constant
    _widgetId: 0,
  };

  const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  console.log("[firebase:startPhoneSignIn] signInWithPhoneNumber confirmation received");
  return confirmation as unknown as StartPhoneSignInResult;
}

// Confirm the SMS code and return the Firebase ID token
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
    const claims = tokenResult.claims || {} as any;
    console.log("[firebase:confirmPhoneCode] idToken acquired", {
      length: idToken?.length || 0,
      startsWith: typeof idToken === "string" ? idToken.slice(0, 10) : null,
      expiresAt: tokenResult.expirationTime,
      issuedAt: tokenResult.issuedAtTime,
      authTime: tokenResult.authTime,
      provider: claims.firebase?.sign_in_provider || null,
    });
  } catch (e) {
    console.log("[firebase:confirmPhoneCode] idTokenResult unavailable", e);
  }
  // Return the exact token string without modifications
  return idToken;
}

// Get the current user's Firebase ID token (refresh if needed)
export async function getFirebaseIdToken(forceRefresh = false): Promise<string | null> {
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
    const token = await getIdToken(user, forceRefresh);
    try {
      const { getIdTokenResult } = await import("firebase/auth");
      const result = await getIdTokenResult(user);
      console.log("[firebase:getFirebaseIdToken] token details", {
        length: token?.length || 0,
        startsWith: typeof token === "string" ? token.slice(0, 10) : null,
        expiresAt: result.expirationTime,
        issuedAt: result.issuedAtTime,
        authTime: result.authTime,
      });
    } catch (e) {
      console.log("[firebase:getFirebaseIdToken] idTokenResult unavailable", e);
    }
    return token;
  } catch (e) {
    console.log("[firebase:getFirebaseIdToken] failed to get token", e);
    return null;
  }
}

export async function signOutFirebase(): Promise<void> {
  if (typeof window === "undefined") return;
  const { getAuth, signOut } = await import("firebase/auth");
  const auth = getAuth();
  console.log("[firebase:signOutFirebase] signing out");
  await signOut(auth);
}

// Subscribe to Firebase auth/token changes and sync with your Next.js backend
// When the ID token changes (including refresh), we POST it to /api/auth/login
// so the server can set/update tp_id and access_token cookies.
// Returns an unsubscribe function.
export async function startAuthStateSync(options?: {
  loginEndpoint?: string; // default: /api/auth/login
  onError?: (e: any) => void;
  refreshOnInit?: boolean; // immediately push current token if available
}): Promise<() => void> {
  if (typeof window === "undefined") {
    console.warn("[firebase:startAuthStateSync] must be called in the browser");
    return () => {};
  }
  const { getAuth, onIdTokenChanged, getIdToken, setPersistence, browserLocalPersistence } = await import("firebase/auth");
  const auth = getAuth();
  const endpoint = options?.loginEndpoint || "/api/auth/login";

  // Ensure local persistence so the session survives reloads
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("[firebase:startAuthStateSync] persistence set to browserLocalPersistence");
  } catch (e) {
    console.warn("[firebase:startAuthStateSync] failed to set persistence", e);
  }

  const pushToken = async (force = true) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await getIdToken(user, force);
      if (!token) return;
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thirdPartyToken: token }),
        // avoid caching
      });
      console.log("[firebase:startAuthStateSync] token synced to server via", endpoint);
    } catch (e) {
      console.log("[firebase:startAuthStateSync] token sync failed", e);
      options?.onError?.(e);
    }
  };

  const unsubscribe = onIdTokenChanged(auth, async (user) => {
    if (!user) return; // optionally call logout endpoint here
    await pushToken(true); // force refresh to get fresh token
  });

  if (options?.refreshOnInit) {
    // Kick off an initial sync immediately
    pushToken(true);
  }

  return () => {
    try { unsubscribe(); } catch {}
  };
}
