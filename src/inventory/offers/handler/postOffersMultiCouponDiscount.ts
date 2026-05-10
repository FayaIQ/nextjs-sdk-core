import { NextRequest, NextResponse } from "next/server";
import { postOffersMultiCouponDiscount } from "../postOffersMultiCouponDiscount";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await postOffersMultiCouponDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
