import { NextRequest, NextResponse } from "next/server";
import { putOffersCustomerDiscount } from "../putOffersCustomerDiscount";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const result = await putOffersCustomerDiscount((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
