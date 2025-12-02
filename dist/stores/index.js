import {
  toNextResponseFromError
} from "../chunk-5526RT3R.js";
import "../chunk-FXVF23HR.js";
import "../chunk-MGHQYVNO.js";
import "../chunk-3RG5ZIWI.js";

// src/stores/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-KMVB5KUG.js");
    const { Api } = await import("../api-RO5SLBPK.js");
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
