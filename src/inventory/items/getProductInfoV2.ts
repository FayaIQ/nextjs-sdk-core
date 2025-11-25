import type { Product } from "./types";

/**
 * Fetches detailed information for a specific product (v2) by ID
 * Works in both server and client components
 */
export async function getProductInfoV2(id: string): Promise<Product> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<Product>(`${Api.getProductInfoV2(id)}`);
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/products/v2/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product info v2: ${response.statusText}`);
  }

  return response.json();
}
