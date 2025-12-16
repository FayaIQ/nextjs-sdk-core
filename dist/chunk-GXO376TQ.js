import {
  getAddressById
} from "./chunk-65B75MWD.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/gps/locations/handler/getAddressById.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const address = await getAddressById(id);
    return NextResponse.json(address);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
