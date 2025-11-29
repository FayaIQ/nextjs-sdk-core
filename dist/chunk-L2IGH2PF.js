import {
  toNextResponseFromError
} from "./chunk-DUWXBRUL.js";
import {
  getDeliveryZones
} from "./chunk-ALADZ2EJ.js";

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
