interface OrderDiscountRequest {
    discountType: number;
    discountValue: number;
    [key: string]: any;
}
/**
 * Apply discount to an order
 */
declare function putOrderDiscount(orderId: string | number, data: OrderDiscountRequest): Promise<any>;

export { type OrderDiscountRequest, putOrderDiscount };
