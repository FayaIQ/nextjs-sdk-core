import {
  getProductInfoV2
} from "./chunk-DNUW37KY.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

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
