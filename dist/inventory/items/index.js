import {
  getProductInfo,
  getProducts
} from "../../chunk-U4NGO4DQ.js";
import {
  AgeGroup,
  Gender,
  ItemsFilterParameters,
  NewArrivalPeriod,
  PagingParameters,
  SortType
} from "../../chunk-QPGSHSJO.js";
import {
  Api
} from "../../chunk-CKBJVO52.js";
import {
  getWithAuth
} from "../../chunk-G3RE74RT.js";
import "../../chunk-7HFB7GTE.js";

// src/inventory/items/getParentProducts.ts
async function getParentProducts({
  filterParams
}) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await import("../../core/index.js");
    const { Api: Api2 } = await import("../../api-ALZDPWU7.js");
    const params = filterParams.toURLSearchParams();
    return getWithAuth2(`${Api2.getParentProducts}?${params.toString()}`, {});
  } else {
    return fetch(`/api/items/parent?${filterParams.toURLSearchParams().toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

// src/inventory/items/getItemsPaging.ts
async function getItemsPaging(filters) {
  const params = new URLSearchParams();
  if (filters) {
    const filterParams = filters.toURLSearchParams();
    filterParams.forEach((value, key) => {
      params.set(key, value);
    });
  }
  params.set("GetMultipleMenu", "true");
  const queryString = params.toString();
  const url = queryString ? `${Api.getItemsPaging}?${queryString}` : Api.getItemsPaging;
  if (typeof window !== "undefined") {
    const localUrl = queryString ? `/api/items/paging?${queryString}` : `/api/items/paging`;
    const response = await fetch(localUrl);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch items paging: ${response.status} ${errorText}`
      );
    }
    return response.json();
  }
  return getWithAuth(url);
}

// src/inventory/items/getItemById.ts
async function getItemById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await import("../../fetcher-53SEI2RB.js");
    const { Api: Api2 } = await import("../../api-ALZDPWU7.js");
    return getWithAuth2(Api2.getItemById(id));
  }
  const response = await fetch(`/api/items/${id}/info`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/items/handler/getProducts.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/inventory/items/handler/productInfo.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request, { params }) {
  try {
    const { id } = await params;
    const product = await getProductInfo(id);
    return NextResponse2.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch product info";
    console.error("Product info error:", message);
    return NextResponse2.json({ error: message }, { status: 500 });
  }
}

// src/inventory/items/handler/getParentProducts.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getParentProducts({ filterParams });
    return NextResponse3.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse3.json({ error: message }, { status: 500 });
  }
}

// src/inventory/items/handler/getItemsPaging.ts
import { NextResponse as NextResponse4 } from "next/server";
async function GET4(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });
    params.set("GetMultipleMenu", "true");
    const queryString = params.toString();
    const url = queryString ? `${Api.getItemsPaging}?${queryString}` : `${Api.getItemsPaging}?GetMultipleMenu=true`;
    const data = await getWithAuth(url);
    return NextResponse4.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching items paging:", error);
    return NextResponse4.json(
      {
        error: "Failed to fetch items paging",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// src/inventory/items/handler/getItemById.ts
import { NextResponse as NextResponse5 } from "next/server";
async function GET5(request, { params }) {
  try {
    const { id } = await params;
    const result = await getItemById(id);
    return NextResponse5.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch item";
    console.error("getItemById error:", message);
    return NextResponse5.json({ error: message }, { status: 500 });
  }
}

// src/inventory/items/postCopyParentStore.ts
async function postCopyParentStore(itemIds) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api: Api2 } = await import("../../api-ALZDPWU7.js");
    return postWithAuth(Api2.postCopyParentStore, { itemIds });
  }
  const res = await fetch(`/api/items/copy-parent-store`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemIds })
  });
  console.log("postCopyParentStore response status:", res.status);
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

// src/inventory/items/handler/postCopyParentStore.ts
import { NextResponse as NextResponse6 } from "next/server";
async function POST(request) {
  try {
    const { itemIds } = await request.json();
    if (!itemIds) {
      return NextResponse6.json({ error: "itemIds array is required" }, { status: 400 });
    }
    const result = await postCopyParentStore(itemIds);
    return NextResponse6.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to copy parent items";
    console.error("postCopyParentStore error:", message);
    return NextResponse6.json({ error: message }, { status: 500 });
  }
}

// src/inventory/items/putActivate.ts
async function putActivateItem(id) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api: Api2 } = await import("../../api-ALZDPWU7.js");
    return putWithAuth(Api2.putItemActivate(id));
  }
  const res = await fetch(`/api/items/${id}/activate`, { method: "PUT" });
  if (!res.ok) throw new Error(`Activate item failed: ${res.statusText}`);
  return res.json();
}

// src/inventory/items/putDeactivate.ts
async function putDeactivateItem(id) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api: Api2 } = await import("../../api-ALZDPWU7.js");
    return putWithAuth(Api2.putItemDeactivate(id));
  }
  const res = await fetch(`/api/items/${id}/deactivate`, { method: "PUT" });
  if (!res.ok) throw new Error(`Deactivate item failed: ${res.statusText}`);
  return res.json();
}

// src/inventory/items/putItem.ts
async function putItem(id, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api: Api2 } = await import("../../api-ALZDPWU7.js");
    console.log("putItem data:", data);
    return putWithAuth(Api2.putItem(id), data);
  }
  const res = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Update item failed: ${errorData.error || res.statusText}`);
  }
  return res.json();
}

// src/inventory/items/handler/putActivate.ts
import { NextResponse as NextResponse7 } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const result = await putActivateItem(id);
    return NextResponse7.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to activate item";
    console.error("putActivate handler error:", message);
    return NextResponse7.json({ error: message }, { status: 500 });
  }
}

// src/inventory/items/handler/putDeactivate.ts
import { NextResponse as NextResponse8 } from "next/server";
async function PUT2(request, { params }) {
  try {
    const { id } = await params;
    const result = await putDeactivateItem(id);
    return NextResponse8.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to deactivate item";
    console.error("putDeactivate handler error:", message);
    return NextResponse8.json({ error: message }, { status: 500 });
  }
}

// src/inventory/items/handler/putItem.ts
import { NextResponse as NextResponse9 } from "next/server";
async function PUT3(request, { params }) {
  try {
    const data = await request.json();
    const { id } = await params;
    const result = await putItem(id, data);
    return NextResponse9.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update item";
    console.error("putItem error:", message);
    return NextResponse9.json({ error: message }, { status: 500 });
  }
}
export {
  AgeGroup,
  POST as CopyParentStorePOST,
  Gender,
  GET5 as GetItemByIdGET,
  GET4 as GetItemsPagingGET,
  GET3 as GetParentProductsGET,
  GET as GetProductsGET,
  ItemsFilterParameters,
  NewArrivalPeriod,
  PagingParameters,
  GET2 as ProductInfoGET,
  PUT as PutItemActivatePUT,
  PUT2 as PutItemDeactivatePUT,
  PUT3 as PutItemPUT,
  SortType,
  getItemById,
  getItemsPaging,
  getParentProducts,
  getProductInfo,
  getProducts,
  postCopyParentStore,
  putActivateItem,
  putDeactivateItem,
  putItem
};
