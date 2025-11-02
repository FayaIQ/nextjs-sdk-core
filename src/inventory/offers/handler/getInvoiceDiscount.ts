import { NextRequest, NextResponse } from "next/server";
import { getInvoiceDiscount } from "../getInvoiceDiscount";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ coupon: string }> }
) {
  try {
    const result = await getInvoiceDiscount((await params).coupon);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch invoice discount";
    console.error("getInvoiceDiscount error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
