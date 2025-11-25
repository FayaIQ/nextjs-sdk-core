export async function putOffersItemsDiscountCustomers(id: string | number, payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth<any>(Api.putOffersItemsDiscountCustomers(id), payload);
  }

  const res = await fetch(`/api/offers/${id}/items-discount/customers`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to put items discount customers: ${res.statusText}`);
  return res.json();
}
