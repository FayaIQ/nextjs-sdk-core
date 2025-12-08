import {
  putOrderItemUndoCancel
} from "./chunk-URQNCDQ2.js";

// src/inventory/orderItem/handler/putOrderItemUndoCancel.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id, itemId } = await params;
    const result = await putOrderItemUndoCancel(id, itemId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to undo cancel order item";
    console.error("putOrderItemUndoCancel error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  PUT
};
