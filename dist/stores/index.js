import {
  Api
} from "../chunk-4623AWPJ.js";
import {
  toNextResponseFromError
} from "../chunk-CO3V3FSC.js";
import {
  getWithAuth
} from "../chunk-Z7VQQBWD.js";
import "../chunk-MLSOWJ72.js";

// src/stores/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await import("../fetcher-M63KOPG2.js");
    const { Api: Api2 } = await import("../api-YF4GAK4X.js");
    return getWithAuth2(Api2.getStores);
  }
  const res = await fetch(`/api/stores`);
  if (!res.ok) throw new Error(`Failed to fetch stores: ${res.statusText}`);
  return res.json();
}

// src/stores/handler/getStores.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const stores = await getStores();
    return NextResponse.json(stores);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/stores/getStoreUsersPaging.ts
async function getStoreUsersPaging(params) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await import("../fetcher-M63KOPG2.js");
    const { Api: Api2 } = await import("../api-YF4GAK4X.js");
    const qs2 = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    const url = qs2 ? `${Api2.getStoreUsersPaging}?${qs2}` : Api2.getStoreUsersPaging;
    return getWithAuth2(url);
  }
  const qs = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
  const res = await fetch(`/api/store-users/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch store users: ${res.statusText}`);
  return res.json();
}

// src/stores/getStoreDeliveryZones.ts
async function getStoreDeliveryZones(storeId) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await import("../fetcher-M63KOPG2.js");
    const { Api: Api2 } = await import("../api-YF4GAK4X.js");
    return getWithAuth2(Api2.getStoreDeliveryZones(storeId));
  }
  const res = await fetch(`/api/stores/${storeId}/delivery-zones`);
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
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

// src/stores/handler/getStoreUsersPaging.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });
    const queryString = params.toString();
    const url = queryString ? `${Api.getStoreUsersPaging}?${queryString}` : Api.getStoreUsersPaging;
    const data = await getWithAuth(url);
    return NextResponse2.json(data);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  GET2 as GETStoreUsersPaging,
  GET as GETStores,
  getStoreDeliveryZones,
  getStoreUsersPaging,
  getStores
};
