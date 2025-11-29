import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";
import {
  getProducts
} from "./chunk-AHPCCIAJ.js";
import {
  ItemsFilterParameters
} from "./chunk-3K4HOFQA.js";

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
