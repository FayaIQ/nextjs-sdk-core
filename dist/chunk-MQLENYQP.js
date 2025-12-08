import {
  getOffersCouponsDropdown
} from "./chunk-73OMY47K.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

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
