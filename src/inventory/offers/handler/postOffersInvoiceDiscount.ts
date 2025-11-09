import { NextRequest, NextResponse } from "next/server";
import { postOffersInvoiceDiscount } from "../postOffersInvoiceDiscount";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await postOffersInvoiceDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
