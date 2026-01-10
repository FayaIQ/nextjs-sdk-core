import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-2LTRX55A.js";
import {
  getAddressById
} from "../chunk-RQK54OQG.js";
import {
  toNextResponseFromError
} from "../chunk-IOZDQE5Y.js";
import "../chunk-P2EDC6QH.js";
import "../chunk-BNWD4DSM.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-V4JQ7DPQ.js");
    const { Api } = await import("../api-IWWKU55Q.js");
    return getWithAuth(Api.getDeliveryZones);
  }
  const res = await fetch(`/api/gps/delivery-zones`);
  if (!res.ok) throw new Error(`Failed to fetch delivery zones: ${res.statusText}`);
  return res.json();
}

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
  GET as GetDeliveryZonesGET,
  getAddressById,
  getCities,
  getCountries,
  getDeliveryZones,
  getDistricts,
  getLocationChildren
};
