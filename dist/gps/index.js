import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-KZPOAXAD.js";
import {
  getAddressById
} from "../chunk-42FY5KGR.js";
import {
  toNextResponseFromError
} from "../chunk-R5KMKS7K.js";
import "../chunk-ZBFVDZDR.js";
import "../chunk-PHIPV526.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-IPUEKTOU.js");
    const { Api } = await import("../api-ZX2CZJVZ.js");
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
