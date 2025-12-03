/**
 * Dual Firebase configuration.
 * 
 * Primary app: Used for authentication (signInWithCustomToken)
 * Secondary app: Used for Cloud Functions (WhatsApp OTP)
 */

import type { FirebaseApp } from 'firebase/app';

let primaryApp: FirebaseApp | null = null;
let secondaryApp: FirebaseApp | null = null;

/**
 * Get or initialize the primary Firebase app.
 * Used for authentication.
 */
export async function getPrimaryApp(): Promise<FirebaseApp> {
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
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const existing = getApps().find(app => app.name === '[DEFAULT]');
  primaryApp = existing || initializeApp(config);
  
  console.log("[firebase:getPrimaryApp] primary app ready");
  return primaryApp;
}

/**
 * Get or initialize the secondary Firebase app.
 * Used for Cloud Functions (WhatsApp OTP).
 */
export async function getSecondaryApp(): Promise<FirebaseApp> {
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
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_SECONDARY,
  };

  const existing = getApps().find(app => app.name === 'secondary');
  secondaryApp = existing || initializeApp(config, 'secondary');
  
  console.log("[firebase:getSecondaryApp] secondary app ready");
  return secondaryApp;
}

/**
 * Legacy alias for backward compatibility.
 * @deprecated Use getPrimaryApp() instead
 */
export async function getFirebaseApp(): Promise<FirebaseApp> {
  return getPrimaryApp();
}
