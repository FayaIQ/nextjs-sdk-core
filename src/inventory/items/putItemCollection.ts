import { UpdateItemResponse } from "./putItem";

export interface UpdateItemCollectionRequest {
  barcode?: string;
  code?: string;
  price?: number;
  colorId?: number;
  sizeValueId?: number;
  unitLevel?: number;
  isActive?: boolean;
  [key: string]: any;
}

/**
 * Update an item collection by itemId and collection id
 */
export async function putItemCollection(
  itemId: string | number,
  id: string | number,
  data: UpdateItemCollectionRequest
): Promise<UpdateItemResponse> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth<UpdateItemResponse>(Api.putItemCollection(itemId, id), data);
  }

  const res = await fetch(`/api/items/${itemId}/collections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json-patch+json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMessage = ` failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
