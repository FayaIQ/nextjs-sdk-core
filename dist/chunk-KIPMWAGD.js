import {
  putCollectionsActivateByFilter
} from "./chunk-2D64IZ5O.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

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
