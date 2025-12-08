// src/identity/application/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getApplicationsStores);
  }
  const response = await fetch(`/api/stores`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stores: ${response.statusText}`);
  }
  return response.json();
}

export {
  getStores
};
