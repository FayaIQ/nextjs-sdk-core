import {
  toNextResponseFromError
} from "../chunk-MQK4KZWN.js";
import "../chunk-TTOGW4EE.js";
import "../chunk-XPPYGZO6.js";
import "../chunk-MLKGABMK.js";

// src/stores/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-LNRTGLFX.js");
    const { Api } = await import("../api-M7CLY2YV.js");
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
