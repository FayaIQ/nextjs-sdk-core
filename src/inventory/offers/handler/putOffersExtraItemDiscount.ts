import { NextRequest, NextResponse } from "next/server";
import { putOffersExtraItemDiscount } from "../putOffersExtraItemDiscount";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const result = await putOffersExtraItemDiscount((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
