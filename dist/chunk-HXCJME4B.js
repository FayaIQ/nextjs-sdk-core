import {
  getOffersCustomers
} from "./chunk-OP4AJZRD.js";
import {
  toNextResponseFromError
} from "./chunk-DUWXBRUL.js";

// src/inventory/offers/handler/getOffersCustomers.ts
import { NextResponse } from "next/server";
async function GET() {
  try {
    const result = await getOffersCustomers();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
