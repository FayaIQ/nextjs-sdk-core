import { b as OrdersFilterParameters, d as OrdersApiResponse, h as Order } from '../../order-models-DRKf1XSv.cjs';
export { C as CurrentPhase, D as DeliveryType, c as OrderAddress, f as OrderClient, e as OrderCustomer, g as OrderItem, a as OrderPagingParameters, O as OrderType, P as PayType, S as Sign } from '../../order-models-DRKf1XSv.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse>;

/**
 * Get single order details by ID
 */
declare function getOrder(id: string): Promise<any>;

interface ApproveOrderResponse {
    success: boolean;
    message?: string;
}
declare function putOrderApprove(id: string | number, note?: string): Promise<ApproveOrderResponse>;
declare function putOrderApproveList(ids: (string | number)[], note?: string): Promise<ApproveOrderResponse>;

interface DisapproveOrderResponse {
    success: boolean;
    message?: string;
}
declare function putOrderDisapprove(id: string | number, note: string): Promise<DisapproveOrderResponse>;
declare function putOrderDisapproveList(ids: (string | number)[], note?: string): Promise<DisapproveOrderResponse>;

interface OrderFullInfoResponse {
    data: Order[];
}
declare function getOrdersFullInfo(body: string | number[]): Promise<OrderFullInfoResponse>;

interface ChangeOrderStatusRequest {
    status: number;
    note: string;
    [key: string]: any;
}
/**
 * Change the delivery status of an order
 */
declare function putOrderChangeStatus(orderId: string | number, data: ChangeOrderStatusRequest): Promise<any>;

interface OrderDiscountRequest {
    discountType: number;
    discountValue: number;
    [key: string]: any;
}
/**
 * Apply discount to an order
 */
declare function putOrderDiscount(orderId: string | number, data: OrderDiscountRequest): Promise<any>;

interface OrderReferenceIdRequest {
    referenceId: string;
    [key: string]: any;
}
/**
 * Update order reference ID
 */
declare function putOrderReferenceId(orderId: string | number, data: OrderReferenceIdRequest): Promise<any>;

interface OrderReferenceDeliveryIdRequest {
    referenceDeliveryId: string;
    [key: string]: any;
}
/**
 * Update order reference delivery ID
 */
declare function putOrderReferenceDeliveryId(orderId: string | number, data: OrderReferenceDeliveryIdRequest): Promise<any>;

/**
 * Ready-to-use API route handler for order full info
 * Users can simply re-export this in their app/api/orders/full-info/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/inventory/orders/handler/full-info';
 */
declare function POST(request: NextRequest): Promise<NextResponse<OrderFullInfoResponse> | NextResponse<{
    error: string;
}>>;

declare function PUT$7(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<ApproveOrderResponse>>;

/**
 * Ready-to-use API route handler for disapproving a single order
 * Users can simply re-export this in their app/api/orders/[id]/disapprove/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/disapprove';
 */
declare function PUT$6(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<DisapproveOrderResponse>>;

/**
 * Ready-to-use API route handler for approving multiple orders
 * Users can simply re-export this in their app/api/orders/approve-list/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/approve-list';
 */
declare function PUT$5(request: NextRequest): Promise<NextResponse<ApproveOrderResponse> | NextResponse<{
    error: string;
}>>;

/**
 * Ready-to-use API route handler for disapproving multiple orders
 * Users can simply re-export this in their app/api/orders/disapprove-list/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/disapprove-list';
 */
declare function PUT$4(request: NextRequest): Promise<NextResponse<DisapproveOrderResponse> | NextResponse<{
    error: string;
}>>;

/**
 * Ready-to-use API route handler for orders
 * Users can simply re-export this in their app/api/getOrders/route.ts:
 *
    * @example
    * export { GET } from 'my-next-core/handlers/getOrders';
 */
declare function GET$1(request: NextRequest): Promise<NextResponse<OrdersApiResponse> | NextResponse<{
    error: string;
}>>;

/**
 * GET /api/orders/[id]
 */
declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

/**
 * PUT /api/orders/[id]/change-status
 */
declare function PUT$3(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

/**
 * PUT /api/orders/[id]/discount
 */
declare function PUT$2(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

/**
 * PUT /api/orders/[id]/reference-id
 */
declare function PUT$1(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

/**
 * PUT /api/orders/[id]/reference-delivery-id
 */
declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

export { type ApproveOrderResponse, type ChangeOrderStatusRequest, type DisapproveOrderResponse, GET as GETOrder, GET$1 as GETOrders, Order, type OrderDiscountRequest, type OrderFullInfoResponse, type OrderReferenceDeliveryIdRequest, type OrderReferenceIdRequest, OrdersApiResponse, OrdersFilterParameters, POST as POSTOrderFullInfo, PUT$7 as PUTOrderApprove, PUT$5 as PUTOrderApproveList, PUT$3 as PUTOrderChangeStatus, PUT$6 as PUTOrderDisapprove, PUT$4 as PUTOrderDisapproveList, PUT$2 as PUTOrderDiscount, PUT as PUTOrderReferenceDeliveryId, PUT$1 as PUTOrderReferenceId, getOrder, getOrders, getOrdersFullInfo, putOrderApprove, putOrderApproveList, putOrderChangeStatus, putOrderDisapprove, putOrderDisapproveList, putOrderDiscount, putOrderReferenceDeliveryId, putOrderReferenceId };
