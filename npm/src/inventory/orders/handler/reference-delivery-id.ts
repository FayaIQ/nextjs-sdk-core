import { NextRequest, NextResponse } from "next/server";
import { putOrderReferenceDeliveryId } from "../putOrderReferenceDeliveryId";

/**
 * PUT /api/orders/[id]/reference-delivery-id
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceDeliveryId(id, body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update order reference delivery ID" },
      { status: 500 }
    );
  }
}
