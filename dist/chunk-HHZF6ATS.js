import {
  putOffersInvoiceDiscount
} from "./chunk-X7C7OPRS.js";
import {
  toNextResponseFromError
} from "./chunk-KKPZYAYC.js";

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
