// src/firebase/auth.ts
async function startPhoneSignIn(phoneNumber) {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber });
  const { sendOTP } = await import("./functions-A7Z37UVH.js");
  const result = await sendOTP(phoneNumber);
  if (!result.success || !result.verificationId) {
    throw new Error(result.message || "Failed to send OTP");
  }
  console.log("[firebase:startPhoneSignIn] OTP sent", {
    verificationId: result.verificationId
  });
  return {
    verificationId: result.verificationId,
    phoneNumber,
    confirm: async (code) => {
      return confirmPhoneCode(result.verificationId, code);
    }
  };
}
async function confirmPhoneCode(verificationId, code) {
  if (typeof window === "undefined") {
    throw new Error("confirmPhoneCode must be called in the browser");
  }
  console.log("[firebase:confirmPhoneCode]", { verificationId, code: "***" });
  const { verifyOTP } = await import("./functions-A7Z37UVH.js");
  const result = await verifyOTP(verificationId, code);
  if (!result.success || !result.customToken) {
    throw new Error(result.error || "Failed to verify OTP");
  }
  const [{ getAuth, signInWithCustomToken, setPersistence, browserLocalPersistence }, { getPrimaryApp }] = await Promise.all([import("firebase/auth"), import("./config-QZGDPFPW.js")]);
  const app = await getPrimaryApp();
  const auth = getAuth(app);
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("[firebase:confirmPhoneCode] persistence set to LOCAL");
  } catch (e) {
    console.warn("[firebase:confirmPhoneCode] failed to set persistence", e);
  }
  const userCredential = await signInWithCustomToken(auth, result.customToken);
  const user = userCredential.user;
  console.log("[firebase:confirmPhoneCode] user signed in", { uid: user.uid });
  const { getIdToken } = await import("firebase/auth");
  const idToken = await getIdToken(user, true);
  try {
    const { getIdTokenResult } = await import("firebase/auth");
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
async function getFirebaseIdToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;
  const [{ getAuth }, { getIdToken }, { getPrimaryApp }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth"),
    import("./config-QZGDPFPW.js")
  ]);
  const app = await getPrimaryApp();
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
  const [{ getAuth, signOut }, { getPrimaryApp }] = await Promise.all([
    import("firebase/auth"),
    import("./config-QZGDPFPW.js")
  ]);
  const app = await getPrimaryApp();
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
    const { getPrimaryApp } = await import("./config-QZGDPFPW.js");
    const app = await getPrimaryApp();
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
  confirmPhoneCode,
  getFirebaseIdToken,
  signOutFirebase,
  startAuthStateSync
};
