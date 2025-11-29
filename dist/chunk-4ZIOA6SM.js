import {
  getBrands
} from "./chunk-DQ7JQ4EJ.js";
import {
  __export
} from "./chunk-MLKGABMK.js";

// src/inventory/brands/handler/get-brands.ts
var get_brands_exports = {};
__export(get_brands_exports, {
  GET: () => GET
});
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch brands";
    console.error("Brands error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET,
  get_brands_exports
};
