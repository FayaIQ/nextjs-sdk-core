import {
  getOffersCouponsDropdown
} from "./chunk-XVB2BOIM.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

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
