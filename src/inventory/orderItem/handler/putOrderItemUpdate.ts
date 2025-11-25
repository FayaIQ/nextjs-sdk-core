import { NextRequest, NextResponse } from "next/server";
import { putOrderItemUpdate } from "../putOrderItemUpdate";

export async function PUT(request: NextRequest, { params }: { params: Promise< { id: string, itemId: string }> }) {
  try {
    const { id, itemId } = await params;
    const body = await request.json().catch(() => ({}));
    const result = await putOrderItemUpdate(id, itemId, body);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update order item";
    console.error("putOrderItemUpdate error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
