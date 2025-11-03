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
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
