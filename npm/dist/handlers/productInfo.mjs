import {
  getProductInfo
} from "../chunk-2AOPDFKS.mjs";
import "../chunk-GAPUV7OU.mjs";
import "../chunk-IDMFOTSS.mjs";

// src/handlers/productInfo.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const product = await getProductInfo(params.id);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product info:", error);
    return NextResponse.json(
      { error: "Failed to fetch product info" },
      { status: 500 }
    );
  }
}
export {
  GET
};
