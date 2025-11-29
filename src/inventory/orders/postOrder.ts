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
    // Extract error message from response body before throwing
    let errorMessage = ` failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      // Use the error message from the API response
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      // If parsing fails, use the default message
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  
  return res.json();
}