import {
  getMenus
} from "../../chunk-TS2IRZGK.js";
import {
  ItemsFilterParameters
} from "../../chunk-T4IEAKR3.js";

// src/inventory/menus/handler/getMenus.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const menus = await getMenus({ filterParams });
    return NextResponse.json(menus);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/inventory/menus/getMenusDropdown.ts
async function getMenusDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-L2SUK2GT.js");
    return getWithAuth(`${Api.getMenusDropdown}`, {});
  } else {
    return fetch(`/api/menus/dropdown`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

// src/inventory/menus/handler/getMenusDropdown.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request) {
  try {
    const menus = await getMenusDropdown();
    return NextResponse2.json(menus);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse2.json({ error: message }, { status: 500 });
  }
}

// src/inventory/menus/getMenuById.ts
async function getMenuById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-VDHJ2PDP.js");
    const { Api } = await import("../../api-L2SUK2GT.js");
    return getWithAuth(Api.getMenuById(id));
  }
  const res = await fetch(`/api/menus/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch menu ${id}: ${res.statusText}`);
  return res.json();
}

// src/inventory/menus/handler/getMenuById.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request, { params }) {
  try {
    const resolvedParams = await params;
    const result = await getMenuById(resolvedParams.id);
    return NextResponse3.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch menu";
    console.error("getMenuById error:", message);
    return NextResponse3.json({ error: message }, { status: 500 });
  }
}
export {
  GET3 as GetMenuByIdGET,
  GET2 as GetMenusDropdownGET,
  GET as GetMenusGET,
  getMenuById,
  getMenus,
  getMenusDropdown
};
