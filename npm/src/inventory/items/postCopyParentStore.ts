import { postWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

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
    return postWithAuth<CopyParentResponse>(Api.postCopyParentStore, { itemIds });
  }

  // client-side: call Next.js API route
  const res = await fetch(`/api/items/copy-parent-store`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemIds }),
  });

  if (!res.ok) throw new Error(`Copy parent store failed: ${res.statusText}`);
  return res.json();
}
