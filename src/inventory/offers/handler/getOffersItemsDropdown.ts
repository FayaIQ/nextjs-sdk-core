import { NextRequest, NextResponse } from "next/server";
import { getOffersItemsDropdown } from "../getOffersItemsDropdown";

export async function GET() {
  try {
    const result = await getOffersItemsDropdown();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers items dropdown";
    console.error("getOffersItemsDropdown error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
