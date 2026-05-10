import { NextRequest, NextResponse } from "next/server";
import { postOfferCoupon } from "../postOfferCoupon";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const result = await postOfferCoupon((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
