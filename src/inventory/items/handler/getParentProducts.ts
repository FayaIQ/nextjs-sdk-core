import { NextRequest, NextResponse } from "next/server";
import { getParentProducts } from "../getParentProducts";
import { ItemsFilterParameters } from "../filter-models";


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

    const  products = await getParentProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
