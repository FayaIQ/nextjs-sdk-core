// file: nextjs-sdk-core/npm/src/locations/getCountries.ts

export async function getCountries() {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core");
    const { Api } = await import("../../api/api");
    return getWithAuth(Api.getCountries);
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/locations/countries`);

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  return response.json();
}