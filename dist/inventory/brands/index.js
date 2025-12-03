import {
  getBrands
} from "../../chunk-XG36FXUE.js";

// src/inventory/brands/handler/get-brands.ts
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
  GET as GetBrandsGET,
  getBrands
};
