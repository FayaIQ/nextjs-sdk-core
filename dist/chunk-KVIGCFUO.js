import {
  postOffersInvoiceDiscount
} from "./chunk-6V3LRULP.js";
import {
  toNextResponseFromError
} from "./chunk-DUWXBRUL.js";

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
