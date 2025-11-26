import {
  putDeactivateItem
} from "./chunk-GT3ZTTVQ.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

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
