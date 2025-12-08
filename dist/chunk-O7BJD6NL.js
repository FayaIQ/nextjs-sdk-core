import {
  Api
} from "./chunk-3XSMIWLO.js";

// src/inventory/items/putCollectionsActivateByFilter.ts
async function putCollectionsActivateByFilter(payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    return putWithAuth(Api.putItemsCollectionsActivateByFilter(), payload);
  }
  const res = await fetch(`/api/items/collections/activate-by-filter`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = ` failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export {
  putCollectionsActivateByFilter
};
