import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-GCZANQ5J.js";
import {
  getAddressById
} from "../chunk-5XMZ62VU.js";
import {
  toNextResponseFromError
} from "../chunk-62ZNCZU4.js";
import "../chunk-CIHJ6LT2.js";
import "../chunk-IQ6COM4B.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-PN3S5IBC.js");
    const { Api } = await import("../api-BGMUOXBY.js");
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
