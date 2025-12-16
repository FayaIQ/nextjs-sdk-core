import {
  postOffersDeliveryZones
} from "./chunk-WBYKA3CI.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

// src/inventory/offers/handler/postOffersDeliveryZones.ts
async function POST(request, { params }) {
  try {
    const data = await request.json();
    const result = await postOffersDeliveryZones((await params).id, data);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
