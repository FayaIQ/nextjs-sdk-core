import { OrdersApiResponse } from '../order-models.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for orders
 * Users can simply re-export this in their app/api/getOrders/route.ts:
 *
    * @example
    * export { GET } from 'my-next-core/handlers/getOrders';
 */
declare function GET(request: NextRequest): Promise<NextResponse<OrdersApiResponse> | NextResponse<{
    error: string;
}>>;

export { GET };
