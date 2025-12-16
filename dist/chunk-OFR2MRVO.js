import {
  getItemById
} from "./chunk-LRA4WR4V.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/inventory/items/handler/getItemById.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await getItemById(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
