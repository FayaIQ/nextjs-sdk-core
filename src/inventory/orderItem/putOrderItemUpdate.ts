import { putWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

/**
 * Update an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 * @param {any} payload - Payload to update order item with
 *
 * @returns {Promise<any>} - Server response
 *
 * @throws {Error} - Failed to update order item
 */
export async function putOrderItemUpdate( id: string | number, itemId: string | number, payload: any) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUpdate(id, itemId), payload);
  }

  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Failed to update order item: ${res.statusText}`);
  return res.json();
}
