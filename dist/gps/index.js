import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-G2QYSQMN.js";
import {
  getAddressById
} from "../chunk-WCNPWUZR.js";
import {
  toNextResponseFromError
} from "../chunk-ZZVR2LE4.js";
import "../chunk-H55HKCIA.js";
import "../chunk-KDJXDHRD.js";
import "../chunk-3RG5ZIWI.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-JSGKYMT4.js");
    const { Api } = await import("../api-RSV64Y2K.js");
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
