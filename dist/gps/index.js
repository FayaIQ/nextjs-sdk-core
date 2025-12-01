import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-HXQVS6DS.js";
import {
  getAddressById
} from "../chunk-DJ3MY7LH.js";
import {
  toNextResponseFromError
} from "../chunk-M4NI36R3.js";
import "../chunk-DX5D3J7G.js";
import "../chunk-ZOAZYWLH.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-KQ73IXBD.js");
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
