import {
  Api
} from "./chunk-G4WTAWGB.js";
import {
  putWithAuth
} from "./chunk-LSDM7R5V.js";

// src/inventory/orderItem/putOrderItemUndoCancel.ts
async function putOrderItemUndoCancel(id, itemId) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUndoCancel(id, itemId));
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/undo-cancel`, { method: "PUT" });
  if (!res.ok) throw new Error(`Failed to undo cancel order item: ${res.statusText}`);
  return res.json();
}

export {
  putOrderItemUndoCancel
};
