import {
  getStores
} from "./chunk-ZEK5ZHQ7.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
