import { NextRequest, NextResponse } from "next/server";
import { getBrands } from "../getBrands";

/**
 * Ready-to-use API route handler for brands
 * Users can simply re-export this in their app/api/brands/route.ts:
 *
 * @example
 * export { GET } from 'erp-core/inventory/brands/handler';
 */
export async function GET(request: NextRequest) {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch brands";
    console.error("Brands error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
