import {
  getStores
} from "./chunk-RPTR7EU4.js";

// src/identity/application/handler/getStores.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const stores = await getStores();
    return NextResponse.json(stores);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch stores";
    console.error("stores error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
