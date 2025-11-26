import { DisapproveOrderResponse } from '../putOrderDisapprove.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for disapproving multiple orders
 * Users can simply re-export this in their app/api/orders/disapprove-list/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/disapprove-list';
 */
declare function PUT(request: NextRequest): Promise<NextResponse<DisapproveOrderResponse> | NextResponse<{
    error: string;
}>>;

export { PUT };
