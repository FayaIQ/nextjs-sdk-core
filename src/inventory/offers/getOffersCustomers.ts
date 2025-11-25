export async function getOffersCustomers(): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getOffersCustomers);
  }

  const res = await fetch(`/api/offers/customers`);
  if (!res.ok) throw new Error(`Failed to fetch offers customers: ${res.statusText}`);
  return res.json();
}
