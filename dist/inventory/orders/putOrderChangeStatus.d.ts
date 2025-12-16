interface ChangeOrderStatusRequest {
    status: number;
    note: string;
    [key: string]: any;
}
/**
 * Change the delivery status of an order
 */
declare function putOrderChangeStatus(orderId: string | number, data: ChangeOrderStatusRequest): Promise<any>;

export { type ChangeOrderStatusRequest, putOrderChangeStatus };
