// src/gps/locations/getCountries.ts
async function getCountries() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api-RRRXOPVN.js");
    return getWithAuth(Api.getCountries);
  }
  const response = await fetch(`/api/locations/countries`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  return response.json();
}

// src/gps/locations/getLocationChildren.ts
async function getLocationChildren(parentId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api-RRRXOPVN.js");
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
  getCountries,
  getLocationChildren,
  getCities,
  getDistricts
};
