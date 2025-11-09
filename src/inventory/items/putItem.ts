import { Product } from "./types";



export interface UpdateItemResponse {
  success: boolean;
  message?: string;
  code?: string;
  name?: string;
}

/**
 * Update an item by id
 * @param id - Item ID
 * @param data - Fields to update
 */
export async function putItem(
  id: string | number,
  data: Product
): Promise<UpdateItemResponse> {
  // Server-side: call inventory API with auth
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    console.log("putItem data:", data);
    return putWithAuth<UpdateItemResponse>(Api.putItem(id), data);
  }

  // Client-side: call Next.js API route
  const res = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Update item failed: ${errorData.error || res.statusText}`);
  }

  return res.json();
}
