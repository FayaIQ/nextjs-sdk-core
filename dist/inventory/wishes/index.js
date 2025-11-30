import {
  Api
} from "../../chunk-QDOAHZH6.js";
import {
  toNextResponseFromError
} from "../../chunk-MQK4KZWN.js";
import {
  getWithAuth
} from "../../chunk-TTOGW4EE.js";
import "../../chunk-XPPYGZO6.js";
import "../../chunk-MLKGABMK.js";

// src/inventory/wishes/getWishes.ts
async function getWishes(params) {
  if (typeof window === "undefined") {
    const queryParams2 = new URLSearchParams();
    if (params?.currentPage) {
      queryParams2.set("currentPage", params.currentPage.toString());
    }
    if (params?.pageSize) {
      queryParams2.set("pageSize", params.pageSize.toString());
    }
    const queryString2 = queryParams2.toString();
    const url2 = queryString2 ? `${Api.getWishes}?${queryString2}` : Api.getWishes;
    return getWithAuth(url2);
  }
  const queryParams = new URLSearchParams();
  if (params?.currentPage) {
    queryParams.set("currentPage", params.currentPage.toString());
  }
  if (params?.pageSize) {
    queryParams.set("pageSize", params.pageSize.toString());
  }
  const queryString = queryParams.toString();
  const url = queryString ? `/api/wishes?${queryString}` : `/api/wishes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch wishes: ${res.statusText}`);
  return res.json();
}

// src/inventory/wishes/handler/getWishes.ts
async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      currentPage: searchParams.get("currentPage") ? parseInt(searchParams.get("currentPage")) : void 0,
      pageSize: searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : void 0
    };
    const result = await getWishes(params);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  GET as GetWishesGET,
  getWishes
};
