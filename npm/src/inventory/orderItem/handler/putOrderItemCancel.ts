import { NextRequest, NextResponse } from "next/server";
import { putOrderItemCancel } from "../putOrderItemCancel";

export async function PUT(request: NextRequest, { params }: { params: {  id: string , itemId: string } }) {
  try {
    const { id, itemId } = params;
    const result = await putOrderItemCancel(id, itemId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to cancel order item";
    console.error("putOrderItemCancel error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
