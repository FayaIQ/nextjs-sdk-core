import { NextRequest, NextResponse } from "next/server";
import { putOrderItemUndoCancel } from "../putOrderItemUndoCancel";

export async function PUT(request: NextRequest, { params }: { params: {  id: string , itemId: string } }) {
  try {
    const { id, itemId } = params;
    const result = await putOrderItemUndoCancel(id, itemId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to undo cancel order item";
    console.error("putOrderItemUndoCancel error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
