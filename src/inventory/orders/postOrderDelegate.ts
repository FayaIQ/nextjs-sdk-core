import { AssignDelegateRequest } from "./order-models";

/**
 * Assign a delegate to a specific order
 */
export async function postOrderDelegate(orderId: number, data: AssignDelegateRequest): Promise<void> {
  // Server-side: direct API call with auth
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return postWithAuth<void>(`${Api.postOrders}/${orderId}/Delagates`, data);
  }

  // Client-side: call Next.js API route
  const res = await fetch(`/api/orders/${orderId}/delegates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Extract error message from response body before throwing
    let errorMessage = `Failed to assign delegate: ${res.status} ${res.statusText}`;
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
}