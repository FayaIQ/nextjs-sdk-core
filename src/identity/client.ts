/** Safe session-status polling. It never initializes or renews an ERP token. */
export type KeepAliveOptions = {
  endpoint?: string;
  intervalMs?: number;
  onError?: (error: unknown) => void;
};

let statusTimer: ReturnType<typeof setInterval> | null = null;

export function startSessionKeepAlive(options?: KeepAliveOptions): () => void {
  if (typeof window === "undefined") return () => {};
  const endpoint = options?.endpoint || "/api/auth/token";
  const intervalMs = options?.intervalMs ?? 45 * 60 * 1000;
  const checkStatus = async () => {
    try {
      // No `initialize=1`: this is deliberately not a billable-token trigger.
      await fetch(endpoint, { method: "GET", credentials: "include", cache: "no-store" });
    } catch (error) {
      options?.onError?.(error);
    }
  };
  statusTimer && clearInterval(statusTimer);
  statusTimer = setInterval(checkStatus, intervalMs);
  return () => {
    if (statusTimer) clearInterval(statusTimer);
    statusTimer = null;
  };
}

export function notifyAuthTabs(type: "login" | "logout" | "renewed" | "reauthentication-required" | "account-changed") {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
  const channel = new BroadcastChannel("erp-auth");
  channel.postMessage({ type });
  channel.close();
}
