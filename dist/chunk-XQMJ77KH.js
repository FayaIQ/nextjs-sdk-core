import {
  getCoupons
} from "./chunk-MK2HQJCJ.js";
import {
  toNextResponseFromError
} from "./chunk-KKPZYAYC.js";

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
