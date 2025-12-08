import { ApproveOrderResponse } from '../putOrderApprove.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for approving multiple orders
 * Users can simply re-export this in their app/api/orders/approve-list/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/approve-list';
 */
declare function PUT(request: NextRequest): Promise<NextResponse<ApproveOrderResponse> | NextResponse<{
    error: string;
}>>;

export { PUT };
