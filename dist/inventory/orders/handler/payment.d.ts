import { PutOrderPaymentResponse } from '../putOrderPayment.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for updating order payment
 * Users can simply re-export this in their app/api/orders/[id]/payment/route.ts:
 *
 * @example
 * export { PUT } from 'erp-core/inventory/orders';
 */
declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<PutOrderPaymentResponse>>;

export { PUT };
