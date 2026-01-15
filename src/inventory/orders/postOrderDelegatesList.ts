import { AssignDelegateListRequest } from "./order-models";

/**
 * Assign a delegate to multiple orders
 */
export async function postOrderDelegatesList(data: AssignDelegateListRequest): Promise<void> {
  // Server-side: direct API call with auth
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return postWithAuth<void>(`${Api.postOrders}/Delagates/List`, data);
  }

  // Client-side: call Next.js API route
  const res = await fetch(`/api/orders/delegates/list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Extract error message from response body before throwing
    let errorMessage = `Failed to assign delegates: ${res.status} ${res.statusText}`;
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