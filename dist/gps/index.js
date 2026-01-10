import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-KL4H457V.js";
import {
  getAddressById
} from "../chunk-KHO6NZXX.js";
import {
  toNextResponseFromError
} from "../chunk-K5EHU5YX.js";
import "../chunk-4QEDJH35.js";
import "../chunk-YJHA2URL.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-XAGNMCPG.js");
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
