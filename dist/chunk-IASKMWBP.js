import {
  putOffersCustomerDiscount
} from "./chunk-HJHOXCYU.js";
import {
  toNextResponseFromError
} from "./chunk-O4TRWZWB.js";

// src/inventory/offers/handler/putOffersCustomerDiscount.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersCustomerDiscount((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
