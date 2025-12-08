import {
  postOrder
} from "./chunk-CUM7XPCB.js";

// src/inventory/orders/handler/post-order.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const result = await postOrder(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    console.error("post order error:", message);
    const status = err?.status ?? 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export {
  POST
};
