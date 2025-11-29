import {
  putWithAuth
} from "./chunk-43V4HC6L.js";
import {
  Api
} from "./chunk-FY27PB4C.js";

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
