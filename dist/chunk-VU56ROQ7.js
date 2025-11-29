import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";
import {
  getStores
} from "./chunk-UYMYUKSJ.js";

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
