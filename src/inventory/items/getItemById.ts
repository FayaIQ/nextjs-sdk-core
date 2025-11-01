import type { Product } from "./types";

/**
 * Fetches item by ID using v3 API endpoint
 * Works in both server and client components
 *
 * @param id - The item ID to fetch
 * @returns Promise with item details
 *
 * @example
 * // Server component
 * const item = await getItemById(123);
 *
 * @example
 * // Client component
 * const item = await getItemById("123");
 */
export async function getItemById(id: string | number): Promise<Product> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<Product>(Api.getItemById(id));
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/items/${id}/info`);

  if (!response.ok) {
    throw new Error(`Failed to fetch item: ${response.statusText}`);
  }

  return response.json();
}
