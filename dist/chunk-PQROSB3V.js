import {
  getStores
} from "./chunk-64MEJEXK.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

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
