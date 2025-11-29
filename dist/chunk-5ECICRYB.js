import {
  postWithAuth
} from "./chunk-43V4HC6L.js";
import {
  Api
} from "./chunk-FY27PB4C.js";

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
