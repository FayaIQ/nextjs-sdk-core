import {
  getOrderItem
} from "./chunk-CB22J4T3.js";

// src/inventory/orderItem/handler/getOrderItem.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { id, itemId } = await params;
    const result = await getOrderItem(id, itemId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get order item";
    console.error("getOrderItem error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
