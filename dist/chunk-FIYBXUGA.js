import {
  getCoupons
} from "./chunk-QQ4XYHEN.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

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
