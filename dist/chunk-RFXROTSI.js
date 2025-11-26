import {
  putOffersInvoiceDiscount
} from "./chunk-NSIHCYF6.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

// src/inventory/offers/handler/putOffersInvoiceDiscount.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersInvoiceDiscount((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
