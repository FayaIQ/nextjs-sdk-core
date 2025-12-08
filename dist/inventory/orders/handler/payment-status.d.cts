import { PutOrderPaymentResponse } from '../putOrderPayment.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for updating order payment status
 * Users can simply re-export this in their app/api/orders/[id]/payment/status/route.ts:
 *
 * @example
 * export { PUT } from 'erp-core/inventory/orders';
 */
declare function PUT(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<PutOrderPaymentResponse> | NextResponse<{
    error: string;
}>>;

export { PUT };
