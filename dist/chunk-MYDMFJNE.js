import {
  getPaymentById
} from "./chunk-RXWPNJSH.js";
import {
  toNextResponseFromError
} from "./chunk-O4TRWZWB.js";

// src/inventory/payments/handler/getPaymentById.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await getPaymentById(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
