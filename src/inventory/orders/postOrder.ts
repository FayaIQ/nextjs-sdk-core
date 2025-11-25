import { PostOrderRequest, OrderDetail } from "./order-models";

/**
 * Create a new order (v2)
 */
export async function postOrder(data: PostOrderRequest): Promise<OrderDetail> {
  // Server-side: direct API call with auth
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return postWithAuth<OrderDetail>(Api.postOrders, data);
  }

  // Client-side: call Next.js API route
  const res = await fetch(`/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Create order failed: ${errorData.error || res.statusText}`);
  }

  return res.json();
}
