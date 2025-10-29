import { putWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

export async function putOrderItemUndoCancel( id: string | number , itemId : string | number) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUndoCancel(id, itemId));
  }

  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/undo-cancel`, { method: "PUT" });
  if (!res.ok) throw new Error(`Failed to undo cancel order item: ${res.statusText}`);
  return res.json();
}
