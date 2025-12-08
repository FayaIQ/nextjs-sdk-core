import {
  deleteOffer
} from "./chunk-UNYALT63.js";
import {
  toNextResponseFromError
} from "./chunk-6VESYXUA.js";

// src/inventory/offers/handler/deleteOffer.ts
async function DELETE(request, { params }) {
  try {
    const result = await deleteOffer((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  DELETE
};
