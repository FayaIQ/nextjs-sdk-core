import { getErpTokenConfig } from "../core/config";
import { getErpTokenRuntime, getOrGenerateErpToken, proofStateKey } from "../erp-token-state";
import { issueAnonymousToken } from "../token";
import { COOKIE_NAMES, ensureErpBrowserId } from "../utils/cookie";

const SDK_OWNED_COOKIES = [
  COOKIE_NAMES.SESSION_ID,
  COOKIE_NAMES.TP_ID,
  COOKIE_NAMES.IS_USER,
  COOKIE_NAMES.CRF,
] as const;

export async function logoutUser(): Promise<{ success: boolean }> {
  if (typeof window !== "undefined") {
    const response = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    if (!response.ok) throw new Error(`Logout failed: ${response.statusText}`);
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("erp-auth") : null;
    channel?.postMessage({ type: "logout" });
    channel?.close();
    return response.json();
  }

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const browserId = ensureErpBrowserId(cookieStore, getErpTokenConfig().browserCookieTtlSeconds);
  const runtime = getErpTokenRuntime();
  const tenantKey = runtime.tenantKey || "default";
  for (const name of SDK_OWNED_COOKIES) cookieStore.delete(name);
  await runtime.store.deleteProof?.(proofStateKey(tenantKey, browserId));

  // The state transition itself is the concurrency boundary: the first logout
  // replaces authenticated state, while concurrent tabs reuse that anonymous
  // three-hour window rather than issuing more visits.
  await getOrGenerateErpToken({
    browserId,
    tenantKey,
    authState: "anonymous",
    actorId: `browser:${browserId}`,
    reason: "logout",
    issue: issueAnonymousToken,
  });
  return { success: true };
}

export { SDK_OWNED_COOKIES };
