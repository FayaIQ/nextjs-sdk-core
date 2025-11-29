import {
  getStorePayments
} from "./chunk-QD5BEQZ7.js";
import {
  toNextResponseFromError
} from "./chunk-KKPZYAYC.js";

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
