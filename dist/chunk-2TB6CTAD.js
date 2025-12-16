// src/gps/locations/getCountries.ts
async function getCountries() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getCountries);
  }
  const response = await fetch(`/api/locations/countries`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  return response.json();
}

export {
  getCountries
};
