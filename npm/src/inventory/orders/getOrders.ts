import { Order, OrdersFilterParameters } from "./order-models";


export interface OrdersResponse {
  data: Order[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export async function getOrders({
  filterParams,
}: {
  filterParams: OrdersFilterParameters;
}): Promise<OrdersResponse> {
  const params = filterParams.toURLSearchParams();

  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    // Import these from your existing setup
    const { getWithAuth  } = await import("../../core/fetcher");
    const { default: getToken } = await import("../../token");
    const { Api} = await import("../../api/api");
    
    const token = await getToken();
    return getWithAuth<OrdersResponse>(
      `${Api.getOrders}?${params.toString()}`,
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/orders?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  
  return response.json();
}