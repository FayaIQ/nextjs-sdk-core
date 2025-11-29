import {
  postOrderItem
} from "./chunk-7VF24FHZ.js";

// src/inventory/orderItem/handler/postOrderItem.ts
import { NextResponse } from "next/server";
async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const result = await postOrderItem(id, body);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order item";
    console.error("postOrderItem error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  POST
};
