import {
  DeliveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign
} from "../../chunk-5K2Y5K5A.js";

// src/inventory/orders/getOrders.ts
async function getOrders({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-NJ5XTHK2.js");
    const { default: getToken } = await import("../../token-ELGDDTPO.js");
    const { Api } = await import("../../api-LDC4ZITG.js");
    const token = await getToken();
    return getWithAuth(
      `${Api.getOrders}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/orders?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/handler/orders.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = OrdersFilterParameters.fromURLSearchParams(searchParams);
    const orders = await getOrders({ filterParams });
    return NextResponse.json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
export {
  DeliveryType,
  GET,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
};
