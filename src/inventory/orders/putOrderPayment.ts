import { putWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

/**
 * Response from payment update operations
 */
export interface PutOrderPaymentResponse {
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
export async function putOrderPayment(
  orderId: number | string
): Promise<PutOrderPaymentResponse> {
  const normalizedId =
    typeof orderId === "string" ? orderId.trim() : String(orderId);

  if (!normalizedId) {
    throw new Error("Invalid order id");
  }

  // Server-side execution using core fetcher with auth
  if (typeof window === "undefined") {
    return putWithAuth<PutOrderPaymentResponse>(
      Api.putOrderPayment(normalizedId)
    );
  }

  // Client-side execution - route through Next.js API
  const res = await fetch(`/api/orders/${normalizedId}/payment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      error.message || `Failed to update order payment: ${res.statusText}`
    );
  }

  return res.json();
}

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
export async function putOrderPaymentStatus(
  orderId: number | string
): Promise<PutOrderPaymentResponse> {
  const normalizedId =
    typeof orderId === "string" ? orderId.trim() : String(orderId);

  if (!normalizedId) {
    throw new Error("Invalid order id");
  }

  // Server-side execution using core fetcher with auth
  if (typeof window === "undefined") {
    return putWithAuth<PutOrderPaymentResponse>(
      Api.putOrderPaymentStatus(normalizedId)
    );
  }

  // Client-side execution - route through Next.js API
  const res = await fetch(`/api/orders/${normalizedId}/payment/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      error.message ||
        `Failed to update order payment status: ${res.statusText}`
    );
  }

  return res.json();
}
