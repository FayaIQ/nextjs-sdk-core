import {
  getOrdersFullInfo
} from "./chunk-ZEK25FFF.js";

// src/inventory/orders/handler/full-info.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const orderIds = Array.isArray(payload) ? payload : payload.orderIds ?? payload.body ?? [];
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ error: "orderIds array is required" }, { status: 400 });
    }
    const result = await getOrdersFullInfo(orderIds);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch order full info";
    console.error("Order full info error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export {
  POST
};
