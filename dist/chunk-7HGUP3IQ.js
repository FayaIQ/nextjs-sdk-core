import {
  putOrderApproveList
} from "./chunk-PCFKWBPC.js";

// src/inventory/orders/handler/approve-list.ts
import { NextResponse } from "next/server";
async function PUT(request) {
  try {
    const body = await request.json();
    const { orderIds, note } = body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }
    const result = await putOrderApproveList(orderIds, note);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve orders";
    console.error("Order approve list error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export {
  PUT
};
