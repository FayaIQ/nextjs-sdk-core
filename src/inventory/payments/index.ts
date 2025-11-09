export * from "./getPayments";
export * from "./getPaymentById";
export * from "./postPayment";
export * from "./putPayment";
export * from "./deletePayment";
export * from "./getStorePayments";
export * from "./getPaymentsReport";

// Re-export handlers for easy consumer route wiring
export { GET as GetPaymentsGET } from "./handler/getPayments";
export { GET as GetPaymentsReportGET } from "./handler/getPaymentsReport";
export { GET as GetPaymentByIdGET } from "./handler/getPaymentById";
export { POST as PostPaymentPOST } from "./handler/postPayment";
export { PUT as PutPaymentPUT } from "./handler/putPayment";
export { DELETE as DeletePaymentDELETE } from "./handler/deletePayment";
export { GET as GetStorePaymentsGET } from "./handler/getStorePayments";
