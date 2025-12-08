import {
  Api
} from "../../chunk-4623AWPJ.js";
import {
  toNextResponseFromError
} from "../../chunk-CO3V3FSC.js";
import {
  deleteWithAuth,
  getWithAuth,
  postWithAuth
} from "../../chunk-Z7VQQBWD.js";
import "../../chunk-MLSOWJ72.js";

// src/inventory/wishes/getWishes.ts
async function getWishes(params) {
  if (typeof window === "undefined") {
    const queryParams2 = new URLSearchParams();
    if (params?.currentPage) {
      queryParams2.set("currentPage", params.currentPage.toString());
    }
    if (params?.pageSize) {
      queryParams2.set("pageSize", params.pageSize.toString());
    }
    const queryString2 = queryParams2.toString();
    const url2 = queryString2 ? `${Api.getWishes}?${queryString2}` : Api.getWishes;
    return getWithAuth(url2);
  }
  const queryParams = new URLSearchParams();
  if (params?.currentPage) {
    queryParams.set("currentPage", params.currentPage.toString());
  }
  if (params?.pageSize) {
    queryParams.set("pageSize", params.pageSize.toString());
  }
  const queryString = queryParams.toString();
  const url = queryString ? `/api/wishes?${queryString}` : `/api/wishes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch wishes: ${res.statusText}`);
  return res.json();
}

// src/inventory/wishes/postWish.ts
async function postWish(itemId) {
  if (typeof window === "undefined") {
    const url = Api.postWish(itemId);
    return postWithAuth(url, {});
  }
  const res = await fetch(`/api/wishes/${itemId}`, {
    method: "POST"
  });
  if (!res.ok) {
    throw new Error(`Failed to add wish: ${res.statusText}`);
  }
  return;
}

// src/inventory/wishes/deleteWish.ts
async function deleteWish(itemId) {
  if (typeof window === "undefined") {
    const url = Api.deleteWish(itemId);
    return deleteWithAuth(url);
  }
  const res = await fetch(`/api/wishes/${itemId}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    throw new Error(`Failed to remove wish: ${res.statusText}`);
  }
  return;
}

// src/inventory/wishes/handler/getWishes.ts
async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      currentPage: searchParams.get("currentPage") ? parseInt(searchParams.get("currentPage")) : void 0,
      pageSize: searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : void 0
    };
    const result = await getWishes(params);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/wishes/handler/postWish.ts
import { NextResponse } from "next/server";
async function POST(request, context) {
  try {
    const { itemId } = await context.params;
    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }
    await postWish(itemId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

// src/inventory/wishes/handler/deleteWish.ts
import { NextResponse as NextResponse2 } from "next/server";
async function DELETE(request, context) {
  try {
    const { itemId } = await context.params;
    if (!itemId) {
      return NextResponse2.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }
    await deleteWish(itemId);
    return NextResponse2.json({ success: true }, { status: 200 });
  } catch (error) {
    return toNextResponseFromError(error);
  }
}
export {
  DELETE as DeleteWishDELETE,
  GET as GetWishesGET,
  POST as PostWishPOST,
  deleteWish,
  getWishes,
  postWish
};
