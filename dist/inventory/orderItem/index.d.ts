import { g as OrderItem } from '../../order-models-DdD4MxCq.js';
import { NextRequest, NextResponse } from 'next/server';

declare function getOrderItem(id: string | number, itemId: string | number): Promise<OrderItem>;

interface CreateOrderItemRequest {
    productId: number | string;
    quantity: number;
    price?: number;
    [key: string]: any;
}
declare function postOrderItem(id: string | number, payload: CreateOrderItemRequest): Promise<any>;

/**
 * Cancel an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 *
 * @returns {Promise<any>} - Server response
 *
 * @throws {Error} - Failed to cancel order item
 */
declare function putOrderItemCancel(id: string | number, itemId: string | number): Promise<any>;

/**
 * Undo cancel an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 * @returns {Promise<Object>} - API response
 * @throws {Error} - If there is an error in the API call
 */
declare function putOrderItemUndoCancel(id: string | number, itemId: string | number): Promise<any>;

/**
 * Update an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 * @param {any} payload - Payload to update order item with
 *
 * @returns {Promise<any>} - Server response
 *
 * @throws {Error} - Failed to update order item
 */
declare function putOrderItemUpdate(id: string | number, itemId: string | number, payload: any): Promise<any>;

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        itemId: string;
    }>;
}): Promise<NextResponse<OrderItem> | NextResponse<{
    error: string;
}>>;

declare function POST(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$2(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        itemId: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$1(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        itemId: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        itemId: string;
    }>;
}): Promise<NextResponse<any>>;

export { type CreateOrderItemRequest, GET as GetOrderItemGET, POST as PostOrderItemPOST, PUT$2 as PutOrderItemCancelPUT, PUT$1 as PutOrderItemUndoCancelPUT, PUT as PutOrderItemUpdatePUT, getOrderItem, postOrderItem, putOrderItemCancel, putOrderItemUndoCancel, putOrderItemUpdate };
