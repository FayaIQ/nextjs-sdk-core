import {
  getCoupons
} from "./chunk-XIQBFIB6.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

// src/inventory/offers/handler/coupons.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const Coupons = await getCoupons();
    return NextResponse.json(Coupons);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  GET
};
