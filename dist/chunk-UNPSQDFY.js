import {
  putOffersGroup
} from "./chunk-2IKDURFE.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

// src/inventory/offers/handler/putOffersGroup.ts
import { NextResponse } from "next/server";
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { id, offerGroupId } = await params;
    const result = await putOffersGroup(id, offerGroupId, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  PUT
};
