import {
  Api
} from "./chunk-OQSZKE7D.js";
import {
  putWithAuth
} from "./chunk-BGXESJA4.js";

// src/inventory/orderItem/putOrderItemCancel.ts
async function putOrderItemCancel(id, itemId) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemCancel(id, itemId));
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/cancel`, { method: "PUT" });
  if (!res.ok) throw new Error(`Failed to cancel order item: ${res.statusText}`);
  return res.json();
}

export {
  putOrderItemCancel
};
