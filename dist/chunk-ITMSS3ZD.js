import {
  getOffersCouponsDropdown
} from "./chunk-EHXRCWVQ.js";
import {
  toNextResponseFromError
} from "./chunk-DUWXBRUL.js";

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
