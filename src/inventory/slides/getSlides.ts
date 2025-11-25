export async function getSlides() {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return getWithAuth(Api.getSlideShows);
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/slides?`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}
