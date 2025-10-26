import { NextRequest, NextResponse } from "next/server";
import { putOrderApproveList } from "../putOrderApprove";

/**
 * Ready-to-use API route handler for approving multiple orders
 * Users can simply re-export this in their app/api/orders/approve-list/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/approve-list';
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderIds  , note } = body;
    
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }

    const result = await putOrderApproveList(orderIds, note);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve orders";
    console.error("Order approve list error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}