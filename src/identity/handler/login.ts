import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "../login";
import { getAuthConfig } from "../../core/config";
import { ApiError } from "../../core/fetcher";

/**
 * Next.js API handler for manual login.
 *
 * Example usage in your Next.js app:
 * ```ts
 * export { POST } from "my-next-core/identity/handler/login";
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body safely
    const body = await request.json().catch(() => ({}));
    console.log("[identity:handler:login] POST body", { hasUsername: !!body.username, hasPassword: !!body.password, hasThirdPartyToken: !!body.thirdPartyToken });

    // Merge provided body with fallback env config
    const config = getAuthConfig();
    const credentials = {
      clientId: body.clientId ?? config.clientId,
      clientSecret: body.clientSecret ?? config.clientSecret,
      username: body.username ?? config.username,
      password: body.password ?? config.password,
      Language: body.Language ?? config.language ?? 0,
      GMT: body.GMT ?? config.gmt ?? 3,
      IsFromNotification: false,
      thirdPartyToken: body.thirdPartyToken ?? config.thirdPartyToken,
    };
    console.log("[identity:handler:login] credentials prepared", { hasUsername: !!credentials.username, hasPassword: !!credentials.password, hasThirdPartyToken: !!credentials.thirdPartyToken });

    // ✅ Server-side dedupe: avoid re-signing if already logged in with same thirdPartyToken
    if (body.thirdPartyToken) {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      
      // Check if we have a valid access_token and matching tp_id
      let hasValidToken = false;
      try {
        const { getEncryptedCookie, COOKIE_NAMES } = await import("../../utils/cookie");
        const existingToken = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
        const existingTpId = cookieStore.get(COOKIE_NAMES.TP_ID)?.value;
        
        if (existingToken && existingTpId === body.thirdPartyToken) {
          hasValidToken = true;
        }
      } catch {}
      
      // Fallback to legacy cookies
      if (!hasValidToken) {
        const existingToken = cookieStore.get("access_token")?.value;
        const existingTpId = cookieStore.get("tp_id")?.value;
        if (existingToken && existingTpId === body.thirdPartyToken) {
          hasValidToken = true;
        }
      }
      
      if (hasValidToken) {
        console.log("[identity:handler:login] already logged in with same thirdPartyToken, skipping re-auth");
        return NextResponse.json(
          {
            success: true,
            message: "Already logged in",
            employeeStoreId: null,
            roles: [],
            user: null,
          },
          { status: 200 }
        );
      }
    }

    // Perform login (this automatically saves token, roles, and storeId to cookies)
    const response = await loginUser(credentials);
    console.log("[identity:handler:login] loginUser response", { ok: !!response?.access_token, rolesCount: response?.roles?.length || 0 });

    // If login provided a thirdPartyToken, persist it for AUTO mode re-auth
    // Set it in the cookies store directly (loginUser already sets it, but we ensure it's set here too)
    if (body.thirdPartyToken) {
      console.log("[identity:handler:login] setting tp_id cookie in store");
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      cookieStore.set("tp_id", body.thirdPartyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600,
      });
    }

    // Respond with success and relevant data
    const res = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        employeeStoreId: response.employeeStoreId || null,
        roles: response.roles || [],
        user: response.user || null,
      },
      { status: 200 }
    );

    // Also set in response for client
    if (body.thirdPartyToken) {
      res.cookies.set("tp_id", body.thirdPartyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600,
      });
    }
    return res;
  } catch (error: any) {
    // Normalize and surface clear server message if available
    if (error instanceof ApiError) {
      const status = error.status || 401;
      const serverBody = error.body;
      let serverMessage: string = "Login failed";
      try {
        // Try to find a friendly message in body
        serverMessage = typeof serverBody === "string" ? serverBody : (serverBody?.message || serverBody?.error || JSON.stringify(serverBody));
      } catch {}
      console.error("[identity:handler:login] ApiError", { status, serverMessage });
      return NextResponse.json(
        { success: false, error: serverMessage, status },
        { status }
      );
    }
    const message = error?.message || "Login failed unexpectedly";
    console.error("[identity:handler:login] Unexpected error", { message });
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
