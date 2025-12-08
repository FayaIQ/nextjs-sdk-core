// src/inventory/payments/deletePayment.ts
async function deletePayment(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return deleteWithAuth(Api.deletePayment(id));
  }
  const res = await fetch(`/api/payments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete payment: ${res.statusText}`);
  return res.json();
}

export {
  deletePayment
};
