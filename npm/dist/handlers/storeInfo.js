"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handlers/storeInfo.ts
var storeInfo_exports = {};
__export(storeInfo_exports, {
  GET: () => GET
});
module.exports = __toCommonJS(storeInfo_exports);
var import_server = require("next/server");

// src/fetcher.ts
async function apiFetch(url, options = {}) {
  const { method = "GET", headers = {}, data, query, token } = options;
  let endpoint = url;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== void 0 && v !== null) params.append(k, String(v));
    });
    endpoint += `?${params.toString()}`;
  }
  const allHeaders = { ...headers };
  allHeaders["Authorization"] = `Bearer ${token}`;
  if (data && !(data instanceof FormData))
    allHeaders["Content-Type"] = "application/json";
  const res = await fetch(endpoint, {
    method,
    headers: allHeaders,
    body: data && !(data instanceof FormData) ? JSON.stringify(data) : data
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

// src/token.ts
async function getToken() {
  const response = await fetch(
    `https://storeak-identity-service.azurewebsites.net/api/v1/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: "610262c3-b8ff-40b5-8a8e-951eadbe7a31",
        clientSecret: "UxiTJPZguIXBxVLjxGltrHvOdEqsjndG",
        username: "athathak",
        password: "123456",
        Language: 0,
        GMT: 3,
        IsFromNotification: false
      })
    }
  );
  if (!response.ok) {
    throw new Error(`getToken failed: ${response.statusText}`);
  }
  const json = await response.json();
  if (!json.access_token) throw new Error("Token missing in response");
  return json.access_token;
}

// src/storeInfo.ts
var BASE_URL = "https://storeak-stores-service.azurewebsites.net/api/v1/Stores";
async function getStoreInfo() {
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch(`${BASE_URL}/Info`, { token });
  } else {
    return fetch("/api/storeInfo").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch store info");
      return res.json();
    });
  }
}

// src/handlers/storeInfo.ts
async function GET() {
  try {
    const storeInfo = await getStoreInfo();
    return import_server.NextResponse.json(storeInfo);
  } catch (error) {
    console.error("Failed to fetch store info:", error);
    return import_server.NextResponse.json(
      { error: "Failed to fetch store info" },
      { status: 500 }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET
});
