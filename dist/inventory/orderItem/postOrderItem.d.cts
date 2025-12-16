interface CreateOrderItemRequest {
    productId: number | string;
    quantity: number;
    price?: number;
    [key: string]: any;
}
declare function postOrderItem(id: string | number, payload: CreateOrderItemRequest): Promise<any>;

export { type CreateOrderItemRequest, postOrderItem };
