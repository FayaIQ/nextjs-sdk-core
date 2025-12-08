import { Api } from "../../api/api";

/**
 * Deactivate item collections by filter
 * @param payload ItemsCollectionsFilterRequest
 */
export async function putCollectionsDeactivateByFilter(payload: any) {
  // server-side: call inventory API with auth
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    return putWithAuth(Api.putItemsCollectionsDeactivateByFilter(), payload);
  }

  // client-side: call Next.js API route
  const res = await fetch(`/api/items/collections/deactivate-by-filter`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
