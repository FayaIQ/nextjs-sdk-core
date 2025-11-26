import {
  getApplicationsStoreDropdown
} from "./chunk-6VY2MZ2V.js";

// src/identity/application/handler/getApplicationsStoreDropdown.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const data = await getApplicationsStoreDropdown();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch application stores";
    console.error("applications store dropdown error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
