import {
  putOrderReferenceDeliveryId
} from "./chunk-WEILI3PI.js";

// src/inventory/orders/handler/reference-delivery-id.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceDeliveryId(id, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update order reference delivery ID" },
      { status: 500 }
    );
  }
}

export {
  PUT
};
