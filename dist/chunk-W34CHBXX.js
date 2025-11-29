import {
  Api
} from "./chunk-4D7LFOTQ.js";
import {
  getWithAuth
} from "./chunk-54PNX2EJ.js";

// src/inventory/orderItem/getOrderItem.ts
async function getOrderItem(id, itemId) {
  if (typeof window === "undefined") {
    return getWithAuth(Api.getOrderItem(id, itemId));
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}`);
  if (!res.ok) throw new Error(`Failed to fetch order item: ${res.statusText}`);
  return res.json();
}

export {
  getOrderItem
};
