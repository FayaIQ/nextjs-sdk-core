import {
  getStores
} from "./chunk-MBW6ZNLR.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

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
