import {
  getOffersCustomers
} from "./chunk-I2Q7WJJD.js";
import {
  toNextResponseFromError
} from "./chunk-PKBQJMK6.js";

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
