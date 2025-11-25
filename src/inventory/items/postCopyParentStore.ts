export interface CopyParentResponse {
  success: boolean;
  message?: string;
}

/**
 * Copy parent store items to current store.
 * @param itemIds array of item ids to copy
 */
export async function postCopyParentStore(itemIds: (number | string)[]): Promise<CopyParentResponse> {
  // server-side: call API directly with auth
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    
    return postWithAuth<CopyParentResponse>(Api.postCopyParentStore, { itemIds });
  }

  // client-side: call Next.js API route
  const res = await fetch(`/api/items/copy-parent-store`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemIds }),
  });

  console.log("postCopyParentStore response status:", res.status);

  if (!res.ok) {
    // Extract error message from response body before throwing
    let errorMessage = `Copy parent store failed: ${res.status} ${res.statusText}`;
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