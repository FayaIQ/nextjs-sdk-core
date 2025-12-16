import { OrderDetail } from '../order-models.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for order full info
 * Users can simply re-export this in their app/api/orders/full-info/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/inventory/orders/handler/full-info';
 */
declare function POST(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<OrderDetail[]>>;

export { POST };
