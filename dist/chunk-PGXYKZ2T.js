import {
  getDeliveryZones
} from "./chunk-ZUQ2S6DY.js";
import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";

// src/gps/handler/getDeliveryZones.ts
async function GET(request) {
  try {
    const result = await getDeliveryZones();
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
