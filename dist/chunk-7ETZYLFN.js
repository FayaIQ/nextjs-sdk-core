// src/identity/application/storeInfo.ts
async function getStoreInfo() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api-RRFLYPBZ.js");
    return getWithAuth(Api.getStoreInfo);
  }
  const response = await fetch("/api/storeInfo");
  if (!response.ok) {
    throw new Error(`Failed to fetch store info: ${response.statusText}`);
  }
  return response.json();
}

export {
  getStoreInfo
};
