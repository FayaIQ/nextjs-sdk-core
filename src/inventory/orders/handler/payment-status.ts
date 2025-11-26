import { NextRequest, NextResponse } from "next/server";
import { putOrderPaymentStatus } from "../putOrderPayment";

/**
 * Ready-to-use API route handler for updating order payment status
 * Users can simply re-export this in their app/api/orders/[id]/payment/status/route.ts:
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

    const result = await putOrderPaymentStatus(orderId);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update order payment status";
    console.error("Order payment status update error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
