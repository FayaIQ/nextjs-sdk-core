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
    
    console.log("[identity:handler:token] GET checking existing token");
    
    // Check existing token first
    const existingToken = cookieStore.get("access_token")?.value;
    if (existingToken) {
      console.log("[identity:handler:token] returning existing token from cookie");
      // Return with cache headers to prevent repeated calls
      return NextResponse.json(
        { access_token: existingToken },
        {
          headers: {
            'Cache-Control': 'private, max-age=3600', // Cache for 1 hour
          },
        }
      );
    }

    // Try to use tp_id for re-auth
    const tpId = cookieStore.get("tp_id")?.value;
    
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

    const response = await fetch(Api.signIn, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...requestBody,
        ...(requestBody["ThirdPartyToken"]
          ? { ThirdPartyAuthType: 100 }
          : {}),
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

    console.log("[identity:handler:token] new token obtained, setting cookie");

    // Return response with cookie
    const res = NextResponse.json({ access_token: data.access_token });
    res.cookies.set("access_token", data.access_token, {
      httpOnly: true,
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
