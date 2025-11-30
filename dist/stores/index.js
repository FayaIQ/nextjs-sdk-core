import {
  toNextResponseFromError
} from "../chunk-GIKQHBMH.js";
import "../chunk-JN33UK4M.js";
import "../chunk-U773LIZ4.js";
import "../chunk-MLKGABMK.js";

// src/stores/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-HFWCTJH5.js");
    const { Api } = await import("../api-JFMDIACR.js");
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
export {
  GET as GETStores,
  getStores
};
