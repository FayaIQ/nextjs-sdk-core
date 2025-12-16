import {
  putOrderChangeStatus
} from "./chunk-RJ6OYNGV.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

// src/inventory/orders/handler/change-status.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await putOrderChangeStatus(id, body);
    return NextResponse.json(result);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  PUT
};
