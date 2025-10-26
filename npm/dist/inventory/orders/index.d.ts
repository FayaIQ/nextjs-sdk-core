import { O as Order, a as OrdersFilterParameters } from '../../order-models-Bmpo9Eib.js';
export { D as DeliveryType, c as OrderPagingParameters, b as OrderType, P as PayType, S as Sign } from '../../order-models-Bmpo9Eib.js';
import { NextRequest, NextResponse } from 'next/server';

interface OrdersResponse {
    data: Order[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
}
declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersResponse>;

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

export { GET, Order, OrdersFilterParameters, type OrdersResponse, getOrders };
