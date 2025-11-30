import {
  getBrands
} from "../../chunk-2VYCART3.js";
import {
  __export
} from "../../chunk-MLKGABMK.js";

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
  getBrands,
  get_brands_exports as handlers
};
