// src/inventory/offers/getOffersPaging.ts
async function getOffersPaging(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return getWithAuth(Api.getOffersPaging, query);
  }
  const qs = query ? new URLSearchParams(query).toString() : "";
  const res = await fetch(`/api/offers/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch offers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOfferById.ts
async function getOfferById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return getWithAuth(Api.getOfferById(id));
  }
  const res = await fetch(`/api/offers/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch offer ${id}: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/deleteOffer.ts
async function deleteOffer(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return deleteWithAuth(Api.deleteOffer(id));
  }
  const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete offer ${id}: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getInvoiceDiscount.ts
async function getInvoiceDiscount(coupon) {
  if (typeof window === "undefined") {
    const { getWithoutAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return getWithoutAuth(Api.getInvoiceDiscount(coupon));
  }
  const res = await fetch(`/api/offers/invoice-discount/${encodeURIComponent(String(coupon))}`);
  if (!res.ok) throw new Error(`Failed to fetch invoice discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersItemsDropdown.ts
async function getOffersItemsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return getWithAuth(Api.getOffersItemsDropdown);
  }
  const res = await fetch(`/api/offers/items/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers items dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersCouponsDropdown.ts
async function getOffersCouponsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return getWithAuth(Api.getOffersCouponsDropdown);
  }
  const res = await fetch(`/api/offers/coupons/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers coupons dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersItemsDiscount.ts
async function postOffersItemsDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return postWithAuth(Api.postOffersItemsDiscount, payload);
  }
  const res = await fetch(`/api/offers/items-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to post items discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersItemsDiscount.ts
async function putOffersItemsDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return putWithAuth(Api.putOffersItemsDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/items-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put items discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersCustomers.ts
async function getOffersCustomers() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-TNCNK5RR.js");
    const { Api } = await import("../../api-QN4A3WS4.js");
    return getWithAuth(Api.getOffersCustomers);
  }
  const res = await fetch(`/api/offers/customers`);
  if (!res.ok) throw new Error(`Failed to fetch offers customers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/handler/getOffersPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getOffersPaging(params);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers";
    console.error("getOffersPaging error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOfferById.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request, { params }) {
  try {
    const result = await getOfferById((await params).id);
    return NextResponse2.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offer";
    console.error("getOfferById error:", message);
    return NextResponse2.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/deleteOffer.ts
import { NextResponse as NextResponse3 } from "next/server";
async function DELETE(request, { params }) {
  try {
    const result = await deleteOffer((await params).id);
    return NextResponse3.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete offer";
    console.error("deleteOffer error:", message);
    return NextResponse3.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/getInvoiceDiscount.ts
import { NextResponse as NextResponse4 } from "next/server";
async function GET3(request, { params }) {
  try {
    const result = await getInvoiceDiscount((await params).coupon);
    return NextResponse4.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch invoice discount";
    console.error("getInvoiceDiscount error:", message);
    return NextResponse4.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOffersItemsDropdown.ts
import { NextResponse as NextResponse5 } from "next/server";
async function GET4() {
  try {
    const result = await getOffersItemsDropdown();
    return NextResponse5.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers items dropdown";
    console.error("getOffersItemsDropdown error:", message);
    return NextResponse5.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOffersCouponsDropdown.ts
import { NextResponse as NextResponse6 } from "next/server";
async function GET5() {
  try {
    const result = await getOffersCouponsDropdown();
    return NextResponse6.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers coupons dropdown";
    console.error("getOffersCouponsDropdown error:", message);
    return NextResponse6.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/postOffersItemsDiscount.ts
import { NextResponse as NextResponse7 } from "next/server";
async function POST(request) {
  try {
    const data = await request.json();
    const result = await postOffersItemsDiscount(data);
    return NextResponse7.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to post items discount";
    console.error("postOffersItemsDiscount error:", message);
    return NextResponse7.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/putOffersItemsDiscount.ts
import { NextResponse as NextResponse8 } from "next/server";
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscount((await params).id, data);
    return NextResponse8.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to put items discount";
    console.error("putOffersItemsDiscount error:", message);
    return NextResponse8.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOffersCustomers.ts
import { NextResponse as NextResponse9 } from "next/server";
async function GET6() {
  try {
    const result = await getOffersCustomers();
    return NextResponse9.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers customers";
    console.error("getOffersCustomers error:", message);
    return NextResponse9.json({ error: message }, { status: 500 });
  }
}
export {
  DELETE as DeleteOfferDELETE,
  GET3 as GetInvoiceDiscountGET,
  GET2 as GetOfferByIdGET,
  GET5 as GetOffersCouponsDropdownGET,
  GET6 as GetOffersCustomersGET,
  GET4 as GetOffersItemsDropdownGET,
  GET as GetOffersPagingGET,
  POST as PostOffersItemsDiscountPOST,
  PUT as PutOffersItemsDiscountPUT,
  deleteOffer,
  getInvoiceDiscount,
  getOfferById,
  getOffersCouponsDropdown,
  getOffersCustomers,
  getOffersItemsDropdown,
  getOffersPaging,
  postOffersItemsDiscount,
  putOffersItemsDiscount
};
