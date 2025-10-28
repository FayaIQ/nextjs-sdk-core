// file   : nextjs-sdk-core/npm/src/inventory/orders/handler/orders.ts

import { NextRequest, NextResponse } from "next/server";
import { ItemsFilterParameters } from "../../../filter-models";
import { getMenus } from "../getMenus";

/**
 * Ready-to-use API route handler for orders
 * Users can simply re-export this in their app/api/getOrders/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getOrders';
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams =
      ItemsFilterParameters.fromURLSearchParams(searchParams);

    const menus = await getMenus({ filterParams });
    return NextResponse.json(menus);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
