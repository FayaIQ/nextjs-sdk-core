import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";
import {
  getProductInfo
} from "./chunk-XAFVNLYG.js";

// src/inventory/items/handler/productInfo.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { id } = await params;
    const product = await getProductInfo(id);
    return NextResponse.json(product);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  GET
};
