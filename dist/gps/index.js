import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-5FUBOEWK.js";
import {
  getAddressById
} from "../chunk-FG2SEXH6.js";
import {
  toNextResponseFromError
} from "../chunk-MQK4KZWN.js";
import "../chunk-TTOGW4EE.js";
import "../chunk-XPPYGZO6.js";
import "../chunk-MLKGABMK.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-LNRTGLFX.js");
    const { Api } = await import("../api-M7CLY2YV.js");
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
