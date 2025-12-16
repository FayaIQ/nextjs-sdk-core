import {
  getInvoiceDiscount
} from "./chunk-CZ4ALZY4.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/inventory/offers/handler/getInvoiceDiscount.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const result = await getInvoiceDiscount((await params).coupon);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
