export async function getStorePayments(storeId: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getStorePayments(storeId));
  }

  const res = await fetch(`/api/stores/${storeId}/payments`);
  if (!res.ok) throw new Error(`Failed to fetch store payments: ${res.statusText}`);
  return res.json();
}
