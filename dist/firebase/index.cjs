"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/firebase/config.ts
var config_exports = {};
__export(config_exports, {
  getFirebaseApp: () => getFirebaseApp,
  getPrimaryApp: () => getPrimaryApp,
  getSecondaryApp: () => getSecondaryApp
});
async function getPrimaryApp() {
  if (typeof window === "undefined") {
    throw new Error("getPrimaryApp must be called on the client");
  }
  if (primaryApp) return primaryApp;
  console.log("[firebase:getPrimaryApp] initializing primary app");
  const { initializeApp, getApps } = await import("firebase/app");
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
  const existing = getApps().find((app) => app.name === "[DEFAULT]");
  primaryApp = existing || initializeApp(config);
  console.log("[firebase:getPrimaryApp] primary app ready");
  return primaryApp;
}
async function getSecondaryApp() {
  if (typeof window === "undefined") {
    throw new Error("getSecondaryApp must be called on the client");
  }
  if (secondaryApp) return secondaryApp;
  console.log("[firebase:getSecondaryApp] initializing secondary app");
  const { initializeApp, getApps } = await import("firebase/app");
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_SECONDARY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_SECONDARY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECONDARY,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SECONDARY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_SECONDARY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_SECONDARY
  };
  const existing = getApps().find((app) => app.name === "secondary");
  secondaryApp = existing || initializeApp(config, "secondary");
  console.log("[firebase:getSecondaryApp] secondary app ready");
  return secondaryApp;
}
async function getFirebaseApp() {
  return getPrimaryApp();
}
var primaryApp, secondaryApp;
var init_config = __esm({
  "src/firebase/config.ts"() {
    "use strict";
    primaryApp = null;
    secondaryApp = null;
  }
});

// src/firebase/index.ts
var firebase_exports = {};
__export(firebase_exports, {
  getFirebaseApp: () => getFirebaseApp,
  getFirebaseIdToken: () => getFirebaseIdToken,
  getPrimaryApp: () => getPrimaryApp,
  getSecondaryApp: () => getSecondaryApp,
  signOutFirebase: () => signOutFirebase,
  startAuthStateSync: () => startAuthStateSync,
  startPhoneSignIn: () => startPhoneSignIn
});
module.exports = __toCommonJS(firebase_exports);
init_config();

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
  const { getSecondaryApp: getSecondaryApp2 } = await Promise.resolve().then(() => (init_config(), config_exports));
  const { getFunctions, httpsCallable } = await import("firebase/functions");
  const secondaryApp2 = await getSecondaryApp2();
  const functions = getFunctions(secondaryApp2);
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
        const { getPrimaryApp: getPrimaryApp2 } = await Promise.resolve().then(() => (init_config(), config_exports));
        const { getAuth, signInWithCustomToken, setPersistence, browserLocalPersistence } = await import("firebase/auth");
        const primaryApp2 = await getPrimaryApp2();
        const auth = getAuth(primaryApp2);
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
          const appProjectId = primaryApp2?.options?.projectId;
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
  const [{ getAuth }, { getIdToken }, { getPrimaryApp: getPrimaryApp2 }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth"),
    Promise.resolve().then(() => (init_config(), config_exports))
  ]);
  const app = await getPrimaryApp2();
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
  const [{ getAuth, signOut }, { getPrimaryApp: getPrimaryApp2 }] = await Promise.all([
    import("firebase/auth"),
    Promise.resolve().then(() => (init_config(), config_exports))
  ]);
  const app = await getPrimaryApp2();
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
    const { getPrimaryApp: getPrimaryApp2 } = await Promise.resolve().then(() => (init_config(), config_exports));
    const app = await getPrimaryApp2();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFirebaseApp,
  getFirebaseIdToken,
  getPrimaryApp,
  getSecondaryApp,
  signOutFirebase,
  startAuthStateSync,
  startPhoneSignIn
});
