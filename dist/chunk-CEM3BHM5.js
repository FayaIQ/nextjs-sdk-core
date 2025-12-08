import {
  postOffersItemsDiscount
} from "./chunk-W7UBHMPX.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

// src/inventory/offers/handler/postOffersItemsDiscount.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const data = await request.json();
    const result = await postOffersItemsDiscount(data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
