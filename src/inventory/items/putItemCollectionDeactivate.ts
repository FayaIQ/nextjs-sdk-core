export interface ItemCollectionDeactivateResponse {
  success?: boolean;
  message?: string;
  [key: string]: any;
}

/**
 * Deactivate an item collection for a given item
 */
export async function putItemCollectionDeactivate(
  itemId: string | number,
  id: string | number
): Promise<ItemCollectionDeactivateResponse> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth(Api.putItemCollectionDeactivate(itemId, id));
  }

  const res = await fetch(`/api/items/${itemId}/collections/${id}/deactivate`, {
    method: "PUT",
  });

  if (!res.ok) {
    let err = `failed: ${res.status} ${res.statusText}`;
    try {
      const b = await res.json();
      err = b.error || b.message || err;
    } catch {}
    throw new Error(err);
  }

  return res.json();
}
