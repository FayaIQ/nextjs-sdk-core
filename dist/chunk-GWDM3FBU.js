import {
  postOffersDeliveryZones
} from "./chunk-XRHDCNWW.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

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
