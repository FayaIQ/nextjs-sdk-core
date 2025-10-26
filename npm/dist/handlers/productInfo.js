import {
  getProductInfo
} from "../chunk-IGBBNMVB.js";
import "../chunk-LK3IED6J.js";

// src/handlers/productInfo.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const product = await getProductInfo(params.id);
    return NextResponse.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch product info";
    console.error("Product info error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
export {
  GET
};
