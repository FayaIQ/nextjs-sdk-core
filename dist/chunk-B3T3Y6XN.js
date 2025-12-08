import {
  Api
} from "./chunk-4V25FQ2Y.js";
import {
  postWithAuth
} from "./chunk-SRVE7QP2.js";

// src/inventory/orderItem/postOrderItem.ts
async function postOrderItem(id, payload) {
  if (typeof window === "undefined") {
    return postWithAuth(Api.postOrderItem(id), payload);
  }
  const res = await fetch(`/api/orders/${id}/orderItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to create order item: ${res.statusText}`);
  return res.json();
}

export {
  postOrderItem
};
