import {
  getOfferById
} from "./chunk-BUSTGB3W.js";
import {
  toNextResponseFromError
} from "./chunk-PKBQJMK6.js";

// src/inventory/offers/handler/getOfferById.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const result = await getOfferById((await params).id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
