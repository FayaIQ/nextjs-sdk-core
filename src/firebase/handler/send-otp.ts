/**
 * @fileoverview Server-side API handler for sending OTP
 *
 * This is an optional handler that you can use directly in your Next.js app.
 * Re-export it from your app's API route to enable phone OTP signup.
 *
 * Usage in your app:
 * ```typescript
 * // app/api/auth/send-otp/route.ts
 * export { POST } from "erp-core/firebase/handler/send-otp";
 * ```
 *
 * Or customize it:
 * ```typescript
 * // app/api/auth/send-otp/route.ts
 * import { POST as sendOtpHandler } from "erp-core/firebase/handler/send-otp";
 * import { NextRequest } from "next/server";
 *
 * export async function POST(request: NextRequest) {
 *   // Add custom validation or logging here
 *   return sendOtpHandler(request);
 * }
 * ```
 */

import { NextRequest, NextResponse } from "next/server";
import { serverSendOtp } from "../admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, projectName } = body;

    // Validate phone number format (Iraqi numbers)
    if (!phoneNumber || !/^\+964[0-9]{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number format" },
        { status: 400 },
      );
    }

    if (!projectName) {
      return NextResponse.json(
        { success: false, error: "Project name is required" },
        { status: 400 },
      );
    }

    // Send OTP via server-side call to Cloud Function
    await serverSendOtp({
      phoneNumber,
      projectName,
    });

    // Return success without exposing any internal details
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[send-otp] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send OTP" },
      { status: 500 },
    );
  }
}
