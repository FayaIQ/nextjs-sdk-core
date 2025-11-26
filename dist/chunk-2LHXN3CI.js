import {
  getProducts
} from "./chunk-BAOJAAQ7.js";
import {
  ItemsFilterParameters
} from "./chunk-3K4HOFQA.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

// src/inventory/items/handler/getProducts.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  GET
};
