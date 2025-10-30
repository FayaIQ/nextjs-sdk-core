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
    const payload = await request.json().catch(() => ({}));
    // Normalize payload to an array of orderIds
    const orderIds: number[] = Array.isArray(payload)
      ? payload
      : payload.orderIds ?? payload.body ?? [];

    console.log("Received body for full info:", payload);
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ error: "orderIds array is required" }, { status: 400 });
    }

    const result = await getOrdersFullInfo(orderIds);
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