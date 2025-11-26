import {
  getOffersCustomers
} from "./chunk-SAQKCS72.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

// src/inventory/offers/handler/getOffersCustomers.ts
import { NextResponse } from "next/server";
async function GET() {
  try {
    const result = await getOffersCustomers();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
