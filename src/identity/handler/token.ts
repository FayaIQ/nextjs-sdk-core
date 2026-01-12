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
    const { getEncryptedCookie, COOKIE_NAMES } = await import("../../utils/cookie");
    
    
    // Check encrypted crf cookie first
    let existingToken = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
    
    // Fallback to legacy access_token if crf not found
    if (!existingToken) {
      existingToken = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
    }
    
    if (existingToken) {
      // Return with cache headers to prevent repeated calls
      return NextResponse.json(
        { SESSION_ID: existingToken },
      );
    }


    // Try to use encrypted tp_id for re-auth (with fallback to plain)
    let tpId: string | null = null;
    try {
      tpId = getEncryptedCookie(cookieStore, COOKIE_NAMES.TP_ID);
    } catch {
    }
    
    // Fallback to plain tp_id cookie
    if (!tpId) {
      tpId = cookieStore.get(COOKIE_NAMES.TP_ID)?.value || null;
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
    
    if (!data.access_token) {
      console.error("[identity:handler:token] No access_token in response");
      return NextResponse.json(
        { error: "Token missing in response" },
        { status: 500 }
      );
    }


    // Return response with encrypted cookie
    const res = NextResponse.json({ access_token: data.access_token });
    
    // Set session_id cookie (encrypted when possible)
    try {
      const { COOKIE_NAMES: CN, setPlainCookie } = await import("../../utils/cookie");
      // Remove legacy cookies and save session_id plainly
      try {
        res.cookies.delete(CN.CRF);
      } catch {}
      try {
        res.cookies.delete("session_id");
      } catch {}
      try {
        res.cookies.delete(CN.SESSION_ID);
      } catch {}
      // Store session token as HttpOnly and secure in production so it isn't
      // accessible to client-side scripts. This reduces XSS risk.
      setPlainCookie(res.cookies, CN.SESSION_ID, data.access_token, {
        maxAge: 3600,
        httpOnly: true,
        secure: true,
      });
    } catch (e) {
      console.error("[identity:handler:token] Failed to set session_id cookie:", e);
      throw e;
    }

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
