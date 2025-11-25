import {
  toNextResponseFromError
} from "../../chunk-33LBUEAG.js";
import "../../chunk-PIGVTWVO.js";
import "../../chunk-ZAQXIQEL.js";

// src/inventory/payments/getPayments.ts
async function getPayments(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-4LH54I5A.js");
    const { Api } = await import("../../api-XKV6O6PD.js");
    return getWithAuth(Api.getPayments, query);
  }
  const params = new URLSearchParams();
  if (query) Object.entries(query).forEach(([k, v]) => {
    if (v !== void 0 && v !== null) params.append(k, String(v));
  });
  const res = await fetch(`/api/payments?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch payments: ${res.statusText}`);
  return res.json();
}

// src/inventory/payments/getPaymentById.ts
async function getPaymentById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-4LH54I5A.js");
    const { Api } = await import("../../api-XKV6O6PD.js");
    return getWithAuth(Api.getPayment(id));
  }
  const res = await fetch(`/api/payments/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch payment: ${res.statusText}`);
  return res.json();
}

// src/inventory/payments/postPayment.ts
async function postPayment(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-4LH54I5A.js");
    const { Api } = await import("../../api-XKV6O6PD.js");
    return postWithAuth(Api.postPayments, payload);
  }
  const res = await fetch(`/api/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to create payment: ${res.statusText}`);
  return res.json();
}

// src/inventory/payments/putPayment.ts
async function putPayment(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-4LH54I5A.js");
    const { Api } = await import("../../api-XKV6O6PD.js");
    return putWithAuth(Api.putPayment(id), payload);
  }
  const res = await fetch(`/api/payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to update payment: ${res.statusText}`);
  return res.json();
}

// src/inventory/payments/deletePayment.ts
async function deletePayment(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../fetcher-4LH54I5A.js");
    const { Api } = await import("../../api-XKV6O6PD.js");
    return deleteWithAuth(Api.deletePayment(id));
  }
  const res = await fetch(`/api/payments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete payment: ${res.statusText}`);
  return res.json();
}

// src/inventory/payments/getStorePayments.ts
async function getStorePayments(storeId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-4LH54I5A.js");
    const { Api } = await import("../../api-XKV6O6PD.js");
    return getWithAuth(Api.getStorePayments(storeId));
  }
  const res = await fetch(`/api/stores/${storeId}/payments`);
  if (!res.ok) throw new Error(`Failed to fetch store payments: ${res.statusText}`);
  return res.json();
}

// src/inventory/payments/getPaymentsReport.ts
async function getPaymentsReport(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-4LH54I5A.js");
    const { Api } = await import("../../api-XKV6O6PD.js");
    return getWithAuth(Api.getPaymentsReport, query);
  }
  const params = new URLSearchParams();
  if (query) Object.entries(query).forEach(([k, v]) => {
    if (v !== void 0 && v !== null) params.append(k, String(v));
  });
  const res = await fetch(`/api/payments/report?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch payments report: ${res.statusText}`);
  return res.json();
}

// src/inventory/payments/handler/getPayments.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getPayments(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/payments/handler/getPaymentsReport.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getPaymentsReport(params);
    return NextResponse2.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/payments/handler/getPaymentById.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request, { params }) {
  try {
    const { id } = await params;
    const result = await getPaymentById(id);
    return NextResponse3.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/payments/handler/postPayment.ts
import { NextResponse as NextResponse4 } from "next/server";
async function POST(request) {
  try {
    const body = await request.json();
    const result = await postPayment(body);
    return NextResponse4.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/payments/handler/putPayment.ts
import { NextResponse as NextResponse5 } from "next/server";
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await putPayment(id, body);
    return NextResponse5.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/payments/handler/deletePayment.ts
import { NextResponse as NextResponse6 } from "next/server";
async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await deletePayment(id);
    return NextResponse6.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/payments/handler/getStorePayments.ts
import { NextResponse as NextResponse7 } from "next/server";
async function GET4(request, { params }) {
  try {
    const { storeId } = await params;
    const result = await getStorePayments(storeId);
    return NextResponse7.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  DELETE as DeletePaymentDELETE,
  GET3 as GetPaymentByIdGET,
  GET as GetPaymentsGET,
  GET2 as GetPaymentsReportGET,
  GET4 as GetStorePaymentsGET,
  POST as PostPaymentPOST,
  PUT as PutPaymentPUT,
  deletePayment,
  getPaymentById,
  getPayments,
  getPaymentsReport,
  getStorePayments,
  postPayment,
  putPayment
};
