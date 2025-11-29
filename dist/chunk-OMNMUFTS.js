import {
  putOrderDiscount
} from "./chunk-NFQA2NFV.js";

// src/inventory/orders/handler/discount.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderDiscount(id, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to apply order discount" },
      { status: 500 }
    );
  }
}

export {
  PUT
};
