import {
  putCollectionsDeactivateByFilter
} from "./chunk-D674GUAM.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

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
