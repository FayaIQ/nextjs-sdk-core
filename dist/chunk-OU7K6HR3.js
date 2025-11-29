import {
  deletePayment
} from "./chunk-2QP5YORE.js";
import {
  toNextResponseFromError
} from "./chunk-PKBQJMK6.js";

// src/inventory/payments/handler/deletePayment.ts
import { NextResponse } from "next/server";
async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await deletePayment(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  DELETE
};
