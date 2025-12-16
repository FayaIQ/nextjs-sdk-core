// src/identity/application/getApplicationsStoreDropdown.ts
async function getApplicationsStoreDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getApplicationsStores);
  }
  const res = await fetch(`/api/applications/store/dropdown`);
  if (!res.ok) throw new Error(`Failed to get applications store dropdown: ${res.statusText}`);
  return res.json();
}

export {
  getApplicationsStoreDropdown
};
