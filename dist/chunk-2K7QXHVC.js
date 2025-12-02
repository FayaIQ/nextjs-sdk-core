// src/firebase/auth.ts
async function startPhoneSignIn(phoneNumber, recaptchaContainerId) {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber, recaptchaContainerId });
  const [{ getAuth, signInWithPhoneNumber }, { getFirebaseApp }] = await Promise.all([
    import("firebase/auth"),
    import("./config-YM57KNL7.js")
  ]);
  const app = await getFirebaseApp();
  const auth = getAuth(app);
  const verifier = {
    type: "recaptcha",
    verify: () => Promise.resolve(""),
    clear: () => {
    },
    // Firebase internals may call private methods on RecaptchaVerifier; provide no-op shims
    _reset: () => {
    },
    _destroy: () => {
    },
    // Some flows expect a widget id; set to a constant
    _widgetId: 0
  };
  const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  console.log("[firebase:startPhoneSignIn] signInWithPhoneNumber confirmation received");
  return confirmation;
}
async function confirmPhoneCode(confirmation, code) {
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
    const claims = tokenResult.claims || {};
    console.log("[firebase:confirmPhoneCode] idToken acquired", {
      length: idToken?.length || 0,
      startsWith: typeof idToken === "string" ? idToken.slice(0, 10) : null,
      expiresAt: tokenResult.expirationTime,
      issuedAt: tokenResult.issuedAtTime,
      authTime: tokenResult.authTime,
      provider: claims.firebase?.sign_in_provider || null
    });
  } catch (e) {
    console.log("[firebase:confirmPhoneCode] idTokenResult unavailable", e);
  }
  return idToken;
}
async function getFirebaseIdToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;
  const [{ getAuth }, { getIdToken }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth")
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
        authTime: result.authTime
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
async function signOutFirebase() {
  if (typeof window === "undefined") return;
  const { getAuth, signOut } = await import("firebase/auth");
  const auth = getAuth();
  console.log("[firebase:signOutFirebase] signing out");
  await signOut(auth);
}
async function startAuthStateSync(options) {
  if (typeof window === "undefined") {
    console.warn("[firebase:startAuthStateSync] must be called in the browser");
    return () => {
    };
  }
  const { getAuth, onIdTokenChanged, getIdToken } = await import("firebase/auth");
  const auth = getAuth();
  const endpoint = options?.loginEndpoint || "/api/auth/login";
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
        cache: "no-store"
      });
      console.log("[firebase:startAuthStateSync] token synced to server via", endpoint);
    } catch (e) {
      console.log("[firebase:startAuthStateSync] token sync failed", e);
      options?.onError?.(e);
    }
  };
  const unsubscribe = onIdTokenChanged(auth, async (user) => {
    if (!user) return;
    await pushToken(true);
  });
  if (options?.refreshOnInit) {
    pushToken(true);
  }
  return () => {
    try {
      unsubscribe();
    } catch {
    }
  };
}

export {
  startPhoneSignIn,
  confirmPhoneCode,
  getFirebaseIdToken,
  signOutFirebase,
  startAuthStateSync
};
