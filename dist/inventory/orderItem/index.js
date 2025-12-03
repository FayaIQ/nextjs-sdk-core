import {
  Api
} from "../../chunk-536WXACQ.js";
import {
  getWithAuth,
  postWithAuth,
  putWithAuth
} from "../../chunk-KVQU4RVP.js";
import "../../chunk-SK7VZIJK.js";

// src/inventory/orderItem/getOrderItem.ts
async function getOrderItem(id, itemId) {
  if (typeof window === "undefined") {
    return getWithAuth(Api.getOrderItem(id, itemId));
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}`);
  if (!res.ok) throw new Error(`Failed to fetch order item: ${res.statusText}`);
  return res.json();
}

// src/inventory/orderItem/postOrderItem.ts
async function postOrderItem(id, payload) {
  if (typeof window === "undefined") {
    return postWithAuth(Api.postOrderItem(id), payload);
  }
  const res = await fetch(`/api/orders/${id}/orderItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to create order item: ${res.statusText}`);
  return res.json();
}

// src/inventory/orderItem/putOrderItemCancel.ts
async function putOrderItemCancel(id, itemId) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemCancel(id, itemId));
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/cancel`, { method: "PUT" });
  if (!res.ok) throw new Error(`Failed to cancel order item: ${res.statusText}`);
  return res.json();
}

// src/inventory/orderItem/putOrderItemUndoCancel.ts
async function putOrderItemUndoCancel(id, itemId) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUndoCancel(id, itemId));
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/undo-cancel`, { method: "PUT" });
  if (!res.ok) throw new Error(`Failed to undo cancel order item: ${res.statusText}`);
  return res.json();
}

// src/inventory/orderItem/putOrderItemUpdate.ts
async function putOrderItemUpdate(id, itemId, payload) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putOrderItemUpdate(id, itemId), payload);
  }
  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to update order item: ${res.statusText}`);
  return res.json();
}

// src/inventory/orderItem/handler/getOrderItem.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { id, itemId } = await params;
    const result = await getOrderItem(id, itemId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get order item";
    console.error("getOrderItem error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/inventory/orderItem/handler/postOrderItem.ts
import { NextResponse as NextResponse2 } from "next/server";
async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const result = await postOrderItem(id, body);
    return NextResponse2.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order item";
    console.error("postOrderItem error:", message);
    return NextResponse2.json({ error: message }, { status: 500 });
  }
}

// src/inventory/orderItem/handler/putOrderItemCancel.ts
import { NextResponse as NextResponse3 } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id, itemId } = await params;
    const result = await putOrderItemCancel(id, itemId);
    return NextResponse3.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to cancel order item";
    console.error("putOrderItemCancel error:", message);
    return NextResponse3.json({ error: message }, { status: 500 });
  }
}

// src/inventory/orderItem/handler/putOrderItemUndoCancel.ts
import { NextResponse as NextResponse4 } from "next/server";
async function PUT2(request, { params }) {
  try {
    const { id, itemId } = await params;
    const result = await putOrderItemUndoCancel(id, itemId);
    return NextResponse4.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to undo cancel order item";
    console.error("putOrderItemUndoCancel error:", message);
    return NextResponse4.json({ error: message }, { status: 500 });
  }
}

// src/inventory/orderItem/handler/putOrderItemUpdate.ts
import { NextResponse as NextResponse5 } from "next/server";
async function PUT3(request, { params }) {
  try {
    const { id, itemId } = await params;
    const body = await request.json().catch(() => ({}));
    const result = await putOrderItemUpdate(id, itemId, body);
    return NextResponse5.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update order item";
    console.error("putOrderItemUpdate error:", message);
    return NextResponse5.json({ error: message }, { status: 500 });
  }
}
export {
  GET as GetOrderItemGET,
  POST as PostOrderItemPOST,
  PUT as PutOrderItemCancelPUT,
  PUT2 as PutOrderItemUndoCancelPUT,
  PUT3 as PutOrderItemUpdatePUT,
  getOrderItem,
  postOrderItem,
  putOrderItemCancel,
  putOrderItemUndoCancel,
  putOrderItemUpdate
};
