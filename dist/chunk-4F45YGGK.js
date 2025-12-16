import {
  deleteOffer
} from "./chunk-G4DOJMQ3.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
