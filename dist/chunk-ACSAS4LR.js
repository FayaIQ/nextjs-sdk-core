import {
  putOffersShippingDiscount
} from "./chunk-2UEA2WXZ.js";
import {
  toNextResponseFromError
} from "./chunk-KKPZYAYC.js";

// src/inventory/offers/handler/putOffersShippingDiscount.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersShippingDiscount((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
