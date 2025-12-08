import {
  deleteOffer
} from "./chunk-BBVLJ2OK.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

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
