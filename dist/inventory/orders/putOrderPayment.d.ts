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

export { type PutOrderPaymentResponse, putOrderPayment, putOrderPaymentStatus };
