import {
  getOffersCouponsDropdown
} from "./chunk-EOQ4OZOE.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/inventory/offers/handler/getOffersCouponsDropdown.ts
import { NextResponse } from "next/server";
async function GET() {
  try {
    const result = await getOffersCouponsDropdown();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
