import {
  getReportsCustomerOrders
} from "./chunk-O6P3VNSQ.js";
import {
  toNextResponseFromError
} from "./chunk-MKZOJXDY.js";

// src/inventory/reports/handler/getCustomerOrders.ts
async function GET(request) {
  try {
    const url = new URL(request.url);
    const q = {};
    url.searchParams.forEach((v, k) => {
      q[k] = v;
    });
    const result = await getReportsCustomerOrders(q);
    return new Response(JSON.stringify(result), { status: 200, headers: { "content-type": "application/json" } });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
