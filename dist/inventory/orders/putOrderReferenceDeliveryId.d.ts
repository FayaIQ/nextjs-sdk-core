interface OrderReferenceDeliveryIdRequest {
    referenceDeliveryId: string;
    [key: string]: any;
}
/**
 * Update order reference delivery ID
 */
declare function putOrderReferenceDeliveryId(orderId: string | number, data: OrderReferenceDeliveryIdRequest): Promise<any>;

export { type OrderReferenceDeliveryIdRequest, putOrderReferenceDeliveryId };
