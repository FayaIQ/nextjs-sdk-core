import type { StoreInfo } from "./types";

/**
 * Fetches store information
 * Works in both server and client components
 * 
 * @returns Promise with store information
 * 
 * @example
 * // Server component
 * const storeInfo = await getStoreInfo();
 * 
 * @example
 * // Client component
 * const storeInfo = await getStoreInfo();
 */
export async function getStoreInfo(): Promise<StoreInfo> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core");
    const { Api } = await import("../../api/api");
    
    return getWithAuth<StoreInfo>(Api.getStoreInfo);
  }

  // Client-side: Use Next.js API route
  const response = await fetch("/api/storeInfo");
  
  if (!response.ok) {
    throw new Error(`Failed to fetch store info: ${response.statusText}`);
  }
  
  return response.json();
}

