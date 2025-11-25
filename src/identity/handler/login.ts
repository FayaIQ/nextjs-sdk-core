import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "../login";
import { getAuthConfig } from "../../core/config";

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
    };

    // Perform login (this automatically saves token, roles, and storeId to cookies)
    const response = await loginUser(credentials);

    // Respond with success and relevant data
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        employeeStoreId: response.employeeStoreId || null,
        roles: response.roles || [],
        user: response.user || null,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login failed unexpectedly";
    console.error("Login error:", message);

    return NextResponse.json(
      { success: false, error: message },
      { status: 401 }
    );
  }
}
