import {
  postOffersInvoiceDiscount
} from "./chunk-Q24DHJQS.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

// src/inventory/offers/handler/postOffersInvoiceDiscount.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const data = await request.json();
    const result = await postOffersInvoiceDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
