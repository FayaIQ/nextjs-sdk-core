import {
  getProducts
} from "./chunk-CUJUW7YH.js";
import {
  ItemsFilterParameters
} from "./chunk-M6ARYO26.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

// src/inventory/items/handler/getProducts.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    console.log("Search Params:", searchParams.toString());
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    console.log("Filter Params:", filterParams);
    const products = await getProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  GET
};
