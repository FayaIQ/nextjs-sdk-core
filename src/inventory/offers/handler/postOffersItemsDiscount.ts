import { NextRequest, NextResponse } from "next/server";
import { postOffersItemsDiscount } from "../postOffersItemsDiscount";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await postOffersItemsDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
