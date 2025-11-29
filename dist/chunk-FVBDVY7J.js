import {
  getProductInfoV2
} from "./chunk-YZRSGL53.js";
import {
  toNextResponseFromError
} from "./chunk-O4TRWZWB.js";

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
