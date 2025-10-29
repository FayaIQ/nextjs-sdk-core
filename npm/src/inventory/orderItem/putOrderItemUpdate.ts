import { putWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

export async function putOrderItemUpdate( id: string | number, itemId: string | number, payload: any) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUpdate(id, itemId), payload);
  }

  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Failed to update order item: ${res.statusText}`);
  return res.json();
}
