import {
  getProducts
} from "./chunk-DB2FFP6N.js";
import {
  ItemsFilterParameters
} from "./chunk-OYGQHTYZ.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
