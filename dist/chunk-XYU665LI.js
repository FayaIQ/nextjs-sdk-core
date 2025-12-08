import {
  getProductInfo
} from "./chunk-G7SO2GWA.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
