import {
  getOffersItemsDropdown
} from "./chunk-ZSJ2YBLX.js";
import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";

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
