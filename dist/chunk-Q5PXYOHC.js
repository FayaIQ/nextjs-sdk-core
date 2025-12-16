// src/gps/locations/getLocationChildren.ts
async function getLocationChildren(parentId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(
      `${Api.getLocationChildren(parentId)}`
    );
  }
  const response = await fetch(`/api/locations/${parentId}/children`);
  if (!response.ok) {
    throw new Error(`Failed to fetch location children: ${response.statusText}`);
  }
  return response.json();
}
async function getCities(countryId) {
  return getLocationChildren(countryId);
}
async function getDistricts(cityId) {
  return getLocationChildren(cityId);
}

export {
  getLocationChildren,
  getCities,
  getDistricts
};
