import {
  putActivateItem
} from "./chunk-67IZRVY6.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

// src/inventory/items/handler/putActivate.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const result = await putActivateItem(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
