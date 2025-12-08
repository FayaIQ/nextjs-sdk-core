import {
  getOffersCustomers
} from "./chunk-OUGRW7CN.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
