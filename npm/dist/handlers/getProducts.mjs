import {
  ItemsFilterParameters,
  getProducts
} from "../chunk-NXPP2WXE.mjs";
import "../chunk-GAPUV7OU.mjs";
import "../chunk-IDMFOTSS.mjs";

// src/handlers/getProducts.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
export {
  GET
};
