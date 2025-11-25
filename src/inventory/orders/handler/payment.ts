import { NextRequest, NextResponse } from "next/server";
import { putOrderPayment } from "../putOrderPayment";

/**
 * Ready-to-use API route handler for updating order payment
 * Users can simply re-export this in their app/api/orders/[id]/payment/route.ts:
 *
 * @example
 * export { PUT } from 'erp-core/inventory/orders';
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const result = await putOrderPayment(orderId);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update order payment";
    console.error("Order payment update error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
