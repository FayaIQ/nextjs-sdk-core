import {  OrdersApiResponse, OrdersFilterParameters } from "./order-models";




export async function getOrders({
  filterParams,
}: {
  filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse> {
  const params = filterParams.toURLSearchParams();

  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    // Import these from your existing setup
    const { getWithAuth } = await import("../../core/fetcher");
    const { default: getToken } = await import("../../token");
    const { Api } = await import("../../api/api");

    const token = await getToken();
    console.log("Fetching orders with params:", `${Api.getOrders}?${params.toString()}`);
    return getWithAuth<OrdersApiResponse>(

      `${Api.getOrders}?${params.toString()}`,
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/orders?${params.toString()}`);


  if (!response.ok) {
    let errorMessage = `failed: ${response.status} ${response.statusText}`;
    try {
      const body = await response.json();
      errorMessage = body.error || body.message || errorMessage;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return  response.json();
}
