import {
  putCollectionsActivateByFilter
} from "./chunk-O7BJD6NL.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

// src/inventory/items/handler/putCollectionsActivateByFilter.ts
import { NextResponse } from "next/server";
async function PUT(request) {
  try {
    const payload = await request.json();
    const result = await putCollectionsActivateByFilter(payload);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
