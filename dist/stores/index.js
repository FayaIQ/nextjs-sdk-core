import {
  toNextResponseFromError
} from "../chunk-4DPJZ6ZU.js";
import "../chunk-ISX4EOFW.js";
import "../chunk-35YYLZPN.js";

// src/stores/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-442K4FV3.js");
    const { Api } = await import("../api-QG2WVXL6.js");
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
