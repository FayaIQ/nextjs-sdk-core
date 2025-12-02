// Client-side session keep-alive helper
// Periodically pings /api/auth/token to ensure ERP access_token is (re)issued
// using the latest Firebase third-party token stored as tp_id.

export type KeepAliveOptions = {
  endpoint?: string; // default: /api/auth/token
  intervalMs?: number; // default: 45 minutes
  onError?: (e: any) => void;
};

let keepAliveTimer: any = null;

export function startSessionKeepAlive(options?: KeepAliveOptions): () => void {
  if (typeof window === "undefined") {
    console.warn("[identity:startSessionKeepAlive] must be called in the browser");
    return () => {};
  }
  const endpoint = options?.endpoint || "/api/auth/token";
  const intervalMs = options?.intervalMs ?? 45 * 60 * 1000; // 45 minutes by default

  const ping = async () => {
    try {
      await fetch(endpoint, { method: "GET" });
      // Intentionally ignore the body; route will refresh cookies as needed
      console.log("[identity:startSessionKeepAlive] pinged", endpoint);
    } catch (e) {
      console.warn("[identity:startSessionKeepAlive] ping failed", e);
      options?.onError?.(e);
    }
  };

  // Clear any previous timer to avoid duplicates
  if (keepAliveTimer) {
    try { clearInterval(keepAliveTimer); } catch {}
    keepAliveTimer = null;
  }

  // Kick off immediately, then on interval
  ping();
  keepAliveTimer = setInterval(ping, intervalMs);

  return () => {
    try { clearInterval(keepAliveTimer); } catch {}
    keepAliveTimer = null;
  };
}
