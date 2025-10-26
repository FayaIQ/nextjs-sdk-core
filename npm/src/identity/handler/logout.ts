import { NextResponse } from "next/server";
import { logoutUser } from "../logout";

/**
 * Next.js API handler for logout.
 * Simply deletes authentication cookies - no API call needed.
 *
 * Example usage in your Next.js app:
 * ```ts
 * export { POST } from "my-next-core/identity/handler/logout";
 * ```
 */
export async function POST() {
  try {
    await logoutUser();

    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Logout failed";
    console.error("Logout error:", message);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
