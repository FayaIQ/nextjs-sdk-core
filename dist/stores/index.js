import {
  toNextResponseFromError
} from "../chunk-PW6V7FVY.js";
import "../chunk-27NLU7D3.js";
import "../chunk-J3WCJNVW.js";

// src/stores/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AUVXNMTA.js");
    const { Api } = await import("../api-IWME5TPE.js");
    return getWithAuth(Api.getStores);
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
async function getStoreUsersPaging(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== void 0 && v !== null) {
      if (Array.isArray(v)) {
        v.forEach((x) => qs.append(k, String(x)));
      } else {
        qs.append(k, String(v));
      }
    }
  });
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AUVXNMTA.js");
    const { Api } = await import("../api-IWME5TPE.js");
    const url = Api.getStoreUsersPaging;
    return getWithAuth(`${url}?${qs.toString()}`);
  }
  const res = await fetch(`/api/stores/users/paging?${qs.toString()}`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch store users: ${res.status} ${res.statusText} ${txt}`);
  }
  return res.json();
}

// src/stores/getStoreDeliveryZones.ts
async function getStoreDeliveryZones(storeId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AUVXNMTA.js");
    const { Api } = await import("../api-IWME5TPE.js");
    return getWithAuth(Api.getStoreDeliveryZones(storeId));
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
    const searchParams = request.nextUrl.searchParams;
    const params = {};
    for (const [k, v] of searchParams.entries()) {
      if (k === "CurrentPage" || k === "PageSize") {
        params[k] = parseInt(v, 10);
      } else if (k === "EmailConfirmed" || k === "PhoneNumberConfirmed") {
        params[k] = v === "true";
      } else if (k === "Roles") {
        params[k] = searchParams.getAll(k);
      } else {
        params[k] = v;
      }
    }
    const result = await getStoreUsersPaging(params);
    return NextResponse2.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/stores/getStoreById.ts
async function getStoreById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AUVXNMTA.js");
    const { Api } = await import("../api-IWME5TPE.js");
    return getWithAuth(Api.getStoreById(id));
  }
  const res = await fetch(`/api/stores/${id}`);
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      errorMessage = body.error || body.message || errorMessage;
    } catch (e) {
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/stores/handler/getStoreById.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request, { params }) {
  try {
    const { storeId } = await params;
    const result = await getStoreById(storeId);
    return NextResponse3.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/stores/getBranches.ts
async function getBranches() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AUVXNMTA.js");
    const { Api } = await import("../api-IWME5TPE.js");
    return getWithAuth(Api.getBranches);
  }
  const res = await fetch(`/api/stores/branches`);
  if (!res.ok) {
    let err = `Failed to fetch branches: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      err = body.error || body.message || err;
    } catch (e) {
    }
    throw new Error(err);
  }
  return res.json();
}

// src/stores/handler/getBranches.ts
import { NextResponse as NextResponse4 } from "next/server";
async function GET4(request) {
  try {
    const data = await getBranches();
    return NextResponse4.json(data);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  GET4 as GETBranches,
  GET2 as GETStoreUsersPaging,
  GET as GETStores,
  GET3 as GetStoreByIdGET,
  getBranches,
  getStoreById,
  getStoreDeliveryZones,
  getStoreUsersPaging,
  getStores
};
