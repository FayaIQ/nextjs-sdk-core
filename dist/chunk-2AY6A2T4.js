import {
  getParentProducts
} from "./chunk-DQOEOMLE.js";
import {
  toNextResponseFromError
} from "./chunk-DUWXBRUL.js";
import {
  ItemsFilterParameters
} from "./chunk-3K4HOFQA.js";

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
