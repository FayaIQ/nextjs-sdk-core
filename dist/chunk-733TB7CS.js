import {
  putOrderChangeStatus
} from "./chunk-XU4HI6JX.js";
import {
  toNextResponseFromError
} from "./chunk-PKBQJMK6.js";

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
