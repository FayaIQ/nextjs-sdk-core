// src/inventory/items/putItem.ts
async function putItem(id, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    console.log("putItem data:", data);
    return putWithAuth(Api.putItem(id), data);
  }
  const res = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Update item failed: ${errorData.error || res.statusText}`);
  }
  return res.json();
}

export {
  putItem
};
