import {
  deleteOffersGroup
} from "./chunk-BRL2HLYL.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

// src/inventory/offers/handler/deleteOffersGroup.ts
import { NextResponse } from "next/server";
async function DELETE(_request, { params }) {
  try {
    const { id, offerGroupId } = await params;
    const result = await deleteOffersGroup(id, offerGroupId);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  DELETE
};
