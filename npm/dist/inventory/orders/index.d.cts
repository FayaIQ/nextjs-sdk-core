import { O as OrdersResponse } from '../../getOrders-DqBDyqNN.cjs';
export { D as DeliveryType, d as Order, b as OrderPagingParameters, a as OrderType, c as OrdersFilterParameters, P as PayType, S as Sign, g as getOrders } from '../../getOrders-DqBDyqNN.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for orders
 * Users can simply re-export this in their app/api/getOrders/route.ts:
 *
    * @example
    * export { GET } from 'my-next-core/handlers/getOrders';
 */
declare function GET(request: NextRequest): Promise<NextResponse<OrdersResponse> | NextResponse<{
    error: string;
}>>;

export { GET, OrdersResponse };
