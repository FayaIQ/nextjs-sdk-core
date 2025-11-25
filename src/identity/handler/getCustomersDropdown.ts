import { NextRequest, NextResponse } from "next/server";
import { getCustomersDropdown } from "../getCustomersDropdown";

/**
 * Next.js API handler for customers dropdown
 * Accepts query params: username, FullName
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
  const usernameRaw = url.searchParams.get("username");
  const fullNameRaw = url.searchParams.get("FullName");

  const username = usernameRaw !== null && usernameRaw.trim() !== "" ? usernameRaw.trim() : undefined;
  const FullName = fullNameRaw !== null && fullNameRaw.trim() !== "" ? fullNameRaw.trim() : undefined;

  const data = await getCustomersDropdown(username, FullName);

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch customers";
    console.error("getCustomersDropdown handler error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
