import {
  getOffersItemsDropdown
} from "./chunk-5ZFYHI24.js";
import {
  toNextResponseFromError
} from "./chunk-PKBQJMK6.js";

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
