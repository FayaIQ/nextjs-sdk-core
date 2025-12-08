import {
  postCopyParentStore
} from "./chunk-PTGRK76P.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
