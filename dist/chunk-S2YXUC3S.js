import {
  postOffersCustomerDiscount
} from "./chunk-IGGPSVNI.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/inventory/offers/handler/postOffersCustomerDiscount.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const data = await request.json();
    const result = await postOffersCustomerDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
