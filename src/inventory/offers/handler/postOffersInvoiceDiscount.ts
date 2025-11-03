import { NextRequest, NextResponse } from "next/server";
import { postOffersInvoiceDiscount } from "../postOffersInvoiceDiscount";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await postOffersInvoiceDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
