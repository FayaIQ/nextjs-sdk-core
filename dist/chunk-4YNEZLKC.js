import {
  postPayment
} from "./chunk-45E3XDY2.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

// src/inventory/payments/handler/postPayment.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json();
    const result = await postPayment(body);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
