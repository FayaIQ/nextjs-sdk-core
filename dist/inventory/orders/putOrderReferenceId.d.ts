interface OrderReferenceIdRequest {
    referenceId: string;
    [key: string]: any;
}
/**
 * Update order reference ID
 */
declare function putOrderReferenceId(orderId: string | number, data: OrderReferenceIdRequest): Promise<any>;

export { type OrderReferenceIdRequest, putOrderReferenceId };
