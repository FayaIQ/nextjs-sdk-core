import { NextRequest, NextResponse } from "next/server";
import { postOffersShippingDiscount } from "../postOffersShippingDiscount";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await postOffersShippingDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
