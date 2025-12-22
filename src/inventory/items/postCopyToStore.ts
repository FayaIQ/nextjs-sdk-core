export interface CopyToStoreRequest {
  itemIds: (number | string)[];
  forceUpdate?: boolean;
}

export interface CopyToStoreResponse {
  success: boolean;
  message?: string;
}

/**
 * Copy selected items to a specific child store.
 */
export async function postCopyToStore(
  childStoreId: string | number,
  payload: CopyToStoreRequest
): Promise<CopyToStoreResponse> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<CopyToStoreResponse>(Api.postCopyToStore(childStoreId), payload);
  }

  const res = await fetch(`/api/items/copy-to-store/${childStoreId}`, {
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

export default postCopyToStore;
