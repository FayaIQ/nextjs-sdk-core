import { postWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

export interface CreateOrderItemRequest {
  // properties depend on upstream API; include a loose shape
  productId: number | string;
  quantity: number;
  price?: number;
  [key: string]: any;
}

export async function postOrderItem(id : string | number, payload: CreateOrderItemRequest) {
  if (typeof window === "undefined") {
    return postWithAuth(Api.postOrderItem(id), payload);
  }

  const res = await fetch(`/api/orders/${id}/orderItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      errorMessage = body.error || body.message || errorMessage;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

