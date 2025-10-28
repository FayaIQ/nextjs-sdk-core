import { NextRequest, NextResponse } from "next/server";
import { getMenusDropdown } from "../getMenusDropdown";

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
export async function GET(request: NextRequest) {
  try {
    const menus = await getMenusDropdown();
    return NextResponse.json(menus);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
