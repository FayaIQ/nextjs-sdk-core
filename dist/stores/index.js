import {
  toNextResponseFromError
} from "../chunk-I2UEIWLH.js";
import "../chunk-HJ7BD7D3.js";
import "../chunk-TA6JZYYA.js";

// src/stores/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-HF5W5PJ3.js");
    const { Api } = await import("../api-HF64SQC2.js");
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
