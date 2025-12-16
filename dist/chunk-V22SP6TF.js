import {
  getStores
} from "./chunk-2NBZ2JTF.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
