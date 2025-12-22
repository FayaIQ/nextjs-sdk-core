export interface CopyParentToChildStoresRequest {
  itemIds: (number | string)[];
  childStoreIds?: (number | string)[];
}

export interface CopyParentToChildStoresResponse {
  success: boolean;
  message?: string;
}

/**
 * Copy selected parent items to multiple child stores.
 */
export async function postCopyParentToChildStores(
  payload: CopyParentToChildStoresRequest
): Promise<CopyParentToChildStoresResponse> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
  return postWithAuth<CopyParentToChildStoresResponse>(Api.postCopyParentToChildStores, payload);
  }

  const res = await fetch(`/api/items/copy-parent-to-child-stores`, {
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

export default postCopyParentToChildStores;
