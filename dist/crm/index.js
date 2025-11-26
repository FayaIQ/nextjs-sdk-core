import {
  toNextResponseFromError
} from "../chunk-2MRUSURF.js";
import "../chunk-UEYGZNEP.js";
import "../chunk-CRASKSJL.js";

// src/crm/clients/getClientsPaging.ts
async function getClientsPaging(query) {
  const qs = query ? `?${new URLSearchParams(query).toString()}` : "";
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-CX4XI7JJ.js");
    const { Api } = await import("../api-VEZZ6GU2.js");
    return getWithAuth(`${Api.getClientsPaging}${qs}`);
  }
  const res = await fetch(`/api/crm/clients/paging${qs}`);
  if (!res.ok) throw new Error(`Failed to fetch clients paging: ${res.statusText}`);
  return res.json();
}

// src/crm/clients/getClients.ts
function toQueryString(filter) {
  if (!filter) return "";
  if (typeof filter === "string") return filter.startsWith("?") ? filter : `?${filter}`;
  if (filter instanceof URLSearchParams) return `?${filter.toString()}`;
  if (typeof filter.toURLSearchParams === "function") {
    return `?${filter.toURLSearchParams().toString()}`;
  }
  const usp = new URLSearchParams();
  Object.entries(filter).forEach(([k, v]) => {
    if (v === void 0 || v === null) return;
    if (Array.isArray(v)) v.forEach((item) => usp.append(k, String(item)));
    else usp.append(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}
async function getClients({ filterParams } = {}) {
  const qs = toQueryString(filterParams);
  console.log("getClients query string:", qs);
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-CX4XI7JJ.js");
    const { Api } = await import("../api-VEZZ6GU2.js");
    return getWithAuth(`${Api.getClients}${qs}`);
  }
  const res = await fetch(`/api/crm/clients${qs}`);
  if (!res.ok) {
    let msg = `Failed to fetch clients: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      msg = body?.error || body?.message || msg;
    } catch (_) {
    }
    throw new Error(msg);
  }
  return res.json();
}

// src/crm/clients/postClient.ts
async function postClient(data) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../fetcher-CX4XI7JJ.js");
    const { Api } = await import("../api-VEZZ6GU2.js");
    return postWithAuth(Api.postClients, data);
  }
  const res = await fetch(`/api/crm/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    let errorMessage = `Copy parent store failed: ${res.status} ${res.statusText}`;
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

// src/crm/clients/handler/getClients.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const url = new URL(request.url);
    const clients = await getClients({ filterParams: url.searchParams });
    return NextResponse.json(clients);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/crm/clients/handler/getClientsPaging.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request) {
  try {
    const params = request.nextUrl.searchParams;
    const obj = {};
    console.log("GET clients paging request url:", request.url);
    params.forEach((v, k) => obj[k] = v);
    console.log("GET clients paging params:", obj);
    const result = await getClientsPaging(obj);
    console.log("GET clients paging result:", result);
    return NextResponse2.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/crm/clients/handler/postClient.ts
import { NextResponse as NextResponse3 } from "next/server";
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const client = await postClient(body);
    return NextResponse3.json(client, { status: 201 });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  GET as GETClients,
  GET2 as GETClientsPaging,
  POST as POSTClient,
  getClients,
  getClientsPaging,
  postClient
};
