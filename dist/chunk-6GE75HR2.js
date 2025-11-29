import {
  postOffersShippingDiscount
} from "./chunk-UHIDWOMQ.js";
import {
  toNextResponseFromError
} from "./chunk-O4TRWZWB.js";

// src/inventory/offers/handler/postOffersShippingDiscount.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const data = await request.json();
    const result = await postOffersShippingDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
