import {
  getStorePayments
} from "./chunk-2X5X56CQ.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

// src/inventory/payments/handler/getStorePayments.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { storeId } = await params;
    const result = await getStorePayments(storeId);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
