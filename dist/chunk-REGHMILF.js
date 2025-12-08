import {
  getOffersPaging
} from "./chunk-UB63YBDR.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

// src/inventory/offers/handler/getOffersPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getOffersPaging(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
