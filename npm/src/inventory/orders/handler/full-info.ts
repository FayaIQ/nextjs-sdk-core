import { NextRequest, NextResponse } from "next/server";
import { getOrdersFullInfo } from "../getOrdersFullInfo";

/**
 * Ready-to-use API route handler for order full info
 * Users can simply re-export this in their app/api/orders/full-info/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/inventory/orders/handler/full-info';
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await getOrdersFullInfo( body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch order full info";
    console.error("Order full info error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}