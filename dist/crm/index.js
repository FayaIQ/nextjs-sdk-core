import {
  toNextResponseFromError
} from "../chunk-I2UEIWLH.js";
import "../chunk-HJ7BD7D3.js";
import "../chunk-TA6JZYYA.js";

// src/crm/clients/getClientsPaging.ts
async function getClientsPaging(query) {
  const qs = query ? `?${new URLSearchParams(query).toString()}` : "";
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-HF5W5PJ3.js");
    const { Api } = await import("../api-HF64SQC2.js");
    return getWithAuth(`${Api.getClientsPaging}${qs}`);
  }
  const res = await fetch(`/api/crm/clients/paging${qs}`);
  if (!res.ok) throw new Error(`Failed to fetch clients paging: ${res.statusText}`);
  return res.json();
}

// src/crm/clients/getClients.ts
function buildQuery(params) {
  if (!params) return "";
  if (typeof params === "string") return params.startsWith("?") ? params : `?${params}`;
  if (params instanceof URLSearchParams) return `?${params.toString()}`;
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === void 0 || v === null) return;
    if (Array.isArray(v)) {
      v.forEach((item) => usp.append(k, String(item)));
    } else {
      usp.append(k, String(v));
    }
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}
async function getClients(params) {
  const qs = buildQuery(params);
  console.log("QS:", qs);
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-HF5W5PJ3.js");
    const { Api } = await import("../api-HF64SQC2.js");
    const url = Api.getClients + (qs || "");
    console.log("URL:", url);
    return getWithAuth(url);
  }
  const res = await fetch(`/api/crm/clients${qs}`);
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

// src/crm/clients/postClient.ts
async function postClient(data) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../fetcher-HF5W5PJ3.js");
    const { Api } = await import("../api-HF64SQC2.js");
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
    const qs = url.search ? url.search : "";
    const clients = await getClients(qs);
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
