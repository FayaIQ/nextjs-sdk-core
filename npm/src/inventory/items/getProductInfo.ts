import { Api } from "../../api/api";
import { apiFetch } from "../../core/fetcher";
import getToken from "../../token";
import type { Product } from "../../types";

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
    const token = await getToken();
    return apiFetch<Product>(`${Api.getProductInfo(id)}/`, {
      token,
    });
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/productInfo/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product info: ${response.statusText}`);
  }

  return response.json();
}
