import {
  getStores
} from "./chunk-RE63XO54.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

// src/stores/handler/getStores.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const stores = await getStores();
    return NextResponse.json(stores);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
