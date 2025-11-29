import {
  getAddressById
} from "./chunk-RRWZVLDN.js";

// src/inventory/orders/handler/getAddressById.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const address = await getAddressById(id);
    return NextResponse.json(address);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch address";
    console.error("address error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
