import { NextRequest, NextResponse } from "next/server";
import { putOrderReferenceId } from "../putOrderReferenceId";

/**
 * PUT /api/orders/[id]/reference-id
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceId(id, body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update order reference ID" },
      { status: 500 }
    );
  }
}
