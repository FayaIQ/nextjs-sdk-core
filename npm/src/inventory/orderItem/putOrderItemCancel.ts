import { putWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

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
export async function putOrderItemCancel(id: string | number , itemId : string | number) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemCancel(id, itemId));
  }

  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/cancel`, { method: "PUT" });
  if (!res.ok) throw new Error(`Failed to cancel order item: ${res.statusText}`);
  return res.json();
}
