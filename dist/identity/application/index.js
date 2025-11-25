import {
  getStoreInfo
} from "../../chunk-ECPRTXQT.js";

// src/identity/application/handler/getStores.ts
import { NextResponse } from "next/server";

// src/identity/application/getStores.ts
async function getStores() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-RHFGMX5X.js");
    return getWithAuth(Api.getApplicationsStores);
  }
  const response = await fetch(`/api/stores`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stores: ${response.statusText}`);
  }
  return response.json();
}

// src/identity/application/handler/getStores.ts
async function GET(request) {
  try {
    const stores = await getStores();
    return NextResponse.json(stores);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch stores";
    console.error("stores error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/identity/application/handler/getStoreInfo.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2() {
  try {
    const storeInfo = await getStoreInfo();
    return NextResponse2.json(storeInfo);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch store info";
    console.error("Store info error:", message);
    return NextResponse2.json(
      { error: message },
      { status: 500 }
    );
  }
}
export {
  GET2 as GETStoreInfo,
  GET as GETStores,
  getStoreInfo,
  getStores
};
