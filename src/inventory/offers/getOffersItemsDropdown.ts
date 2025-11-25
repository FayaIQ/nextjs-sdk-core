export async function getOffersItemsDropdown(): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getOffersItemsDropdown);
  }

  const res = await fetch(`/api/offers/items/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers items dropdown: ${res.statusText}`);
  return res.json();
}
