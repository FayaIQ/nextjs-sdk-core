import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
<<<<<<< HEAD
} from "../chunk-2LTRX55A.js";
import {
  getAddressById
} from "../chunk-RQK54OQG.js";
import {
  toNextResponseFromError
} from "../chunk-IOZDQE5Y.js";
import "../chunk-P2EDC6QH.js";
import "../chunk-BNWD4DSM.js";
=======
} from "../chunk-KZMUMDLE.js";
import {
  getAddressById
} from "../chunk-X5C5SZKA.js";
import {
  toNextResponseFromError
} from "../chunk-YWYY4STJ.js";
import "../chunk-DU5RCNSK.js";
import "../chunk-FBLW4A4O.js";
>>>>>>> parent of cc81c84 (Refactor decryption functions to use async/await for improved handling of encrypted cookies and tokens)

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
<<<<<<< HEAD
    const { getWithAuth } = await import("../fetcher-V4JQ7DPQ.js");
=======
    const { getWithAuth } = await import("../fetcher-3366SLXM.js");
>>>>>>> parent of cc81c84 (Refactor decryption functions to use async/await for improved handling of encrypted cookies and tokens)
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
