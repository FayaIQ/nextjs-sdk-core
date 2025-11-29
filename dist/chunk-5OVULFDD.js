import {
  Api
} from "./chunk-G4WTAWGB.js";
import {
  postWithAuth
} from "./chunk-LSDM7R5V.js";

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
