import {
  postOffersShippingDiscount
} from "./chunk-VDJVMCYF.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

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
