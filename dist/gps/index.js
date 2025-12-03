import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-EGNYYR35.js";
import {
  getAddressById
} from "../chunk-HQ24Q3UW.js";
import {
  toNextResponseFromError
} from "../chunk-Q5UAPQOW.js";
import "../chunk-KVQU4RVP.js";
import "../chunk-SK7VZIJK.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-KXJP7QMF.js");
    const { Api } = await import("../api-QG2WVXL6.js");
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
