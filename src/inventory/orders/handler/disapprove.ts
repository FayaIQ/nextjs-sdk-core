import { NextRequest, NextResponse } from "next/server";
import { putOrderDisapprove } from "../putOrderDisapprove";

/**
 * Ready-to-use API route handler for disapproving a single order
 * Users can simply re-export this in their app/api/orders/[id]/disapprove/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/disapprove';
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const result = await putOrderDisapprove(id , body?.note);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove order";
    console.error("Order disapprove error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}