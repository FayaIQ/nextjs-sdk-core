import type { Store } from "./store-models";

export async function getStores(): Promise<Store[]> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");
    return getWithAuth<Store[]>(Api.getStores);
  }

  const res = await fetch(`/api/stores`);
  if (!res.ok) throw new Error(`Failed to fetch stores: ${res.statusText}`);
  return res.json();
}
