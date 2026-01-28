/**
 * @fileoverview Server-side API handler for verifying OTP and completing login
 *
 * This is an optional handler that you can use directly in your Next.js app.
 * Re-export it from your app's API route to enable phone OTP verification.
 *
 * Handles the entire authentication flow server-side:
 * 1. Verify OTP with Cloud Function (verifySMS)
 * 2. Exchange custom token for Firebase ID token
 * 3. Call erp-core LoginPOST handler
 * 4. Set secure HttpOnly cookies
 *
 * Usage in your app:
 * ```typescript
 * // app/api/auth/verify-otp/route.ts
 * export { POST } from "erp-core/firebase/handler/verify-otp";
 * ```
 *
 * Or customize it:
 * ```typescript
 * // app/api/auth/verify-otp/route.ts
 * import { POST as verifyOtpHandler } from "erp-core/firebase/handler/verify-otp";
 * import { NextRequest } from "next/server";
 *
 * export async function POST(request: NextRequest) {
 *   // Add custom validation or logging here
 *   return verifyOtpHandler(request);
 * }
 * ```
 */

import { NextRequest, NextResponse } from "next/server";
import {
  serverVerifyOtp,
  exchangeCustomTokenForIdToken,
} from "../admin";
import { LoginPOST } from "../../identity";

/**
 * Configuration for verify-otp handler
 */
export interface VerifyOtpHandlerConfig {
  /** Firebase API key (from NEXT_PUBLIC_FIREBASE_API_KEY) */
  firebaseApiKey?: string;
  /** Base URL for Cloud Functions */
  functionBaseUrl?: string;
  /** Whether to send custom notifications (requires custom notificationFn) */
  enableCustomNotification?: boolean;
  /** Custom notification function */
  notificationFn?: (data: any) => Promise<void>;
}

/**
 * POST handler for /api/auth/verify-otp
 *
 * Verifies OTP and completes the login flow entirely server-side.
 * Returns success/roles only - no tokens exposed to client.
 */
export async function POST(
  request: NextRequest,
  config?: VerifyOtpHandlerConfig,
) {
  try {
    const body = await request.json();
    const { phoneNumber, code, projectName } = body;

    // Validate inputs
    if (!phoneNumber || !/^\+964[0-9]{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number format" },
        { status: 400 },
      );
    }

    if (!code || !/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP code" },
        { status: 400 },
      );
    }

    if (!projectName) {
      return NextResponse.json(
        { success: false, error: "Project name is required" },
        { status: 400 },
      );
    }

    // Step 1: Verify OTP with Cloud Function (server-to-server)
    const { token: customToken } = await serverVerifyOtp({
      phoneNumber,
      code,
      projectName,
      functionUrl: config?.functionBaseUrl,
    });

    // Step 2: Exchange custom token for Firebase ID token (server-to-server)
    const firebaseApiKey =
      config?.firebaseApiKey ||
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
      process.env.FIREBASE_API_KEY;

    if (!firebaseApiKey) {
      throw new Error(
        "Firebase API key not configured (NEXT_PUBLIC_FIREBASE_API_KEY or FIREBASE_API_KEY)",
      );
    }

    const { idToken } = await exchangeCustomTokenForIdToken(
      customToken,
      firebaseApiKey,
    );

    // Step 3: Call backend login with the Firebase ID token
    // Create a synthetic request for LoginPOST
    const loginRequest = new Request(request.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward client headers for tracking
        "User-Agent": request.headers.get("user-agent") || "",
        "X-Real-IP": request.headers.get("x-real-ip") || "",
        "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
      },
      body: JSON.stringify({
        thirdPartyToken: idToken,
      }),
    });

    const loginResponse = await LoginPOST(loginRequest as any);

    if (!loginResponse.ok) {
      const errorData = await loginResponse.text();
      console.error("[verify-otp] Login failed:", errorData);
      return NextResponse.json(
        { success: false, error: "Login failed" },
        { status: loginResponse.status },
      );
    }

    // Parse login response to get roles and session data
    const loginData = await loginResponse.json();
    const backendToken =
      loginData?.token || loginData?.access_token || loginData?.accessToken;

    // Optional: Send custom notification (fire-and-forget)
    if (backendToken && config?.enableCustomNotification && config?.notificationFn) {
      try {
        await config.notificationFn({
          timestamp: new Date().toISOString(),
          source: "firebase/handler/verify-otp",
          userAgent: request.headers.get("user-agent") || undefined,
          ip:
            request.headers.get("x-real-ip") ||
            request.headers.get("x-forwarded-for") ||
            undefined,
          pathname: "/api/auth/verify-otp",
          tokenPrefix: backendToken.substring(
            backendToken.length - 11,
            backendToken.length - 1,
          ),
          isFirstGeneration: true,
        });
      } catch (err) {
        console.error("[verify-otp] Notification failed:", err);
      }
    }

    // Step 4: Build sanitized response with secure cookies
    const sanitizedBody = {
      success: true,
      roles: loginData?.roles || [],
    };

    const response = NextResponse.json(sanitizedBody);

    // Copy cookies from login response (they contain the session)
    loginResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        // Ensure security flags are set on all cookies
        const secureCookie = value.includes("HttpOnly")
          ? value
          : `${value}; HttpOnly; Secure; SameSite=Lax`;
        response.headers.append(key, secureCookie);
      }
    });

    // Set isUser cookie for client-side auth state detection
    response.cookies.set("isUser", "true", {
      httpOnly: false, // Client needs to read this
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("[verify-otp] Error:", error);

    // Return user-friendly error messages
    let errorMessage = "Authentication failed";
    if (
      error.message?.includes("Invalid OTP") ||
      error.message?.includes("invalid")
    ) {
      errorMessage = "Invalid OTP code. Please try again.";
    } else if (error.message?.includes("expired")) {
      errorMessage = "OTP has expired. Please request a new code.";
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 401 },
    );
  }
}
