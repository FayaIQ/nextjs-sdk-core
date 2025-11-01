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
    // Import cookies only on server side
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    
    try {
      const result = await postWithAuth<CopyParentResponse>(Api.postCopyParentStore, { itemIds });
      // Handle empty response from backend
      return result || { success: true, message: "Items copied successfully" };
    } catch (error) {
      throw error;
    }
  }

  // client-side: call Next.js API route
  const res = await fetch(`/api/items/copy-parent-store`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemIds }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Copy parent store failed: ${errorData.error || res.statusText}`);
  }
  
  const data = await res.json();
  return data || { success: true, message: "Items copied successfully" };
}
