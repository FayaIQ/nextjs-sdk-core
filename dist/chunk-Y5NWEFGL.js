import {
  getAddressById
} from "./chunk-BHH2M6QJ.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

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
