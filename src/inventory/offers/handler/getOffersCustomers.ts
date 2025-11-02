import { NextRequest, NextResponse } from "next/server";
import { getOffersCustomers } from "../getOffersCustomers";

export async function GET() {
  try {
    const result = await getOffersCustomers();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers customers";
    console.error("getOffersCustomers error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
