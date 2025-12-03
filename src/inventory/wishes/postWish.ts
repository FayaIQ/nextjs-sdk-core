import { postWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

/**
 * Add an item to the wishlist
 * @param itemId - The item ID to add to wishlist
 * @returns Promise with success response
 */
export async function postWish(itemId: string | number): Promise<void> {
  if (typeof window === "undefined") {
    // Server-side: call API directly
    const url = Api.postWish(itemId);
    return postWithAuth<void>(url, {});
  }

  // Client-side: proxy through Next.js API route
  const res = await fetch(`/api/wishes/${itemId}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(`Failed to add wish: ${res.statusText}`);
  }

  // Return void - no response body expected
  return;
}
