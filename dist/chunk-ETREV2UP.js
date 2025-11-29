import {
  getOffersCouponsDropdown
} from "./chunk-2TOPKKID.js";
import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";

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
