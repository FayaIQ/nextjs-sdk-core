import {
  putDeactivateItem
} from "./chunk-WJTIICQC.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

// src/inventory/items/handler/putDeactivate.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const result = await putDeactivateItem(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
