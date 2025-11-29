import {
  getStores
} from "./chunk-CRYCHYEJ.js";
import {
  toNextResponseFromError
} from "./chunk-O4TRWZWB.js";

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
