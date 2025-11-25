import type { OrderAddress } from "../../inventory/orders/order-models";

export async function getAddressById(id: string | number): Promise<OrderAddress> {
  // Server-side: call inventory service directly with auth
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core");
    const { Api } = await import("../../api/api");
    return getWithAuth(Api.getAddress(id)) as Promise<OrderAddress>;
  }

  // Client-side: proxy to local API route
  const res = await fetch(`/api/addresses/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch address ${id}: ${res.statusText}`);
  }
  return res.json();
}
