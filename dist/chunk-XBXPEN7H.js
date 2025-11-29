import {
  putOrderItemCancel
} from "./chunk-NWZTVUJ6.js";

// src/inventory/orderItem/handler/putOrderItemCancel.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id, itemId } = await params;
    const result = await putOrderItemCancel(id, itemId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to cancel order item";
    console.error("putOrderItemCancel error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  PUT
};
