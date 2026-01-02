import { Product, UpdateItemRequest } from "./types";



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
  data: UpdateItemRequest
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