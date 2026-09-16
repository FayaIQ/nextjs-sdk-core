import { putWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";




/**
 * Undo cancel an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 * @returns {Promise<Object>} - API response
 * @throws {Error} - If there is an error in the API call
 */

export async function putOrderItemUndoCancel( id: string | number , itemId : string | number) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUndoCancel(id, itemId));
  }

  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/undo-cancel`, { method: "PUT" });

  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      errorMessage = body.error || body.message || errorMessage;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
