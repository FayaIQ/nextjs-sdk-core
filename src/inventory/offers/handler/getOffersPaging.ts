import { NextRequest, NextResponse } from "next/server";
import { getOffersPaging } from "../getOffersPaging";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getOffersPaging(params);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers";
    console.error("getOffersPaging error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
