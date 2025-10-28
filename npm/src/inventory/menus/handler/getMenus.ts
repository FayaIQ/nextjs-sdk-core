import { NextRequest, NextResponse } from "next/server";
import { getMenus as fetchProducts } from "../getMenus";
import { ItemsFilterParameters } from "../../items/filter-models";

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams =
      ItemsFilterParameters.fromURLSearchParams(searchParams);

    const menus = await fetchProducts({ filterParams });
    return NextResponse.json(menus);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
