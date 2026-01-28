/**
 * Pre-built API route handlers for secure phone OTP authentication
 *
 * These handlers keep all Firebase credentials and token operations server-side,
 * exposing only success/failure responses to the client.
 *
 * Usage:
 * ```typescript
 * // app/api/auth/send-otp/route.ts
 * export { POST } from "erp-core/firebase/handler/send-otp";
 *
 * // app/api/auth/verify-otp/route.ts
 * export { POST } from "erp-core/firebase/handler/verify-otp";
 * ```
 */

export * from "./send-otp";
export * from "./verify-otp";
