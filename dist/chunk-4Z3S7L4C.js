import {
  Api
} from "./chunk-OQSZKE7D.js";
import {
  putWithAuth
} from "./chunk-BGXESJA4.js";

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

export {
  putOrderPayment,
  putOrderPaymentStatus
};
