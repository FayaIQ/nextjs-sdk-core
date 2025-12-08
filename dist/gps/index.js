import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-5KYGNV44.js";
import {
  getAddressById
} from "../chunk-XE2ETXDA.js";
import {
  toNextResponseFromError
} from "../chunk-CO3V3FSC.js";
import "../chunk-Z7VQQBWD.js";
import "../chunk-MLSOWJ72.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-M63KOPG2.js");
    const { Api } = await import("../api-YF4GAK4X.js");
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
