import { FirebaseApp } from 'firebase/app';

/**
 * Client-side helpers for Firebase Phone Auth via WhatsApp.
 * Uses dual Firebase apps: Primary for auth, Secondary for Cloud Functions.
 */
type StartPhoneSignInResult = {
    confirm: (code: string) => Promise<string>;
};
interface WhatsAppOTPOptions {
    /** Cloud Function name for sending OTP (default: "whatsapp") */
    sendFunctionName?: string;
    /** Cloud Function name for verifying OTP (default: "verifySMS") */
    verifyFunctionName?: string;
    /** Project name to pass to Cloud Functions */
    projectName?: string;
}
/**
 * Start phone sign-in via WhatsApp OTP.
 * Sends OTP code via Cloud Function on secondary Firebase app.
 *
 * @param phoneNumber - E.164 format (e.g., "+9647XXXXXXXXX")
 * @param options - Optional configuration
 * @returns Promise with confirm function to verify OTP
 */
declare function startPhoneSignIn(phoneNumber: string, options?: WhatsAppOTPOptions): Promise<StartPhoneSignInResult>;
/**
 * Get current user's Firebase ID token from primary app.
 *
 * @param forceRefresh - Force token refresh
 * @returns ID token or null if no user
 */
declare function getFirebaseIdToken(forceRefresh?: boolean): Promise<string | null>;
/**
 * Sign out current user from Firebase primary app.
 */
declare function signOutFirebase(): Promise<void>;
/**
 * Start auth state synchronization.
 * Listens to Firebase token changes and syncs to backend automatically.
 * Implements singleton pattern, debouncing, and persistent guard.
 *
 * @param options - Configuration options
 * @returns Unsubscribe function
 */
declare function startAuthStateSync(options?: {
    loginEndpoint?: string;
    onError?: (e: any) => void;
    refreshOnInit?: boolean;
}): Promise<() => void>;

/**
 * Dual Firebase configuration.
 *
 * Primary app: Used for authentication (signInWithCustomToken)
 * Secondary app: Used for Cloud Functions (WhatsApp OTP)
 */

/**
 * Get or initialize the primary Firebase app.
 * Used for authentication.
 */
declare function getPrimaryApp(): Promise<FirebaseApp>;
/**
 * Get or initialize the secondary Firebase app.
 * Used for Cloud Functions (WhatsApp OTP).
 */
declare function getSecondaryApp(): Promise<FirebaseApp>;
/**
 * Legacy alias for backward compatibility.
 * @deprecated Use getPrimaryApp() instead
 */
declare function getFirebaseApp(): Promise<FirebaseApp>;

export { type StartPhoneSignInResult, type WhatsAppOTPOptions, getFirebaseApp, getFirebaseIdToken, getPrimaryApp, getSecondaryApp, signOutFirebase, startAuthStateSync, startPhoneSignIn };
