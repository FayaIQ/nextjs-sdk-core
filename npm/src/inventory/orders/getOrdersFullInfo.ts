import { Order } from "./order-models";

export interface OrderFullInfoResponse {
  data: Order[];
}

export async function getOrdersFullInfo( body: string | number []): Promise<OrderFullInfoResponse> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return postWithAuth<OrderFullInfoResponse>(
      Api.getOrderFullInfo,
      { orderIds: body }
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch("/api/orders/full-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderIds: body }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  
  return response.json();
}