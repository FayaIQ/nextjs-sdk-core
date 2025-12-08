import {
  getStorePayments
} from "./chunk-CAB3ZUBW.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
