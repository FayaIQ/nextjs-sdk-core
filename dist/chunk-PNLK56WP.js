import {
  getInvoiceDiscount
} from "./chunk-BMOSPWAW.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

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
