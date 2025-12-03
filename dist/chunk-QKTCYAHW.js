// src/firebase/auth.ts
function decodeJwtPayload(token) {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
    const json = typeof window !== "undefined" && typeof atob === "function" ? atob(normalized) : Buffer.from(normalized, "base64").toString();
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function extractProjectIdFromIss(iss) {
  if (!iss) return null;
  const atIdx = iss.indexOf("@");
  const suffix = ".iam.gserviceaccount.com";
  if (atIdx > -1 && iss.endsWith(suffix)) {
    const host = iss.slice(atIdx + 1);
    const projectId = host.slice(0, host.length - suffix.length);
    return projectId || null;
  }
  return null;
}
async function startPhoneSignIn(phoneNumber, options) {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber });
  const { getSecondaryApp } = await import("./config-QZGDPFPW.js");
  const { getFunctions, httpsCallable } = await import("firebase/functions");
  const secondaryApp = await getSecondaryApp();
  const functions = getFunctions(secondaryApp);
  const sendFunctionName = options?.sendFunctionName || "whatsapp";
  const sendOtpFunction = httpsCallable(functions, sendFunctionName);
  try {
    await sendOtpFunction({
      phoneNumber,
      projectName: options?.projectName || "serlab"
    });
    console.log("[firebase:startPhoneSignIn] OTP sent via WhatsApp");
  } catch (error) {
    console.error("[firebase:startPhoneSignIn] failed to send OTP", error);
    throw error;
  }
  return {
    confirm: async (code) => {
      console.log("[firebase:confirmPhoneCode] verifying code");
      __isSigningIn = true;
      const verifyFunctionName = options?.verifyFunctionName || "verifySMS";
      const verifyOtpFunction = httpsCallable(functions, verifyFunctionName);
      try {
        const response = await verifyOtpFunction({
          phoneNumber,
          code,
          projectName: options?.projectName || "serlab"
        });
        const customToken = response.data.token;
        console.log("[firebase:confirmPhoneCode] custom token received");
        const { getPrimaryApp } = await import("./config-QZGDPFPW.js");
        const { getAuth, signInWithCustomToken, setPersistence, browserLocalPersistence } = await import("firebase/auth");
        const primaryApp = await getPrimaryApp();
        const auth = getAuth(primaryApp);
        try {
          await setPersistence(auth, browserLocalPersistence);
          console.log("[firebase:confirmPhoneCode] persistence set to LOCAL");
        } catch (e) {
          console.warn("[firebase:confirmPhoneCode] failed to set persistence", e);
        }
        try {
          await signInWithCustomToken(auth, customToken);
          console.log("[firebase:confirmPhoneCode] user signed in on primary app");
        } catch (e) {
          const appProjectId = primaryApp?.options?.projectId;
          const payload = decodeJwtPayload(customToken) || {};
          const tokenProjectId = extractProjectIdFromIss(payload.iss) || payload.project_id || null;
          const code2 = e?.code || e?.message || String(e);
          const likelyMismatch = code2?.includes("auth/custom-token-mismatch") || code2?.includes("custom-token-mismatch") || code2?.includes("auth/invalid-custom-token") || code2?.includes("invalid-custom-token") || code2?.includes("CREDENTIAL_MISMATCH");
          if (likelyMismatch) {
            console.error("[firebase:confirmPhoneCode] CREDENTIAL_MISMATCH \u2192 token project != client app", {
              code: code2,
              clientProjectId: appProjectId,
              tokenIss: payload.iss,
              tokenProjectId,
              tokenAud: payload.aud
            });
            throw new Error(
              `CREDENTIAL_MISMATCH: Custom token was minted for project "${tokenProjectId ?? "<unknown>"}" but you are signing into "${appProjectId}". Ensure your verifySMS Cloud Function mints tokens using the PRIMARY project's service account (the same project used by getPrimaryApp).`
            );
          }
          throw e;
        }
        const { onAuthStateChanged } = await import("firebase/auth");
        await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              unsubscribe();
              resolve();
            }
          });
        });
        const { getIdToken } = await import("firebase/auth");
        const idToken = await getIdToken(auth.currentUser, false);
        console.log("[firebase:confirmPhoneCode] ID token obtained");
        setTimeout(() => {
          __isSigningIn = false;
          console.log("[firebase:confirmPhoneCode] sign-in flag cleared");
        }, 2e3);
        return idToken;
      } catch (error) {
        console.error("[firebase:confirmPhoneCode] verification failed", error);
        __isSigningIn = false;
        throw error;
      }
    }
  };
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
var __isSigningIn = false;
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
      if (__isSigningIn) {
        console.log("[firebase:startAuthStateSync] skipping sync during sign-in");
        return;
      }
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
