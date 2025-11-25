export * from "./getOrders";
export * from "./getOrder";
export * from "./order-models";
export * from "./postOrder";
export * from "./putOrderApprove";
export * from "./putOrderDisapprove";
export * from "./putOrderPayment";
export * from "./getOrdersFullInfo";
export * from "./putOrderChangeStatus";
export * from "./putOrderDiscount";
export * from "./putOrderReferenceId";
export * from "./putOrderReferenceDeliveryId";
export * from "./postOrder";
// address lookup moved to gps/locations

// Re-export handlers for Next.js API routes
export { POST as POSTOrder } from "./handler/post-order";
export { POST as POSTOrderFullInfo } from "./handler/full-info";
export { PUT as PUTOrderApprove } from "./handler/approve";
export { PUT as PUTOrderDisapprove } from "./handler/disapprove";
export { PUT as PUTOrderApproveList } from "./handler/approve-list";
export { PUT as PUTOrderDisapproveList } from "./handler/disapprove-list";
export { PUT as PUTOrderPayment } from "./handler/payment";
export { PUT as PUTOrderPaymentStatus } from "./handler/payment-status";
export { GET as GETOrders } from "./handler/orders";
export { GET as GETOrder } from "./handler/order";
export { GET as GETAddress } from "./handler/getAddressById";
export { PUT as PUTOrderChangeStatus } from "./handler/change-status";
export { PUT as PUTOrderDiscount } from "./handler/discount";
export { PUT as PUTOrderReferenceId } from "./handler/reference-id";
export { PUT as PUTOrderReferenceDeliveryId } from "./handler/reference-delivery-id";
