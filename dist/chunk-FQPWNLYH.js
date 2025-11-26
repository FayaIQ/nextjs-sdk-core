import {
  postCopyParentStore
} from "./chunk-VS26BB5C.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

// src/inventory/items/handler/postCopyParentStore.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const { itemIds } = await request.json();
    if (!itemIds) {
      return NextResponse.json({ error: "itemIds array is required" }, { status: 400 });
    }
    const result = await postCopyParentStore(itemIds);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
