import {
  putOrderPaymentStatus
} from "./chunk-HZHDS4ST.js";

// src/inventory/orders/handler/payment-status.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const orderId = params.id;
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderPaymentStatus(orderId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update order payment status";
    console.error("Order payment status update error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  PUT
};
