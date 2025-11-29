// src/inventory/offers/deleteOffersGroup.ts
async function deleteOffersGroup(offerId, id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return deleteWithAuth(Api.deleteOffersGroup(offerId, id));
  }
  const res = await fetch(`/api/offers/${offerId}/offer-groups/${id}`, { method: "DELETE" });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
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
  deleteOffersGroup
};
