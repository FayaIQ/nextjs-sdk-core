import {
  putOrderDisapproveList
} from "./chunk-PDM7PTWQ.js";

// src/inventory/orders/handler/disapprove-list.ts
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
    const result = await putOrderDisapproveList(orderIds, note);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove orders";
    console.error("Order disapprove list error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export {
  PUT
};
