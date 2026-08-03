import { NextRequest, NextResponse } from "next/server";
import { getErpTokenConfig } from "../../core/config";
import { getErpTokenRuntime, proofStateKey, tokenStateKey } from "../../erp-token-state";
import getToken, { ReauthenticationRequiredError } from "../../token";
import { COOKIE_NAMES, ensureErpBrowserId } from "../../utils/cookie";

function isQualifyingRequest(request: NextRequest): boolean {
  if (request.method === "HEAD") return false;
  const path = request.nextUrl.pathname;
  if (/\.(?:ico|png|jpe?g|gif|svg|css|js|map|woff2?|txt|xml)$/i.test(path)) return false;
  const headers = request.headers;
  return headers.get("purpose") !== "prefetch" &&
    headers.get("sec-purpose") !== "prefetch" &&
    headers.get("next-router-prefetch") !== "1";
}

function safeStatus(state: Awaited<ReturnType<ReturnType<typeof getErpTokenRuntime>["store"]["get"]>>) {
  if (!state) return { initialized: false, authenticated: false };
  return {
    initialized: true,
    authenticated: state.authState === "authenticated",
    issuedAt: state.issuedAt,
    businessExpiresAt: state.businessExpiresAt,
    generation: state.generation,
  };
}

/**
 * GET /api/auth/token is a status endpoint. Only `?initialize=1` on a real
 * application request may initialize the anonymous window; neither branch
 * returns encrypted or raw ERP-token material.
 */
export async function GET(request: NextRequest) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const browserId = ensureErpBrowserId(cookieStore, getErpTokenConfig().browserCookieTtlSeconds);
  const runtime = getErpTokenRuntime();
  const tenantKey = runtime.tenantKey || "default";

  try {
    if (request.nextUrl.searchParams.get("initialize") === "1" && isQualifyingRequest(request)) {
      await getToken();
    }
    const state = await runtime.store.get(tokenStateKey(tenantKey, browserId));
    return NextResponse.json(safeStatus(state));
  } catch (error) {
    if (error instanceof ReauthenticationRequiredError) {
      return NextResponse.json({ authenticated: false, reauthenticationRequired: true }, { status: 401 });
    }
    const message = error instanceof Error ? error.message : "Unable to resolve ERP session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/auth/proof/sync. It validates and stores renewable authentication
 * proof only; it must never perform ERP sign-in or reset the visit window.
 */
export async function POST(request: NextRequest) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const browserId = cookieStore.get(COOKIE_NAMES.ERP_BROWSER_ID)?.value;
  const credential = (await request.json().catch(() => ({}))).thirdPartyToken;
  const runtime = getErpTokenRuntime();
  if (!browserId || typeof credential !== "string" || !runtime.verifyAuthProof || !runtime.store.setProof) {
    return NextResponse.json({ authenticated: false, reauthenticationRequired: true }, { status: 401 });
  }
  try {
    const proof = await runtime.verifyAuthProof(credential);
    const tenantKey = runtime.tenantKey || "default";
    await runtime.store.setProof(proofStateKey(tenantKey, browserId), proof);
    return NextResponse.json({ authenticated: true, proofExpiresAt: proof.expiresAt });
  } catch {
    return NextResponse.json({ authenticated: false, reauthenticationRequired: true }, { status: 401 });
  }
}
