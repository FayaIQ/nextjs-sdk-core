import {
  deleteOffersGroup
} from "./chunk-VVI2ZSUP.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
