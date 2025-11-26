import {
  getOffersGroups
} from "./chunk-SLN5FKCZ.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

// src/inventory/offers/handler/getOffersGroups.ts
async function GET(request, { params }) {
  try {
    const result = await getOffersGroups((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
