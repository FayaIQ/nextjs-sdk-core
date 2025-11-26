import {
  getCoupons
} from "./chunk-5NOCYUVO.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

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
