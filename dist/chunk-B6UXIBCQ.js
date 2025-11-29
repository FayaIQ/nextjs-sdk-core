import {
  getReportsOrderSales
} from "./chunk-EI4MG4UE.js";
import {
  toNextResponseFromError
} from "./chunk-O4TRWZWB.js";

// src/inventory/reports/handler/getOrderSales.ts
async function GET(request) {
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
  GET
};
