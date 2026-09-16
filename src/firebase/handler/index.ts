/**
 * Pre-built API route handlers for secure phone OTP authentication
 *
 * These handlers keep all Firebase credentials and token operations server-side,
 * exposing only success/failure responses to the client.
 *
 * Usage:
 * ```typescript
 * // app/api/auth/send-otp/route.ts
 * export { sendOtpPOST as POST } from "erp-core/firebase/handler/send-otp";
 *
 * // app/api/auth/verify-otp/route.ts
 * export { verifyOtpPOST as POST } from "erp-core/firebase/handler/verify-otp";
 * ```
 */

export { sendOtpPOST } from "./send-otp";
export { verifyOtpPOST } from "./verify-otp";
// Re-export as POST for convenience
export { sendOtpPOST as sendOtpHandler } from "./send-otp";
export { verifyOtpPOST as verifyOtpHandler } from "./verify-otp";
