import { NextRequest, NextResponse } from "next/server";
import { getOfferById } from "../getOfferById";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await getOfferById((await params).id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offer";
    console.error("getOfferById error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
