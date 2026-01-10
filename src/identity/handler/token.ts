import { NextRequest, NextResponse } from "next/server";
import { getAuthConfig } from "../../core/config";
import { Api } from "../../api/api";

/**
 * GET /api/auth/token
 * 
 * Returns access token, checking cookie first, then fetching new one if needed.
 * This route handler can set cookies (unlike during rendering).
 * 
 * Usage in your Next.js app:
 * ```ts
 * // app/api/auth/token/route.ts
 * export { GET } from "erp-core/identity/handler/token";
 * ```
 */
export async function GET(request: NextRequest) {
  console.log("[identity:handler:token] GET request received");
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    console.log(`[identity:handler:token] Available cookies: ${cookieStore.getAll().map((c: any) => c.name).join(', ')}`);
    
    // Import cookie utilities
    const { getEncryptedCookie, setEncryptedCookie, COOKIE_NAMES } = await import("../../utils/cookie");
    
    
    // Check encrypted crf cookie first
    console.log("[identity:handler:token] Checking for existing token in cookies");
    let existingToken = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
    console.log(`[identity:handler:token] CRF cookie token found: ${!!existingToken}`);
    
    // Fallback to legacy access_token if crf not found
    if (!existingToken) {
      existingToken = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
      console.log(`[identity:handler:token] Legacy SESSION_ID cookie found: ${!!existingToken}`);
    }
    
    if (existingToken) {
      console.log("[identity:handler:token] Returning existing token from cookies");
      // Return with cache headers to prevent repeated calls
      return NextResponse.json(
        { SESSION_ID: existingToken },
      );
    }

    console.log("[identity:handler:token] No existing token found, attempting re-auth");

    // Try to use encrypted tp_id for re-auth (with fallback to plain)
    console.log("[identity:handler:token] Checking for tp_id cookie");
    let tpId: string | null = null;
    try {
      tpId = getEncryptedCookie(cookieStore, COOKIE_NAMES.TP_ID);
      console.log(`[identity:handler:token] Encrypted tp_id found: ${!!tpId}`);
    } catch (e) {
      console.log("[identity:handler:token] Encrypted tp_id decryption failed");
    }
    
    // Fallback to plain tp_id cookie
    if (!tpId) {
      tpId = cookieStore.get(COOKIE_NAMES.TP_ID)?.value || null;
      console.log(`[identity:handler:token] Plain tp_id found: ${!!tpId}`);
    }
    
    const authConfig = getAuthConfig();
    const requestBody: Record<string, any> = {
      clientId: authConfig.clientId,
      clientSecret: authConfig.clientSecret,
      Language: authConfig.language ?? 0,
      GMT: authConfig.gmt ?? 3,
      IsFromNotification: false,
    };

    if (tpId) {
      requestBody["ThirdPartyToken"] = tpId;
    } else if ((authConfig as any).thirdPartyToken) {
      requestBody["ThirdPartyToken"] = (authConfig as any).thirdPartyToken;
    } else {
      console.log("[identity:handler:token] signing in with clientId/clientSecret");
    }

    // Include a User-Agent header for downstream telemetry.
    // Prefer the incoming request's User-Agent when available.
    let userAgent: string | null = null;

    // standard NextRequest headers API
    if (!userAgent) {
      try {
        userAgent = request.headers.get("user-agent") + " nextjs-sdk-core  handler api/auth/token" || null;
      } catch {}
    }

    // Final fallback to node runtime identifier
    if (!userAgent) {
      userAgent = "nextjs-sdk-core  handler api/auth/token";
    }
    const response = await fetch(Api.signIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": userAgent,
      },
      body: JSON.stringify({
        ...requestBody,
        ...(requestBody["ThirdPartyToken"] ? { ThirdPartyAuthType: 100 } : {}),
      }),
    });

    if (!response.ok) {
      console.error("[identity:handler:token] sign-in failed", response.status);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const data = await response.json();
    console.log(`[identity:handler:token] Token response received, has access_token: ${!!data.access_token}`);
    
    if (!data.access_token) {
      console.error("[identity:handler:token] No access_token in response");
      return NextResponse.json(
        { error: "Token missing in response" },
        { status: 500 }
      );
    }

    console.log(`[identity:handler:token] Access token length: ${data.access_token.length}`);

    // Return response with encrypted cookie
    const res = NextResponse.json({ access_token: data.access_token });
    
    // Set session_id cookie - encrypted if possible, otherwise plain
    console.log("[identity:handler:token] Setting session_id cookie");
    try {
      const { encryptSync } = await import("../../utils/crypto");
      const { COOKIE_NAMES: CN } = await import("../../utils/cookie");
      const encrypted = encryptSync(data.access_token);
      
      if (encrypted) {
        res.cookies.set(CN.SESSION_ID, encrypted, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 3600, // 1 hour
        });
        console.log("[identity:handler:token] session_id saved (encrypted)");
      } else {
        console.warn("[identity:handler:token] encryptSync returned falsy value");
      }
    } catch (e) {
      console.warn("[identity:handler:token] encryption failed, saving plain session_id", e);
      const { COOKIE_NAMES: CN } = await import("../../utils/cookie");
      res.cookies.set(CN.SESSION_ID, data.access_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600, // 1 hour
      });
      console.log("[identity:handler:token] session_id saved (plain)");
    }

    console.log("[identity:handler:token] Returning response with new token");
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token fetch failed";
    console.error("[identity:handler:token] error:", message);
    
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
