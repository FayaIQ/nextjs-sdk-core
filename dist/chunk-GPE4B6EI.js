import {
  Api
} from "./chunk-FY27PB4C.js";
import {
  putWithAuth
} from "./chunk-OMKNGOFC.js";

// src/inventory/orderItem/putOrderItemUpdate.ts
async function putOrderItemUpdate(id, itemId, payload) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUpdate(id, itemId), payload);
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to update order item: ${res.statusText}`);
  return res.json();
}

export {
  putOrderItemUpdate
};
