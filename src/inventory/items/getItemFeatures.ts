export async function getItemFeatures({ id }: { id: string }): Promise<any> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(`${Api.getItemFeatures(id)}`);
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/item/${id}/features`);

  if (!response.ok) {
    throw new Error(`Failed to fetch features: ${response.statusText}`);
  }

  return response.json();
}
