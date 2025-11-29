import {
  getStorePayments
} from "./chunk-3WZEJIHS.js";
import {
  toNextResponseFromError
} from "./chunk-PKBQJMK6.js";

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
