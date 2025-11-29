import { DisapproveOrderResponse } from '../putOrderDisapprove.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for disapproving a single order
 * Users can simply re-export this in their app/api/orders/[id]/disapprove/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/disapprove';
 */
declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<DisapproveOrderResponse>>;

export { PUT };
