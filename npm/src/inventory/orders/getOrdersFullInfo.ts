import { Order } from "./order-models";

export interface OrderFullInfoResponse {
  data: Order[];
  totalCount: number;
}

export async function getOrderFullInfo( body: string | number []): Promise<OrderFullInfoResponse> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { default: getToken } = await import("../../token");
    const { Api } = await import("../../api/api");

    const token = await getToken();
    return postWithAuth<OrderFullInfoResponse>(
      Api.getOrderFullInfo,
      token,
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