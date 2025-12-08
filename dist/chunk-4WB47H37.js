import {
  getParentProducts
} from "./chunk-6VSM62S5.js";
import {
  ItemsFilterParameters
} from "./chunk-MQ5YXN63.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

// src/inventory/items/handler/getParentProducts.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getParentProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  GET
};
