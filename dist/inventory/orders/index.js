import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "../../chunk-OY4VLQUC.js";
import {
  Api
} from "../../chunk-4D7LFOTQ.js";
import {
  getAddressById
} from "../../chunk-X3E4AE7S.js";
import {
  toNextResponseFromError
} from "../../chunk-2MRUSURF.js";
import {
  putWithAuth
} from "../../chunk-UEYGZNEP.js";
import "../../chunk-CRASKSJL.js";

// src/inventory/orders/getOrder.ts
async function getOrder(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
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

// src/inventory/orders/postOrder.ts
async function postOrder(data) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
    return postWithAuth(Api2.postOrders, data);
  }
  const res = await fetch(`/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    let errorMessage = `Copy parent store failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/orders/putOrderApprove.ts
async function putOrderApprove(id, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
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
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
    return putWithAuth2(
      Api2.putOrderApproveList,
      { orderIds: ids, note: note || "" }
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
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
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
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
    return putWithAuth2(
      Api2.putOrderDisapproveList,
      { orderIds: ids, note: note || "" }
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

// src/inventory/orders/putOrderPayment.ts
async function putOrderPayment(orderId) {
  const normalizedId = typeof orderId === "string" ? orderId.trim() : String(orderId);
  if (!normalizedId) {
    throw new Error("Invalid order id");
  }
  if (typeof window === "undefined") {
    return putWithAuth(
      Api.putOrderPayment(normalizedId)
    );
  }
  const res = await fetch(`/api/orders/${normalizedId}/payment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      error.message || `Failed to update order payment: ${res.statusText}`
    );
  }
  return res.json();
}
async function putOrderPaymentStatus(orderId) {
  const normalizedId = typeof orderId === "string" ? orderId.trim() : String(orderId);
  if (!normalizedId) {
    throw new Error("Invalid order id");
  }
  if (typeof window === "undefined") {
    return putWithAuth(
      Api.putOrderPaymentStatus(normalizedId)
    );
  }
  const res = await fetch(`/api/orders/${normalizedId}/payment/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      error.message || `Failed to update order payment status: ${res.statusText}`
    );
  }
  return res.json();
}

// src/inventory/orders/getOrdersFullInfo.ts
async function getOrdersFullInfo(input) {
  const orderIds = Array.isArray(input) ? input : input.orderIds ?? input.body ?? [];
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
    return postWithAuth(Api2.getOrderFullInfo, { orderIds });
  }
  const response = await fetch("/api/orders/full-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds })
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/putOrderChangeStatus.ts
async function putOrderChangeStatus(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
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
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
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
    const { putWithAuth: putWithAuth2 } = await import("../../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../../api-VEZZ6GU2.js");
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

// src/inventory/orders/handler/post-order.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const result = await postOrder(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    console.error("post order error:", message);
    const status = err?.status ?? 500;
    return NextResponse.json({ error: message }, { status });
  }
}

// src/inventory/orders/handler/full-info.ts
import { NextResponse as NextResponse2 } from "next/server";
async function POST2(request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const orderIds = Array.isArray(payload) ? payload : payload.orderIds ?? payload.body ?? [];
    console.log("Received body for full info:", payload);
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse2.json({ error: "orderIds array is required" }, { status: 400 });
    }
    const result = await getOrdersFullInfo(orderIds);
    return NextResponse2.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch order full info";
    console.error("Order full info error:", message);
    return NextResponse2.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/approve.ts
import { NextResponse as NextResponse3 } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!id) {
      return NextResponse3.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderApprove(id, body?.note);
    return NextResponse3.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve order";
    console.error("Order approve error:", message);
    return NextResponse3.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/disapprove.ts
import { NextResponse as NextResponse4 } from "next/server";
async function PUT2(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!id) {
      return NextResponse4.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderDisapprove(id, body?.note);
    return NextResponse4.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove order";
    console.error("Order disapprove error:", message);
    return NextResponse4.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/approve-list.ts
import { NextResponse as NextResponse5 } from "next/server";
async function PUT3(request) {
  try {
    const body = await request.json();
    const { orderIds, note } = body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse5.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }
    const result = await putOrderApproveList(orderIds, note);
    return NextResponse5.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve orders";
    console.error("Order approve list error:", message);
    return NextResponse5.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/disapprove-list.ts
import { NextResponse as NextResponse6 } from "next/server";
async function PUT4(request) {
  try {
    const body = await request.json();
    const { orderIds, note } = body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse6.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }
    const result = await putOrderDisapproveList(orderIds, note);
    return NextResponse6.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove orders";
    console.error("Order disapprove list error:", message);
    return NextResponse6.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/payment.ts
import { NextResponse as NextResponse7 } from "next/server";
async function PUT5(request, { params }) {
  try {
    const orderId = params.id;
    if (!orderId) {
      return NextResponse7.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderPayment(orderId);
    return NextResponse7.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update order payment";
    console.error("Order payment update error:", message);
    return NextResponse7.json({ error: message }, { status: 500 });
  }
}

// src/inventory/orders/handler/payment-status.ts
import { NextResponse as NextResponse8 } from "next/server";
async function PUT6(request, { params }) {
  try {
    const orderId = params.id;
    if (!orderId) {
      return NextResponse8.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderPaymentStatus(orderId);
    return NextResponse8.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update order payment status";
    console.error("Order payment status update error:", message);
    return NextResponse8.json({ error: message }, { status: 500 });
  }
}

// src/inventory/orders/handler/orders.ts
import { NextResponse as NextResponse9 } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = OrdersFilterParameters.fromURLSearchParams(searchParams);
    const orders = await getOrders({ filterParams });
    return NextResponse9.json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse9.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/order.ts
import { NextResponse as NextResponse10 } from "next/server";
async function GET2(request, { params }) {
  try {
    const { id } = await params;
    const result = await getOrder(id);
    return NextResponse10.json(result);
  } catch (error) {
    return NextResponse10.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/getAddressById.ts
import { NextResponse as NextResponse11 } from "next/server";
async function GET3(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const address = await getAddressById(id);
    return NextResponse11.json(address);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch address";
    console.error("address error:", message);
    return NextResponse11.json({ error: message }, { status: 500 });
  }
}

// src/inventory/orders/handler/change-status.ts
import { NextResponse as NextResponse12 } from "next/server";
async function PUT7(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await putOrderChangeStatus(id, body);
    return NextResponse12.json(result);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

// src/inventory/orders/handler/discount.ts
import { NextResponse as NextResponse13 } from "next/server";
async function PUT8(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderDiscount(id, body);
    return NextResponse13.json(result);
  } catch (error) {
    return NextResponse13.json(
      { error: error.message || "Failed to apply order discount" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/reference-id.ts
import { NextResponse as NextResponse14 } from "next/server";
async function PUT9(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceId(id, body);
    return NextResponse14.json(result);
  } catch (error) {
    return NextResponse14.json(
      { error: error.message || "Failed to update order reference ID" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/reference-delivery-id.ts
import { NextResponse as NextResponse15 } from "next/server";
async function PUT10(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceDeliveryId(id, body);
    return NextResponse15.json(result);
  } catch (error) {
    return NextResponse15.json(
      { error: error.message || "Failed to update order reference delivery ID" },
      { status: 500 }
    );
  }
}
export {
  DeleveryType,
  GET3 as GETAddress,
  GET2 as GETOrder,
  GET as GETOrders,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  POST as POSTOrder,
  POST2 as POSTOrderFullInfo,
  PUT as PUTOrderApprove,
  PUT3 as PUTOrderApproveList,
  PUT7 as PUTOrderChangeStatus,
  PUT2 as PUTOrderDisapprove,
  PUT4 as PUTOrderDisapproveList,
  PUT8 as PUTOrderDiscount,
  PUT5 as PUTOrderPayment,
  PUT6 as PUTOrderPaymentStatus,
  PUT10 as PUTOrderReferenceDeliveryId,
  PUT9 as PUTOrderReferenceId,
  PayType,
  Sign,
  getOrder,
  getOrders,
  getOrdersFullInfo,
  postOrder,
  putOrderApprove,
  putOrderApproveList,
  putOrderChangeStatus,
  putOrderDisapprove,
  putOrderDisapproveList,
  putOrderDiscount,
  putOrderPayment,
  putOrderPaymentStatus,
  putOrderReferenceDeliveryId,
  putOrderReferenceId
};
