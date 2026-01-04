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
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    
    // Import cookie utilities
    const { getEncryptedCookie, setEncryptedCookie, COOKIE_NAMES } = await import("../../utils/cookie");
    
    console.log("[identity:handler:token] GET checking existing token");
    
    // Check encrypted crf cookie first
    let existingToken = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
    
    // Fallback to legacy access_token if crf not found
    if (!existingToken) {
      existingToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
    }
    
    if (existingToken) {
      // Return with cache headers to prevent repeated calls
      return NextResponse.json(
        { access_token: existingToken },
      );
    }

    // Try to use tp_id for re-auth
    const tpId = cookieStore.get(COOKIE_NAMES.TP_ID)?.value;
    
    const authConfig = getAuthConfig();
    const requestBody: Record<string, any> = {
      clientId: authConfig.clientId,
      clientSecret: authConfig.clientSecret,
      Language: authConfig.language ?? 0,
      GMT: authConfig.gmt ?? 3,
      IsFromNotification: false,
    };

    if (tpId) {
      console.log("[identity:handler:token] using tp_id for sign-in");
      requestBody["ThirdPartyToken"] = tpId;
    } else if ((authConfig as any).thirdPartyToken) {
      console.log("[identity:handler:token] using config thirdPartyToken");
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
        userAgent = request.headers.get("user-agent") || null;
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
    
    if (!data.access_token) {
      return NextResponse.json(
        { error: "Token missing in response" },
        { status: 500 }
      );
    }

    console.log("[identity:handler:token] new token obtained, setting encrypted cookie");

    // Return response with encrypted cookie
    const res = NextResponse.json({ access_token: data.access_token });
    
    // Set encrypted crf cookie
    try {
      const { setEncryptedCookie: setEncCookie, COOKIE_NAMES: CN } = await import("../../utils/cookie");
      const { encrypt } = await import("../../utils/crypto");
      const encrypted = encrypt(data.access_token);
      
      res.cookies.set(CN.CRF, encrypted, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600, // 1 hour
      });
    } catch (e) {
      console.warn("[identity:handler:token] encryption failed, using plain cookie", e);
    }
    
    // LEGACY: Keep access_token for backward compatibility
    res.cookies.set(COOKIE_NAMES.ACCESS_TOKEN, data.access_token, {
      httpOnly:false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600, // 1 hour
    });

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
