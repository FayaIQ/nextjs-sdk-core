import { deleteWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

/**
 * Remove an item from the wishlist
 * @param itemId - The item ID to remove from wishlist
 * @returns Promise with success response
 */
export async function deleteWish(itemId: string | number): Promise<void> {
  if (typeof window === "undefined") {
    // Server-side: call API directly
    const url = Api.deleteWish(itemId);
    return deleteWithAuth<void>(url);
  }

  // Client-side: proxy through Next.js API route
  const res = await fetch(`/api/wishes/${itemId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to remove wish: ${res.statusText}`);
  }

  // Return void - no response body expected
  return;
}
