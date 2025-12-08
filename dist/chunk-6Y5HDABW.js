import {
  getProductInfoV2
} from "./chunk-Y3UBMBZN.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

// src/inventory/items/handler/productInfoV2.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { id } = await params;
    const product = await getProductInfoV2(id);
    return NextResponse.json(product);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  GET
};
