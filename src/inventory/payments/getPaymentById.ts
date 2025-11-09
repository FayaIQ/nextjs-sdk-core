export async function getPaymentById(id: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getPayment(id));
  }

  const res = await fetch(`/api/payments/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch payment: ${res.statusText}`);
  return res.json();
}
