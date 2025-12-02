// Provide a safe client-only getter for Firebase app
export async function getFirebaseApp() {
  if (typeof window === "undefined") {
    throw new Error("getFirebaseApp must be called on the client");
  }
  console.log("[firebase:getFirebaseApp] initializing app");
  const [{ initializeApp, getApps }] = await Promise.all([
    import("firebase/app"),
  ]);
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    
  } as const;
  const apps = getApps();
  console.log("[firebase:getFirebaseApp] app count", { count: apps.length });
  return apps.length ? apps[0] : initializeApp(config);
}
