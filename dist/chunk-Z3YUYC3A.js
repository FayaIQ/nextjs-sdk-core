import {
  putOrderPayment
} from "./chunk-CBUC6MYG.js";

// src/inventory/orders/handler/payment.ts
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
    const result = await putOrderPayment(orderId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update order payment";
    console.error("Order payment update error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  PUT
};
