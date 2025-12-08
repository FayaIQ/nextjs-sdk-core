import {
  Api
} from "./chunk-4V25FQ2Y.js";

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
    let errorMessage = `Activate items by filter failed: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      errorMessage = body.error || body.message || errorMessage;
    } catch (e) {
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export {
  putCollectionsActivateByFilter
};
