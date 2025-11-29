import {
  putOrderChangeStatus
} from "./chunk-4G2G56Y3.js";
import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";

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
