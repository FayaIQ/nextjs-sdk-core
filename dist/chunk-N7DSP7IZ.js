import {
  deletePayment
} from "./chunk-Z54BGCAF.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
