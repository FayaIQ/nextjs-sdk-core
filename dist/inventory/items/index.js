import {
  getProductInfo,
  getProducts
} from "../../chunk-DJE7LLSL.js";
import {
  AgeGroup,
  Gender,
  ItemsFilterParameters,
  NewArrivalPeriod,
  PagingParameters,
  SortType
} from "../../chunk-T4IEAKR3.js";
import {
  toNextResponseFromError
} from "../../chunk-6Q4MVTH3.js";
import {
  Api
} from "../../chunk-X3SN5N6X.js";
import {
  getWithAuth
} from "../../chunk-65OOENEZ.js";
import "../../chunk-O4AXB2WX.js";

// src/inventory/items/getProductInfoV2.ts
async function getProductInfoV2(id) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await import("../../fetcher-W2IDYART.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
    return getWithAuth2(`${Api2.getProductInfoV2(id)}`);
  }
  const response = await fetch(`/api/products/v2/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product info v2: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/items/getParentProducts.ts
async function getParentProducts({
  filterParams
}) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await import("../../core/index.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
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
    const { getWithAuth: getWithAuth2 } = await import("../../fetcher-W2IDYART.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
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
    return toNextResponseFromError(error);
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
    return toNextResponseFromError(error);
  }
}

// src/inventory/items/handler/productInfoV2.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request, { params }) {
  try {
    const { id } = await params;
    const product = await getProductInfoV2(id);
    return NextResponse3.json(product);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

// src/inventory/items/handler/getParentProducts.ts
import { NextResponse as NextResponse4 } from "next/server";
async function GET4(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getParentProducts({ filterParams });
    return NextResponse4.json(products);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

// src/inventory/items/handler/getItemsPaging.ts
import { NextResponse as NextResponse5 } from "next/server";
async function GET5(request) {
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
    return NextResponse5.json(data, { status: 200 });
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

// src/inventory/items/handler/getItemById.ts
import { NextResponse as NextResponse6 } from "next/server";
async function GET6(request, { params }) {
  try {
    const { id } = await params;
    const result = await getItemById(id);
    return NextResponse6.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/items/postCopyParentStore.ts
async function postCopyParentStore(itemIds) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-W2IDYART.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
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
import { NextResponse as NextResponse7 } from "next/server";
async function POST(request) {
  try {
    const { itemIds } = await request.json();
    if (!itemIds) {
      return NextResponse7.json({ error: "itemIds array is required" }, { status: 400 });
    }
    const result = await postCopyParentStore(itemIds);
    return NextResponse7.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/items/putActivate.ts
async function putActivateItem(id) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-W2IDYART.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
    return putWithAuth(Api2.putItemActivate(id));
  }
  const res = await fetch(`/api/items/${id}/activate`, { method: "PUT" });
  if (!res.ok) throw new Error(`Activate item failed: ${res.statusText}`);
  return res.json();
}

// src/inventory/items/putDeactivate.ts
async function putDeactivateItem(id) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-W2IDYART.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
    return putWithAuth(Api2.putItemDeactivate(id));
  }
  const res = await fetch(`/api/items/${id}/deactivate`, { method: "PUT" });
  if (!res.ok) throw new Error(`Deactivate item failed: ${res.statusText}`);
  return res.json();
}

// src/inventory/items/putItem.ts
async function putItem(id, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-W2IDYART.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
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

// src/inventory/items/deleteItem.ts
async function deleteItem(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../fetcher-W2IDYART.js");
    const { Api: Api2 } = await import("../../api-RRRXOPVN.js");
    return deleteWithAuth(Api2.deleteItem(id));
  }
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete item: ${res.statusText}`);
  return res.json();
}

// src/inventory/items/handler/putActivate.ts
import { NextResponse as NextResponse8 } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const result = await putActivateItem(id);
    return NextResponse8.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/items/handler/putDeactivate.ts
import { NextResponse as NextResponse9 } from "next/server";
async function PUT2(request, { params }) {
  try {
    const { id } = await params;
    const result = await putDeactivateItem(id);
    return NextResponse9.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/items/handler/putItem.ts
import { NextResponse as NextResponse10 } from "next/server";
async function PUT3(request, { params }) {
  try {
    const data = await request.json();
    const { id } = await params;
    const result = await putItem(id, data);
    return NextResponse10.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/items/handler/deleteItem.ts
async function DELETE(request, { params }) {
  try {
    const result = await deleteItem((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  AgeGroup,
  POST as CopyParentStorePOST,
  DELETE as DeleteItemDELETE,
  Gender,
  GET6 as GetItemByIdGET,
  GET5 as GetItemsPagingGET,
  GET4 as GetParentProductsGET,
  GET as GetProductsGET,
  ItemsFilterParameters,
  NewArrivalPeriod,
  PagingParameters,
  GET2 as ProductInfoGET,
  GET3 as ProductInfoV2GET,
  PUT as PutItemActivatePUT,
  PUT2 as PutItemDeactivatePUT,
  PUT3 as PutItemPUT,
  SortType,
  deleteItem,
  getItemById,
  getItemsPaging,
  getParentProducts,
  getProductInfo,
  getProductInfoV2,
  getProducts,
  postCopyParentStore,
  putActivateItem,
  putDeactivateItem,
  putItem
};
