// src/firebase/config.ts
var firebaseApp = null;
async function getFirebaseApp() {
  if (typeof window === "undefined") {
    throw new Error("getFirebaseApp must be called on the client");
  }
  if (firebaseApp) return firebaseApp;
  console.log("[firebase:getFirebaseApp] initializing app");
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
  firebaseApp = existing || initializeApp(config);
  console.log("[firebase:getFirebaseApp] app ready");
  return firebaseApp;
}

export {
  getFirebaseApp
};
