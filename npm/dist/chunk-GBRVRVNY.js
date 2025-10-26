import {
  Api,
  apiFetch,
  getToken
} from "./chunk-LK3IED6J.js";

// src/storeInfo.ts
async function getStoreInfo() {
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch(Api.getStoreInfo, { token });
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
