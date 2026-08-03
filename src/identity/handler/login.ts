import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../core/fetcher";
import { loginUser } from "../login";

/** Explicit login endpoint. It never serializes an ERP access token. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const response = await loginUser({
      username: body.username,
      password: body.password,
      playerId: body.playerId,
      thirdPartyToken: body.thirdPartyToken,
    }, request.headers.get("user-agent") || undefined);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      employeeStoreId: response.employeeStoreId || null,
      roles: response.roles || [],
      user: response.user || null,
    });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500;
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
