import { NextRequest, NextResponse } from "next/server";
import { getOffersCouponsDropdown } from "../getOffersCouponsDropdown";

export async function GET() {
  try {
    const result = await getOffersCouponsDropdown();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers coupons dropdown";
    console.error("getOffersCouponsDropdown error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
