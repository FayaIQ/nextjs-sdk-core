// src/inventory/category/getCategory.ts
async function getCatigories() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(`${Api.getCatigories}`, {});
  } else {
    return fetch(`/api/categories`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

// src/inventory/category/handler/categories.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const categories = await getCatigories();
    return NextResponse.json(categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
export {
  GET as CategoriesGET,
  getCatigories
};
