import {
  ItemsFilterParameters,
  getProducts
} from "../chunk-ZTOMHQMW.js";
import "../chunk-LK3IED6J.js";

// src/handlers/getProducts.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
export {
  GET
};
