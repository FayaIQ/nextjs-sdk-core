import {
  toNextResponseFromError
} from "../chunk-KB2TWTWF.js";
import "../chunk-GSRLK2ER.js";
import "../chunk-STGFLJUY.js";

// src/crm/clients/getClientsPaging.ts
async function getClientsPaging(query) {
  const qs = query ? `?${new URLSearchParams(query).toString()}` : "";
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-VDHJ2PDP.js");
    const { Api } = await import("../api-L2SUK2GT.js");
    return getWithAuth(`${Api.getClientsPaging}${qs}`);
  }
  const res = await fetch(`/api/crm/clients/paging${qs}`);
  if (!res.ok) throw new Error(`Failed to fetch clients paging: ${res.statusText}`);
  return res.json();
}

// src/crm/clients/getClients.ts
async function getClients() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-VDHJ2PDP.js");
    const { Api } = await import("../api-L2SUK2GT.js");
    return getWithAuth(Api.getClients);
  }
  const res = await fetch(`/api/crm/clients`);
  if (!res.ok) throw new Error(`Failed to fetch clients: ${res.statusText}`);
  return res.json();
}

// src/crm/clients/postClient.ts
async function postClient(data) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../fetcher-VDHJ2PDP.js");
    const { Api } = await import("../api-L2SUK2GT.js");
    return postWithAuth(Api.postClients, data);
  }
  const res = await fetch(`/api/crm/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Create client failed: ${err.error || res.statusText}`);
  }
  return res.json();
}

// src/crm/clients/handler/getClients.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const clients = await getClients();
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
    params.forEach((v, k) => obj[k] = v);
    const result = await getClientsPaging(obj);
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
