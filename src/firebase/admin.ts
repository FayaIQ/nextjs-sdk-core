/**
 * @fileoverview Server-side Firebase Admin SDK helpers
 * @description For secure phone OTP verification via Cloud Functions
 *
 * These helpers should be called from Next.js API routes to keep
 * Firebase credentials and Cloud Function calls hidden from clients.
 *
 * Usage in your app's API routes:
 * ```typescript
 * // app/api/auth/send-otp/route.ts
 * import { serverSendOtp } from "erp-core/firebase";
 *
 * export async function POST(request) {
 *   const { phoneNumber, projectName } = await request.json();
 *   await serverSendOtp({ phoneNumber, projectName });
 *   return NextResponse.json({ success: true });
 * }
 * ```
 */

/**
 * Options for server-side OTP operations
 */
export interface ServerOtpOptions {
  /** Phone number in E.164 format (e.g., "+9647XXXXXXXXX") */
  phoneNumber: string;
  /** Project name to identify tenant/instance */
  projectName: string;
  /** OTP verification code (required for verify) */
  code?: string;
  /** Custom Cloud Function URL for advanced usage */
  functionUrl?: string;
}

/**
 * Server-side function to send OTP via Cloud Function
 *
 * Calls a Cloud Function from your backend to initiate WhatsApp OTP.
 * The Cloud Function name defaults to "whatsapp".
 *
 * @param options - Phone number and project name
 * @throws Error if Cloud Function call fails
 */
export async function serverSendOtp(options: ServerOtpOptions): Promise<void> {
  const { phoneNumber, projectName, functionUrl } = options;

  // Build Cloud Function URL
  // Format: https://us-central1-PROJECT_ID.cloudfunctions.net/whatsapp
  // Derives from NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECONDARY (gardenia-395e3)
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECONDARY || "gardenia-395e3";
  const url =
    functionUrl ||
    `${process.env.FIREBASE_FUNCTION_BASE_URL || `https://us-central1-${projectId}.cloudfunctions.net`}/whatsapp`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        projectName,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cloud Function error (${response.status}): ${error}`);
    }
  } catch (error) {
    console.error("[firebase:serverSendOtp] failed:", error);
    throw error;
  }
}

/**
 * Response from serverVerifyOtp
 */
export interface VerifyOtpResponse {
  /** Custom token that can be exchanged for Firebase ID token */
  token: string;
  /** User details if available */
  user?: {
    uid: string;
    phoneNumber: string;
  };
}

/**
 * Server-side function to verify OTP and get custom token
 *
 * Calls a Cloud Function to verify the OTP code and return a custom token
 * that can be exchanged for a Firebase ID token.
 * The Cloud Function name defaults to "verifySMS".
 *
 * @param options - Phone number, OTP code, and project name
 * @returns Custom token for Firebase authentication
 * @throws Error if verification fails or Cloud Function call fails
 */
export async function serverVerifyOtp(
  options: ServerOtpOptions,
): Promise<VerifyOtpResponse> {
  const { phoneNumber, code, projectName, functionUrl } = options;

  if (!code) {
    throw new Error("OTP code is required for verification");
  }

  // Build Cloud Function URL
  // Derives from NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECONDARY (gardenia-395e3)
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECONDARY || "gardenia-395e3";
  const url =
    functionUrl ||
    `${process.env.FIREBASE_FUNCTION_BASE_URL || `https://us-central1-${projectId}.cloudfunctions.net`}/verifySMS`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        code,
        projectName,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OTP verification failed (${response.status}): ${error}`);
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error("No token in verification response");
    }

    return data as VerifyOtpResponse;
  } catch (error) {
    console.error("[firebase:serverVerifyOtp] failed:", error);
    throw error;
  }
}

/**
 * Response from exchanging custom token for ID token
 */
export interface ExchangeTokenResponse {
  /** Firebase ID token */
  idToken: string;
  /** Refresh token */
  refreshToken: string;
  /** Token expiration in seconds */
  expiresIn: string;
  /** Local ID (Firebase user ID) */
  localId: string;
}

/**
 * Exchange Firebase custom token for ID token
 *
 * Exchanges a custom token (from Cloud Function) for a Firebase ID token
 * using the Firebase REST API. This happens server-to-server.
 *
 * @param customToken - Custom token from serverVerifyOtp
 * @param firebaseApiKey - Your Firebase project's API key (from NEXT_PUBLIC_FIREBASE_API_KEY)
 * @returns ID token and refresh token
 * @throws Error if exchange fails
 */
export async function exchangeCustomTokenForIdToken(
  customToken: string,
  firebaseApiKey: string,
): Promise<ExchangeTokenResponse> {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseApiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: customToken,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Token exchange failed: ${error.error?.message || response.statusText}`,
      );
    }

    const data = await response.json();
    return {
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      localId: data.localId,
    };
  } catch (error) {
    console.error("[firebase:exchangeCustomTokenForIdToken] failed:", error);
    throw error;
  }
}

/**
 * Validate Firebase ID token on the server
 *
 * Performs basic JWT validation (checks format and expiration).
 * For full validation with signature checking, use Firebase Admin SDK
 * in your application if available.
 *
 * @param idToken - Firebase ID token to validate
 * @returns Decoded token claims if valid
 * @throws Error if token is invalid or expired
 */
export async function validateFirebaseIdToken(
  idToken: string,
): Promise<Record<string, any>> {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf8"),
    );

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token expired");
    }

    return payload as Record<string, any>;
  } catch (error) {
    console.error(
      "[firebase:validateFirebaseIdToken] validation failed:",
      error,
    );
    throw error;
  }
}
