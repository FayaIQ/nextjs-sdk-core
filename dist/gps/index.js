import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-THVWVO6J.js";
import {
  getAddressById
} from "../chunk-DYWCEOWL.js";
import {
  toNextResponseFromError
} from "../chunk-GIKQHBMH.js";
import "../chunk-JN33UK4M.js";
import "../chunk-U773LIZ4.js";
import "../chunk-MLKGABMK.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-HFWCTJH5.js");
    const { Api } = await import("../api-JFMDIACR.js");
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
