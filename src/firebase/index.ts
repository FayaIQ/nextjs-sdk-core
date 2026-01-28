/**
 * Firebase authentication for WhatsApp OTP verification.
 *
 * **Client-side (browser)**:
 * - Uses dual Firebase apps: Primary for auth, Secondary for Cloud Functions
 * - Flow: startPhoneSignIn() → confirm() → syncs token to backend
 *
 * **Server-side (API routes)**:
 * - Use serverSendOtp() and serverVerifyOtp() to keep credentials hidden
 * - Exchange custom token for ID token with exchangeCustomTokenForIdToken()
 * - Integrate with erp-core/identity LoginPOST handler
 *
 * See admin.ts for secure server-side helpers.
 */

export * from "./config";
export * from "./auth";
export * from "./admin";
