import { NextRequest, NextResponse } from "next/server";
import { putOrderDiscount } from "../putOrderDiscount";

/**
 * PUT /api/orders/[id]/discount
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderDiscount(id, body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to apply order discount" },
      { status: 500 }
    );
  }
}
