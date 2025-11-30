import {
  toNextResponseFromError
} from "../../chunk-MQK4KZWN.js";
import "../../chunk-TTOGW4EE.js";
import "../../chunk-XPPYGZO6.js";
import "../../chunk-MLKGABMK.js";

// src/inventory/reports/getCustomerOrders.ts
async function getReportsCustomerOrders(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-LNRTGLFX.js");
    const { Api } = await import("../../api-M7CLY2YV.js");
    return getWithAuth(Api.getReportsCustomerOrders, query);
  }
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== void 0 && v !== null) params.append(k, String(v));
    });
  }
  const res = await fetch(`/api/reports/customer-orders?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch customer orders report: ${res.statusText}`);
  return res.json();
}

// src/inventory/reports/getOrderSales.ts
async function getReportsOrderSales(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-LNRTGLFX.js");
    const { Api } = await import("../../api-M7CLY2YV.js");
    return getWithAuth(Api.getReportsOrderSales, query);
  }
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== void 0 && v !== null) params.append(k, String(v));
    });
  }
  const res = await fetch(`/api/reports/order-sales?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch order sales report: ${res.statusText}`);
  return res.json();
}

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

// src/inventory/reports/handler/getOrderSales.ts
async function GET2(request) {
  try {
    const url = new URL(request.url);
    const q = {};
    const intParams = /* @__PURE__ */ new Set([
      "DateFormatType",
      "UnitLevel",
      "OrderStatus",
      "MenuId",
      "BrandId",
      "StartDate",
      "EndDate"
    ]);
    const boolParams = /* @__PURE__ */ new Set([
      "GetItemId",
      "GetBarcode",
      "GetCode",
      "GetParentMenu",
      "GetChildMenu",
      "GetBrand",
      "GetPoint"
    ]);
    url.searchParams.forEach((v, k) => {
      if (v === null || v === void 0 || v === "") return;
      if (intParams.has(k)) {
        const n = Number(v);
        q[k] = Number.isNaN(n) ? v : Math.trunc(n);
        return;
      }
      if (boolParams.has(k)) {
        const lower = v.toLowerCase();
        q[k] = lower === "true" || lower === "1";
        return;
      }
      q[k] = v;
    });
    const result = await getReportsOrderSales(q);
    return new Response(JSON.stringify(result), { status: 200, headers: { "content-type": "application/json" } });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  GET as GetReportsCustomerOrdersGET,
  GET2 as GetReportsOrderSalesGET,
  getReportsCustomerOrders,
  getReportsOrderSales
};
