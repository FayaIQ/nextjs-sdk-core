// src/inventory/items/postCopyParentStore.ts
async function postCopyParentStore(itemIds) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return postWithAuth(Api.postCopyParentStore, { itemIds });
  }
  const res = await fetch(`/api/items/copy-parent-store`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemIds })
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
  postCopyParentStore
};
