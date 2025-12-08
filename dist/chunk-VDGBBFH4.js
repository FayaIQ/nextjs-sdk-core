import {
  postOffersItemsDiscount
} from "./chunk-YXLFNAX3.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

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
