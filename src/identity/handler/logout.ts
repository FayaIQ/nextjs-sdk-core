import { NextResponse } from "next/server";
import { logoutUser, SDK_OWNED_COOKIES } from "../logout";

export async function POST() {
  try {
    await logoutUser();
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    for (const name of SDK_OWNED_COOKIES) response.cookies.delete(name);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Logout failed" },
      { status: 500 },
    );
  }
}
