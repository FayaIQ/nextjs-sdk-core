import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-ZD65F4IB.js";
import {
  getAddressById
} from "../chunk-ZJ6DDODR.js";
import {
  toNextResponseFromError
} from "../chunk-PO5ESI5N.js";
import "../chunk-2JDMHW7P.js";
import "../chunk-HALIJFAD.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-A4L6W3MW.js");
    const { Api } = await import("../api-A4L53SZM.js");
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
