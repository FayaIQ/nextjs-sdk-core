import {
  getOffersCouponsDropdown
} from "./chunk-RNQFEHPO.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
