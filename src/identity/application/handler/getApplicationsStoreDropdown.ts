import { NextRequest, NextResponse } from "next/server";
import { getApplicationsStoreDropdown } from "../getApplicationsStoreDropdown";

/**
 * Handler for application stores dropdown
 */
export async function GET(request: NextRequest) {
  try {
    const data = await getApplicationsStoreDropdown();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch application stores";
    console.error("applications store dropdown error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
