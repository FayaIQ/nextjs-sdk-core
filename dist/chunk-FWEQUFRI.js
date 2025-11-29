import {
  putOrderItemUpdate
} from "./chunk-UPTU6YIW.js";

// src/inventory/orderItem/handler/putOrderItemUpdate.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
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

export {
  PUT
};
