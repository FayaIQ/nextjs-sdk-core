// src/inventory/offers/deleteOffer.ts
async function deleteOffer(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return deleteWithAuth(Api.deleteOffer(id));
  }
  const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
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
  deleteOffer
};
