import {
  __require
} from "./chunk-3RG5ZIWI.js";

// src/firebase/auth.ts
async function startPhoneSignIn(phoneNumber, options) {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber });
  const { getFirebaseApp } = await import("./config-57VLP477.js");
  const { getFunctions, httpsCallable } = await import("firebase/functions");
  const app = options?.app || await getFirebaseApp();
  const functions = getFunctions(app);
  const sendFunctionName = options?.sendFunctionName || "whatsapp";
  const sendOtpFunction = httpsCallable(functions, sendFunctionName);
  try {
    await sendOtpFunction({
      phoneNumber,
      projectName: options?.projectName || "ozoon"
    });
    console.log("[firebase:startPhoneSignIn] OTP sent via WhatsApp");
  } catch (error) {
    console.error("[firebase:startPhoneSignIn] failed to send OTP", error);
    throw error;
  }
  return {
    confirm: async (code) => {
      console.log("[firebase:confirmPhoneCode] verifying code");
      const verifyFunctionName = options?.verifyFunctionName || "verifySMS";
      const verifyOtpFunction = httpsCallable(functions, verifyFunctionName);
      try {
        const response = await verifyOtpFunction({
          phoneNumber,
          code,
          projectName: options?.projectName || "ozoon"
        });
        const customToken = response.data.token;
        console.log("[firebase:confirmPhoneCode] custom token received");
        const { getAuth, signInWithCustomToken, setPersistence, browserLocalPersistence } = await import("firebase/auth");
        const auth = getAuth(app);
        try {
          await setPersistence(auth, browserLocalPersistence);
          console.log("[firebase:confirmPhoneCode] persistence set to LOCAL");
        } catch (e) {
          console.warn("[firebase:confirmPhoneCode] failed to set persistence", e);
        }
        await signInWithCustomToken(auth, customToken);
        console.log("[firebase:confirmPhoneCode] user signed in");
        await new Promise((resolve) => {
          const { onAuthStateChanged } = __require("firebase/auth");
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              unsubscribe();
              resolve();
            }
          });
        });
        const { getIdToken } = await import("firebase/auth");
        const idToken = await getIdToken(auth.currentUser, true);
        console.log("[firebase:confirmPhoneCode] ID token obtained");
        return idToken;
      } catch (error) {
        console.error("[firebase:confirmPhoneCode] verification failed", error);
        throw error;
      }
    }
  };
}
async function getFirebaseIdToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;
  const [{ getAuth }, { getIdToken }, { getFirebaseApp }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth"),
    import("./config-57VLP477.js")
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
    import("./config-57VLP477.js")
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
    const { getFirebaseApp } = await import("./config-57VLP477.js");
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
