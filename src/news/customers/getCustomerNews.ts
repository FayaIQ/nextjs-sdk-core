export async function getCustomerNews(): Promise<any> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return getWithAuth<any>(`${Api.getNews}`);
  }
  // Client-side: Use Next.js API route
  const response = await fetch(`/api/news`);

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  return response.json();
}
