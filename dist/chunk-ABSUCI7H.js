// src/inventory/orders/putOrderApprove.ts
async function putOrderApprove(id, note) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(
      Api.putOrderApprove(id),
      { note: note || "" }
    );
  }
  const response = await fetch(`/api/orders/${id}/approve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to approve order: ${response.statusText}`);
  }
  return response.json();
}
async function putOrderApproveList(ids, note) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(
      Api.putOrderApproveList,
      { orderIds: ids, note: note || "" }
    );
  }
  const response = await fetch("/api/orders/approve-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds: ids, note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to approve orders: ${response.statusText}`);
  }
  return response.json();
}

export {
  putOrderApprove,
  putOrderApproveList
};
