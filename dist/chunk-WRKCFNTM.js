import {
  putOffersItemsDiscountCustomers
} from "./chunk-G4AROL7D.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

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
