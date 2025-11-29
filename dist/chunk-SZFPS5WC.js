import {
  getOffersItemsDropdown
} from "./chunk-IJDNM2QL.js";
import {
  toNextResponseFromError
} from "./chunk-KKPZYAYC.js";

// src/inventory/offers/handler/getOffersItemsDropdown.ts
import { NextResponse } from "next/server";
async function GET() {
  try {
    const result = await getOffersItemsDropdown();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
