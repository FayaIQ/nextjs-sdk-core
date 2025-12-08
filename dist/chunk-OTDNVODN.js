import {
  getCoupons
} from "./chunk-3KY73T4N.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
