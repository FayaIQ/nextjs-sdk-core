import { NextRequest } from "next/server";
import { getReportsOrderSales } from "../getOrderSales";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const q: Record<string, any> = {};
    // Known numeric params
    const intParams = new Set([
      "DateFormatType",
      "UnitLevel",               
      "OrderStatus",
      "MenuId",
      "BrandId",
      "StartDate",
      "EndDate",
    ]);
    // Known boolean flags
    const boolParams = new Set([
      "GetItemId",
      "GetBarcode",
      "GetCode",
      "GetParentMenu",
      "GetChildMenu",
      "GetBrand",
      "GetPoint",
    ]);

    url.searchParams.forEach((v, k) => {
      if (v === null || v === undefined || v === "") return;
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
      // Dates and IDs: keep as string (ISO) so the client helper will forward them properly
      q[k] = v;
    });
    const result = await getReportsOrderSales(q);
    return new Response(JSON.stringify(result), { status: 200, headers: { "content-type": "application/json" } });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
