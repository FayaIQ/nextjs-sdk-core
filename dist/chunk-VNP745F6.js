import {
  getOffersCouponsDropdown
} from "./chunk-VOQPNYV4.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

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
