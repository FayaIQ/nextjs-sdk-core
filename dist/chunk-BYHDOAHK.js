import {
  Api
} from "./chunk-4D7LFOTQ.js";
import {
  putWithAuth
} from "./chunk-67SISKBJ.js";

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

export {
  putOrderDiscount
};
