import { NextRequest, NextResponse } from "next/server";
import { putOrderDisapproveList } from "../putOrderDisapprove";

/**
 * Ready-to-use API route handler for disapproving multiple orders
 * Users can simply re-export this in their app/api/orders/disapprove-list/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/disapprove-list';
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderIds , note } = body;
    
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }

    const result = await putOrderDisapproveList(orderIds, note);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove orders";
    console.error("Order disapprove list error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}