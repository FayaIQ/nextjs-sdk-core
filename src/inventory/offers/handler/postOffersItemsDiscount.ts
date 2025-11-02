import { NextRequest, NextResponse } from "next/server";
import { postOffersItemsDiscount } from "../postOffersItemsDiscount";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await postOffersItemsDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to post items discount";
    console.error("postOffersItemsDiscount error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
