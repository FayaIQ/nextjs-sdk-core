export async function deletePayment(id: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return deleteWithAuth<any>(Api.deletePayment(id));
  }

  const res = await fetch(`/api/payments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete payment: ${res.statusText}`);
  return res.json();
}
