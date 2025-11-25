export { g as getOrders } from '../../getOrders-DRGRR3-D.cjs';
import { i as OrderDetail, a as OrdersApiResponse } from '../../order-models-DdD4MxCq.cjs';
export { C as CurrentPhase, D as DeleveryType, h as Order, d as OrderAddress, f as OrderClient, e as OrderCustomer, g as OrderItem, c as OrderPagingParameters, b as OrderType, O as OrdersFilterParameters, P as PayType, S as Sign } from '../../order-models-DdD4MxCq.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Get single order details by ID
 */
declare function getOrder(id: string): Promise<any>;

/**
 * Order item interface for creating orders
 */
interface OrderItemInput {
    itemId: number;
    quantity: number;
    colorId?: number | null;
    sizeId?: number | null;
    unitLevel?: number;
    freeQuantity?: number;
    discount?: number;
    note?: string;
    costPrice?: number;
    price?: number;
    pricePack1?: number;
    pricePack2?: number;
}
/**
 * Address information for order delivery
 */
interface CreateOrderAddress {
    districtId: number;
    note?: string;
    gps?: string;
    appartmentId?: number;
}
/**
 * Request payload for creating a new order
 */
interface PostOrderRequest {
    address: CreateOrderAddress;
    storeId?: number;
    orderType?: number;
    deleveryType?: number;
    payType?: number;
    gatewayType?: number;
    orderDeleveryDate?: string;
    note?: string;
    currencyId?: number;
    couponCode?: string;
    laserNote?: string;
    giftNote?: string;
    clientId?: string;
    paymentTokenId?: string;
    points?: number;
    applyDarkOffer?: boolean;
    orderItems: OrderItemInput[];
}
/**
 * Response from order creation
 */
interface PostOrderResponse {
    [key: string]: any;
}
/**
 * Options for postOrder function
 */
interface PostOrderOptions {
    headers?: Record<string, string>;
}
/**
 * Create a new order (server-side with authentication)
 *
 * @param orderData - The order data to create
 * @param options - Optional configuration (e.g., custom headers)
 * @returns Promise with the created order response
 *
 * @example Server Component:
 * ```typescript
 * import { postOrder } from 'erp-core/inventory/orders';
 *
 * const orderData = {
 *   address: {
 *     districtId: 21,
 *     gps: "",
 *     note: "Delivery instructions"
 *   },
 *   orderType: 1,
 *   deleveryType: 1,
 *   payType: 1,
 *   gatewayType: 1,
 *   orderItems: [
 *     {
 *       itemId: 389003,
 *       quantity: 1,
 *       colorId: 105901,
 *       unitLevel: 1
 *     }
 *   ]
 * };
 *
 * // With custom headers if needed
 * const result = await postOrder(orderData, {
 *   headers: { 'X-Store-Id': '123' }
 * });
 * ```
 *
 * @example Client Component (using API route):
 * ```typescript
 * const response = await fetch('/api/orders', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(orderData)
 * });
 * const result = await response.json();
 * ```
 */
declare function postOrder(orderData: PostOrderRequest, options?: PostOrderOptions): Promise<PostOrderResponse>;

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

/**
 * Response from payment update operations
 */
interface PutOrderPaymentResponse {
    success?: boolean;
    message?: string;
    [key: string]: any;
}
/**
 * Update order payment status (server-side only)
 *
 * @param orderId - The ID of the order to update payment for
 * @returns Promise with the payment update response
 *
 * @example Server Component:
 * ```typescript
 * import { putOrderPayment } from 'erp-core/inventory/orders';
 *
 * const result = await putOrderPayment(12345);
 * ```
 *
 * @example Client Component (using API route):
 * ```typescript
 * const response = await fetch(`/api/orders/${orderId}/payment`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' }
 * });
 * const result = await response.json();
 * ```
 */
declare function putOrderPayment(orderId: number | string): Promise<PutOrderPaymentResponse>;
/**
 * Update order payment status (server-side only)
 *
 * @param orderId - The ID of the order to update payment status for
 * @returns Promise with the payment status update response
 *
 * @example Server Component:
 * ```typescript
 * import { putOrderPaymentStatus } from 'erp-core/inventory/orders';
 *
 * const result = await putOrderPaymentStatus(12345);
 * ```
 *
 * @example Client Component (using API route):
 * ```typescript
 * const response = await fetch(`/api/orders/${orderId}/payment/status`, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' }
 * });
 * const result = await response.json();
 * ```
 */
declare function putOrderPaymentStatus(orderId: number | string): Promise<PutOrderPaymentResponse>;

type OrderIdsInput = number[] | {
    orderIds?: number[];
    body?: number[];
};
/**
 * Fetch full info for orders. Accepts either an array of ids or an object
 * containing `orderIds` (or legacy `body`) and normalizes to the shape the
 * backend expects: { orderIds: [...] }.
 */
declare function getOrdersFullInfo(input: OrderIdsInput): Promise<OrderDetail[]>;

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
 * Ready-to-use API route handler for creating orders
 * Users can simply re-export this in their app/api/orders/route.ts:
 *
 * @example
 * export { POST } from 'erp-core/inventory/orders';
 */
declare function POST$1(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<PostOrderResponse>>;

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

declare function PUT$9(request: NextRequest, { params }: {
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
declare function PUT$8(request: NextRequest, { params }: {
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
declare function PUT$7(request: NextRequest): Promise<NextResponse<ApproveOrderResponse> | NextResponse<{
    error: string;
}>>;

/**
 * Ready-to-use API route handler for disapproving multiple orders
 * Users can simply re-export this in their app/api/orders/disapprove-list/route.ts:
 *
 * @example
 * export { PUT } from 'my-next-core/inventory/orders/handler/disapprove-list';
 */
declare function PUT$6(request: NextRequest): Promise<NextResponse<DisapproveOrderResponse> | NextResponse<{
    error: string;
}>>;

/**
 * Ready-to-use API route handler for updating order payment
 * Users can simply re-export this in their app/api/orders/[id]/payment/route.ts:
 *
 * @example
 * export { PUT } from 'erp-core/inventory/orders';
 */
declare function PUT$5(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<PutOrderPaymentResponse>>;

/**
 * Ready-to-use API route handler for updating order payment status
 * Users can simply re-export this in their app/api/orders/[id]/payment/status/route.ts:
 *
 * @example
 * export { PUT } from 'erp-core/inventory/orders';
 */
declare function PUT$4(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<PutOrderPaymentResponse> | NextResponse<{
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

export { type ApproveOrderResponse, type ChangeOrderStatusRequest, type CreateOrderAddress, type DisapproveOrderResponse, GET as GETOrder, GET$1 as GETOrders, OrderDetail, type OrderDiscountRequest, type OrderItemInput, type OrderReferenceDeliveryIdRequest, type OrderReferenceIdRequest, OrdersApiResponse, POST$1 as POSTOrder, POST as POSTOrderFullInfo, PUT$9 as PUTOrderApprove, PUT$7 as PUTOrderApproveList, PUT$3 as PUTOrderChangeStatus, PUT$8 as PUTOrderDisapprove, PUT$6 as PUTOrderDisapproveList, PUT$2 as PUTOrderDiscount, PUT$5 as PUTOrderPayment, PUT$4 as PUTOrderPaymentStatus, PUT as PUTOrderReferenceDeliveryId, PUT$1 as PUTOrderReferenceId, type PostOrderOptions, type PostOrderRequest, type PostOrderResponse, type PutOrderPaymentResponse, getOrder, getOrdersFullInfo, postOrder, putOrderApprove, putOrderApproveList, putOrderChangeStatus, putOrderDisapprove, putOrderDisapproveList, putOrderDiscount, putOrderPayment, putOrderPaymentStatus, putOrderReferenceDeliveryId, putOrderReferenceId };
