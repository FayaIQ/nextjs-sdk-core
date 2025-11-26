import {
  getOffersItemsDropdown
} from "./chunk-66RZB35S.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

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
