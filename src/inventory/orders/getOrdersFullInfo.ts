import { OrderDetail } from "./order-models";

type OrderIdsInput = number[] | { orderIds?: number[]; body?: number[] };

/**
 * Fetch full info for orders. Accepts either an array of ids or an object
 * containing `orderIds` (or legacy `body`) and normalizes to the shape the
 * backend expects: { orderIds: [...] }.
 */
export async function getOrdersFullInfo(input: OrderIdsInput): Promise<OrderDetail[]> {
  const orderIds: number[] = Array.isArray(input)
    ? input
    : (input.orderIds ?? input.body ?? []);

  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return postWithAuth<OrderDetail[]>(Api.getOrderFullInfo, { orderIds });
  }

  // Client-side: Use Next.js API route
  const response = await fetch("/api/orders/full-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderIds }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }

  return response.json();
}