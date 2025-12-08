import {
  postOffersAddItemsByFilter
} from "./chunk-OTXKBUZ7.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

// src/inventory/offers/handler/postOffersAddItemsByFilter.ts
import { NextResponse } from "next/server";
async function POST(request, { params }) {
  try {
    const body = await request.json();
    const p = await params;
    const force = p.forceUpdate === "true" || p.forceUpdate === "1";
    const result = await postOffersAddItemsByFilter(p.id, force, body);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
