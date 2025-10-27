import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign
} from "../../chunk-32ZFB6TZ.js";
import {
  putWithAuth
} from "../../chunk-76HZBVY5.js";
import "../../chunk-VOEBTXP5.js";
import {
  Api
} from "../../chunk-DY3BK5GC.js";

// src/inventory/orders/getOrders.ts
async function getOrders({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-UK3RVZCD.js");
    const { default: getToken } = await import("../../token-LPYK6WGA.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    const token = await getToken();
    return getWithAuth(
      `${Api2.getOrders}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/orders?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/getOrder.ts
async function getOrder(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return getWithAuth(
      `${Api2.getOrder(id)}`
    );
  }
  const response = await fetch(`/api/orders/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/putOrderApprove.ts
async function putOrderApprove(id, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return putWithAuth2(
      Api2.putOrderApprove(id),
      { note: note || "" }
    );
  }
  const response = await fetch(`/api/orders/${id}/approve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to approve order: ${response.statusText}`);
  }
  return response.json();
}
async function putOrderApproveList(ids, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return putWithAuth2(
      Api2.putOrderApproveList(),
      { ordersIds: ids, note: note || "" }
    );
  }
  const response = await fetch("/api/orders/approve-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds: ids, note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to approve orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/putOrderDisapprove.ts
async function putOrderDisapprove(id, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return putWithAuth2(
      Api2.putOrderDisapprove(id),
      { note }
    );
  }
  const response = await fetch(`/api/orders/${id}/disapprove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note })
  });
  if (!response.ok) {
    throw new Error(`Failed to disapprove order: ${response.statusText}`);
  }
  return response.json();
}
async function putOrderDisapproveList(ids, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return putWithAuth2(
      Api2.putOrderDisapproveList(),
      { ordersIds: ids, note }
    );
  }
  const response = await fetch("/api/orders/disapprove-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds: ids, note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to disapprove orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/getOrdersFullInfo.ts
async function getOrdersFullInfo(body) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return postWithAuth(
      Api2.getOrderFullInfo,
      { orderIds: body }
    );
  }
  const response = await fetch("/api/orders/full-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds: body })
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/putOrderChangeStatus.ts
async function putOrderChangeStatus(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return await putWithAuth2(Api2.putChangeStatusOrder(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/change-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to change order status: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/putOrderDiscount.ts
async function putOrderDiscount(orderId, data) {
  if (typeof window === "undefined") {
    return await putWithAuth(Api.putOrderDiscount(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/discount`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order discount: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/putOrderReferenceId.ts
async function putOrderReferenceId(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return await putWithAuth2(Api2.putOrderReferenceId(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/referenceId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order reference ID: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/putOrderReferenceDeliveryId.ts
async function putOrderReferenceDeliveryId(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-UK3RVZCD.js");
    const { Api: Api2 } = await import("../../api-3Z4KILZV.js");
    return await putWithAuth2(Api2.putOrderReferenceDeliveryId(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/referenceDeliveryId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order reference delivery ID: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/handler/full-info.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json();
    const result = await getOrdersFullInfo(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch order full info";
    console.error("Order full info error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/approve.ts
import { NextResponse as NextResponse2 } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!id) {
      return NextResponse2.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderApprove(id, body?.note);
    return NextResponse2.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve order";
    console.error("Order approve error:", message);
    return NextResponse2.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/disapprove.ts
import { NextResponse as NextResponse3 } from "next/server";
async function PUT2(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!id) {
      return NextResponse3.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderDisapprove(id, body?.note);
    return NextResponse3.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove order";
    console.error("Order disapprove error:", message);
    return NextResponse3.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/approve-list.ts
import { NextResponse as NextResponse4 } from "next/server";
async function PUT3(request) {
  try {
    const body = await request.json();
    const { orderIds, note } = body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse4.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }
    const result = await putOrderApproveList(orderIds, note);
    return NextResponse4.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve orders";
    console.error("Order approve list error:", message);
    return NextResponse4.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/disapprove-list.ts
import { NextResponse as NextResponse5 } from "next/server";
async function PUT4(request) {
  try {
    const body = await request.json();
    const { orderIds, note } = body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse5.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }
    const result = await putOrderDisapproveList(orderIds, note);
    return NextResponse5.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove orders";
    console.error("Order disapprove list error:", message);
    return NextResponse5.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/orders.ts
import { NextResponse as NextResponse6 } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = OrdersFilterParameters.fromURLSearchParams(searchParams);
    const orders = await getOrders({ filterParams });
    return NextResponse6.json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse6.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/order.ts
import { NextResponse as NextResponse7 } from "next/server";
async function GET2(request, { params }) {
  try {
    const { id } = await params;
    const result = await getOrder(id);
    return NextResponse7.json(result);
  } catch (error) {
    return NextResponse7.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/change-status.ts
import { NextResponse as NextResponse8 } from "next/server";
async function PUT5(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await putOrderChangeStatus(id, body);
    return NextResponse8.json(result);
  } catch (error) {
    return NextResponse8.json(
      { error: error.message || "Failed to change order status" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/discount.ts
import { NextResponse as NextResponse9 } from "next/server";
async function PUT6(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderDiscount(id, body);
    return NextResponse9.json(result);
  } catch (error) {
    return NextResponse9.json(
      { error: error.message || "Failed to apply order discount" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/reference-id.ts
import { NextResponse as NextResponse10 } from "next/server";
async function PUT7(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceId(id, body);
    return NextResponse10.json(result);
  } catch (error) {
    return NextResponse10.json(
      { error: error.message || "Failed to update order reference ID" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/reference-delivery-id.ts
import { NextResponse as NextResponse11 } from "next/server";
async function PUT8(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceDeliveryId(id, body);
    return NextResponse11.json(result);
  } catch (error) {
    return NextResponse11.json(
      { error: error.message || "Failed to update order reference delivery ID" },
      { status: 500 }
    );
  }
}
export {
  DeleveryType,
  GET2 as GETOrder,
  GET as GETOrders,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  POST as POSTOrderFullInfo,
  PUT as PUTOrderApprove,
  PUT3 as PUTOrderApproveList,
  PUT5 as PUTOrderChangeStatus,
  PUT2 as PUTOrderDisapprove,
  PUT4 as PUTOrderDisapproveList,
  PUT6 as PUTOrderDiscount,
  PUT8 as PUTOrderReferenceDeliveryId,
  PUT7 as PUTOrderReferenceId,
  PayType,
  Sign,
  getOrder,
  getOrders,
  getOrdersFullInfo,
  putOrderApprove,
  putOrderApproveList,
  putOrderChangeStatus,
  putOrderDisapprove,
  putOrderDisapproveList,
  putOrderDiscount,
  putOrderReferenceDeliveryId,
  putOrderReferenceId
};
