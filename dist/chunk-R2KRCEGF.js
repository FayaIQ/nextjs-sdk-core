import {
  getOrder
} from "./chunk-QHYPQYGG.js";

// src/inventory/orders/handler/order.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await getOrder(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export {
  GET
};
