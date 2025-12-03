/**
 * Firebase authentication for WhatsApp OTP verification.
 * 
 * Uses dual Firebase apps:
 * - Primary: Authentication (signInWithCustomToken)
 * - Secondary: Cloud Functions (WhatsApp OTP)
 * 
 * Flow:
 * 1. Call startPhoneSignIn(phoneNumber) → SMS sent via WhatsApp (secondary app)
 * 2. User receives WhatsApp message with OTP
 * 3. Call confirmation.confirm(code) → verify and sign in (primary app)
 * 4. startAuthStateSync() → syncs token to backend automatically
 */

export * from "./config";
export * from "./auth";


