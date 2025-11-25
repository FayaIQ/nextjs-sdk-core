// file: nextjs-sdk-core/npm/src/identity/applications/getStores.ts

export interface StoreItem {
    id : string;
    name: string
    clientType: string
}
export async function getStores() {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core");
    const { Api } = await import("../../api/api");
    return getWithAuth<StoreItem[]>(Api.getApplicationsStores);
  }

  // Client-side: Use Next.js API route
  const response  = await fetch(`/api/stores`);

  if (!response.ok) {
    throw new Error(`Failed to fetch stores: ${response.statusText}`);
  }

  return response.json();
}