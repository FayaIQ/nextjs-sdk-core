import {
  putOffersItemsDiscountCustomers
} from "./chunk-QL77OOQ5.js";
import {
  toNextResponseFromError
} from "./chunk-MKZOJXDY.js";

// src/inventory/offers/handler/putOffersItemsDiscountCustomers.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscountCustomers((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
