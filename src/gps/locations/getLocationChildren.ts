// file: nextjs-sdk-core/npm/src/locations/getLocationChildren.ts

export async function getLocationChildren(parentId: number) {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core");
    const { Api } = await import("../../api/api");

    return getWithAuth(
      `${Api.getLocationChildren(parentId)}`,
    );
  }  

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/locations/${parentId}/children`);

  if (!response.ok) {
    throw new Error(`Failed to fetch location children: ${response.statusText}`);
  }

  return response.json();
}

// Convenience functions for better semantics
export async function getCities(countryId: number) {
  return getLocationChildren(countryId);
}

export async function getDistricts(cityId: number) {
  return getLocationChildren(cityId);
}