// src/inventory/orders/putOrderDisapprove.ts
async function putOrderDisapprove(id, note) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(
      Api.putOrderDisapprove(id),
      { note }
    );
  }
  const response = await fetch(`/api/orders/${id}/disapprove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note })
  });
  if (!response.ok) {
    throw new Error(`Failed to disapprove order: ${response.statusText}`);
  }
  return response.json();
}
async function putOrderDisapproveList(ids, note) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(
      Api.putOrderDisapproveList,
      { orderIds: ids, note: note || "" }
    );
  }
  const response = await fetch("/api/orders/disapprove-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds: ids, note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to disapprove orders: ${response.statusText}`);
  }
  return response.json();
}

export {
  putOrderDisapprove,
  putOrderDisapproveList
};
