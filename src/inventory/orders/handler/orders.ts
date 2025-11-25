// file   : nextjs-sdk-core/npm/src/inventory/orders/handler/orders.ts

import { NextRequest, NextResponse } from "next/server";
import { OrdersFilterParameters } from "../order-models";
import { getOrders } from "../getOrders";

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
    const filterParams = OrdersFilterParameters.fromURLSearchParams(searchParams);
    
    const orders = await getOrders({ filterParams });
    return NextResponse.json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

