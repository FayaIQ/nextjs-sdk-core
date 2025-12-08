import {
  putCollectionsDeactivateByFilter
} from "./chunk-7UBXYIZN.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

// src/inventory/items/handler/putCollectionsDeactivateByFilter.ts
import { NextResponse } from "next/server";
async function PUT(request) {
  try {
    const payload = await request.json();
    const result = await putCollectionsDeactivateByFilter(payload);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
