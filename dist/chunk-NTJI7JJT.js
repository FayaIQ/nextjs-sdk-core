// src/firebase/auth.ts
async function startPhoneSignIn(phoneNumber) {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber });
  const [
    { getAuth, signInWithPhoneNumber, setPersistence, browserLocalPersistence },
    { getFirebaseApp }
  ] = await Promise.all([import("firebase/auth"), import("./config-MEJKNXG4.js")]);
  const app = await getFirebaseApp();
  const auth = getAuth(app);
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("[firebase:startPhoneSignIn] persistence set to LOCAL");
  } catch (e) {
    console.warn("[firebase:startPhoneSignIn] failed to set persistence", e);
  }
  const verifier = {
    type: "recaptcha",
    verify: () => Promise.resolve(""),
    clear: () => {
    },
    _reset: () => {
    },
    _destroy: () => {
    },
    _widgetId: 0
  };
  const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  console.log("[firebase:startPhoneSignIn] confirmation received");
  return {
    confirm: async (code) => {
      console.log("[firebase:confirmPhoneCode] confirming code");
      const result = await confirmation.confirm(code);
      const user = result.user;
      console.log("[firebase:confirmPhoneCode] user signed in", { uid: user.uid });
      const { getIdToken, getIdTokenResult } = await import("firebase/auth");
      const idToken = await getIdToken(user, true);
      try {
        const tokenResult = await getIdTokenResult(user);
        console.log("[firebase:confirmPhoneCode] token metadata", {
          expiresAt: tokenResult.expirationTime,
          issuedAt: tokenResult.issuedAtTime
        });
      } catch (e) {
        console.log("[firebase:confirmPhoneCode] idTokenResult unavailable", e);
      }
      return idToken;
    }
  };
}
async function getFirebaseIdToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;
  const [{ getAuth }, { getIdToken }, { getFirebaseApp }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth"),
    import("./config-MEJKNXG4.js")
  ]);
  const app = await getFirebaseApp();
  const auth = getAuth(app);
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
async function signOutFirebase() {
  if (typeof window === "undefined") return;
  const [{ getAuth, signOut }, { getFirebaseApp }] = await Promise.all([
    import("firebase/auth"),
    import("./config-MEJKNXG4.js")
  ]);
  const app = await getFirebaseApp();
  const auth = getAuth(app);
  console.log("[firebase:signOutFirebase] signing out");
  await signOut(auth);
}
var __authSyncUnsubscribe = null;
var __authSyncPromise = null;
var __lastSyncedToken = null;
var __lastSyncTime = 0;
async function startAuthStateSync(options) {
  if (typeof window === "undefined") return () => {
  };
  if (__authSyncPromise) return __authSyncPromise;
  __authSyncPromise = (async () => {
    const {
      getAuth,
      onIdTokenChanged,
      getIdToken,
      setPersistence,
      browserLocalPersistence
    } = await import("firebase/auth");
    const { getFirebaseApp } = await import("./config-MEJKNXG4.js");
    const app = await getFirebaseApp();
    const auth = getAuth(app);
    const endpoint = options?.loginEndpoint || "/api/auth/login";
    try {
      await setPersistence(auth, browserLocalPersistence);
      console.log("[firebase:startAuthStateSync] persistence set");
    } catch (e) {
      console.warn("[firebase:startAuthStateSync] failed to set persistence", e);
    }
    const STORAGE_KEY = "erp_core_last_tp_id";
    const pushTokenToServer = async (forceRefresh = false) => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const token = await getIdToken(user, forceRefresh);
        if (!token) return;
        const now = Date.now();
        if (token === __lastSyncedToken && now - __lastSyncTime < 3e3) return;
        try {
          const lastPersisted = localStorage.getItem(STORAGE_KEY);
          if (lastPersisted && lastPersisted === token) {
            return;
          }
        } catch {
        }
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ thirdPartyToken: token })
        });
        __lastSyncedToken = token;
        __lastSyncTime = now;
        try {
          localStorage.setItem(STORAGE_KEY, token);
        } catch {
        }
        console.log("[firebase:startAuthStateSync] token synced \u2192 server");
      } catch (e) {
        console.error("[firebase:startAuthStateSync] sync failed", e);
        options?.onError?.(e);
      }
    };
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) return;
      await pushTokenToServer(false);
    });
    __authSyncUnsubscribe = () => {
      try {
        unsubscribe();
      } catch {
      }
      __authSyncPromise = null;
      __authSyncUnsubscribe = null;
    };
    return __authSyncUnsubscribe;
  })();
  return __authSyncPromise;
}

export {
  startPhoneSignIn,
  getFirebaseIdToken,
  signOutFirebase,
  startAuthStateSync
};
