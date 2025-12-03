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
  getFirebaseApp: () => getFirebaseApp
});
async function getFirebaseApp() {
  if (typeof window === "undefined") {
    throw new Error("getFirebaseApp must be called on the client");
  }
  console.log("[firebase:getFirebaseApp] initializing app");
  const [{ initializeApp, getApps }] = await Promise.all([
    import("firebase/app")
  ]);
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
  const apps = getApps();
  console.log("[firebase:getFirebaseApp] app count", { count: apps.length });
  return apps.length ? apps[0] : initializeApp(config);
}
var init_config = __esm({
  "src/firebase/config.ts"() {
    "use strict";
  }
});

// src/firebase/index.ts
var firebase_exports = {};
__export(firebase_exports, {
  confirmPhoneCode: () => confirmPhoneCode,
  getFirebaseApp: () => getFirebaseApp,
  getFirebaseIdToken: () => getFirebaseIdToken,
  signOutFirebase: () => signOutFirebase,
  startAuthStateSync: () => startAuthStateSync,
  startPhoneSignIn: () => startPhoneSignIn
});
module.exports = __toCommonJS(firebase_exports);
init_config();

// src/firebase/auth.ts
async function startPhoneSignIn(phoneNumber, recaptchaContainerId) {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber, recaptchaContainerId });
  const [
    { getAuth, signInWithPhoneNumber, setPersistence, browserLocalPersistence },
    { getFirebaseApp: getFirebaseApp2 }
  ] = await Promise.all([import("firebase/auth"), Promise.resolve().then(() => (init_config(), config_exports))]);
  const app = await getFirebaseApp2();
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
  const [{ getAuth }, { getIdToken }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth")
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
async function signOutFirebase() {
  if (typeof window === "undefined") return;
  const { getAuth, signOut } = await import("firebase/auth");
  const auth = getAuth();
  console.log("[firebase:signOutFirebase] signing out");
  await signOut(auth);
}
var __authSyncUnsubscribe = null;
var __authSyncStarted = false;
var __lastSyncedToken = null;
var __lastSyncTime = 0;
var TOKEN_SYNC_DEBOUNCE = 3e3;
async function startAuthStateSync(options) {
  if (typeof window === "undefined") {
    console.warn("[firebase:startAuthStateSync] cannot run on server");
    return () => {
    };
  }
  if (__authSyncStarted && __authSyncUnsubscribe) {
    return __authSyncUnsubscribe;
  }
  const {
    getAuth,
    onIdTokenChanged,
    getIdToken,
    setPersistence,
    browserLocalPersistence
  } = await import("firebase/auth");
  const auth = getAuth();
  const endpoint = options?.loginEndpoint || "/api/auth/login";
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
      if (token === __lastSyncedToken && now - __lastSyncTime < TOKEN_SYNC_DEBOUNCE) {
        console.log("[firebase:startAuthStateSync] skip duplicate token sync");
        return;
      }
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thirdPartyToken: token })
      });
      __lastSyncedToken = token;
      __lastSyncTime = now;
      console.log("[firebase:startAuthStateSync] token synced \u2192 server");
    } catch (e) {
      console.error("[firebase:startAuthStateSync] sync failed", e);
      options?.onError?.(e);
    }
  };
  const unsubscribe = onIdTokenChanged(auth, async (user) => {
    if (!user) return;
    await pushTokenToServer();
  });
  if (options?.refreshOnInit) pushTokenToServer();
  __authSyncUnsubscribe = () => {
    try {
      unsubscribe();
    } catch {
    }
    __authSyncStarted = false;
    __authSyncUnsubscribe = null;
  };
  __authSyncStarted = true;
  return __authSyncUnsubscribe;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  confirmPhoneCode,
  getFirebaseApp,
  getFirebaseIdToken,
  signOutFirebase,
  startAuthStateSync,
  startPhoneSignIn
});
