import type { Product } from "./types";

/**
 * Fetches detailed information for a specific product by ID
 * Works in both server and client components
 *
 * @param id - The product ID to fetch
 * @returns Promise with product details
 *
 * @example
 * // Server component
 * const product = await getProductInfo("123");
 *
 * @example
 * // Client component
 * const product = await getProductInfo("123");
 */
export async function getProductInfo(id: string): Promise<Product> {

  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth  } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<Product>(`${Api.getProductInfo(id)}`);
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }

  return response.json();
}
