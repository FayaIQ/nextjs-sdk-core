// src/inventory/itemSource/handler/getItemSource.ts
import { NextResponse } from "next/server";

// src/inventory/itemSource/getItemsSource.ts
async function getItemsSource() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return getWithAuth(`${Api.getItemsSource}`, {});
  } else {
    return fetch(`/api/itemSource`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

// src/inventory/itemSource/handler/getItemSource.ts
async function GET(request) {
  try {
    const itemsSource = await getItemsSource();
    return NextResponse.json(itemsSource);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
export {
  GET as ItemSourcesGET,
  getItemsSource
};
