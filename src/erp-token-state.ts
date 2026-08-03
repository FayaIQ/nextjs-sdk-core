import { getErpTokenConfig } from "./core/config";

export type ErpAuthState = "anonymous" | "authenticated";

export interface CurrentErpTokenState {
  browserId: string;
  tenantKey: string;
  accessToken: string;
  authState: ErpAuthState;
  actorId: string;
  userId?: string;
  firebaseUid?: string;
  issuedAt: number;
  businessExpiresAt: number;
  backendExpiresAt: number;
  generation: number;
  revoked?: boolean;
}

/** A server-side renewable grant; never put a Firebase ID token in a cookie. */
export interface AuthProof {
  actorId: string;
  userId?: string;
  firebaseUid?: string;
  expiresAt: number;
  renewalGrant?: string;
}

export interface ErpTokenStore {
  get(key: string): Promise<CurrentErpTokenState | null>;
  set(key: string, value: CurrentErpTokenState): Promise<void>;
  delete(key: string): Promise<void>;
  withLock<T>(lockKey: string, ttlMs: number, action: () => Promise<T>): Promise<T>;
  getProof?(key: string): Promise<AuthProof | null>;
  setProof?(key: string, proof: AuthProof): Promise<void>;
  deleteProof?(key: string): Promise<void>;
}

export interface BotIdentityResolver {
  resolve(request: Request): Promise<
    | { verified: true; botCompanyId: string; companyName: string; verificationMethod: string }
    | { verified: false }
  >;
}

export interface IssuedErpToken {
  accessToken: string;
  /** Backend technical TTL. Defaults to ERP_TOKEN_BACKEND_TTL_SECONDS. */
  backendExpiresAt?: number;
}

export interface ErpTokenRuntime {
  tenantKey?: string;
  store: ErpTokenStore;
  now?: () => number;
  /** Must validate the Firebase credential before it is used as authenticated proof. */
  verifyAuthProof?: (rawCredential: string) => Promise<AuthProof>;
  /** Revalidates a renewable server-side grant and issues a logged-in ERP token. */
  renewAuthenticatedToken?: (proof: AuthProof, idempotencyKey: string) => Promise<IssuedErpToken>;
  botIdentityResolver?: BotIdentityResolver;
}

let runtime: ErpTokenRuntime | null = null;

export function configureErpTokenRuntime(next: ErpTokenRuntime): void {
  runtime = next;
}

export function getErpTokenRuntime(): ErpTokenRuntime {
  if (runtime) return runtime;
  if (process.env.NODE_ENV === "production") {
    throw new Error("ERP token runtime is not configured. Configure a shared ErpTokenStore (Redis or equivalent) before production use.");
  }
  runtime = { store: new InMemoryErpTokenStore() };
  return runtime;
}

export function tokenStateKey(tenantKey: string, browserId: string) {
  return `erp-token:${tenantKey}:${browserId}`;
}

export function proofStateKey(tenantKey: string, browserId: string) {
  return `erp-proof:${tenantKey}:${browserId}`;
}

export function isReusableToken(
  token: CurrentErpTokenState | null,
  context: Pick<CurrentErpTokenState, "authState" | "actorId">,
  now = Date.now(),
): boolean {
  return !!token && !token.revoked && now < token.businessExpiresAt && now < token.backendExpiresAt &&
    token.authState === context.authState && token.actorId === context.actorId;
}

export interface ResolveTokenContext {
  browserId: string;
  tenantKey?: string;
  authState: ErpAuthState;
  actorId: string;
  userId?: string;
  firebaseUid?: string;
  reason: "anonymous" | "login" | "renew" | "logout" | "replacement" | "bot";
  issue: (idempotencyKey: string) => Promise<IssuedErpToken>;
  forceReplacement?: boolean;
  /** Used by verified bot identities; never derive it from user-agent alone. */
  lockKey?: string;
}

export function generationIdempotencyKey(context: ResolveTokenContext, generation: number, now: number): string {
  const window = Math.floor(now / (getErpTokenConfig().businessTtlSeconds * 1000));
  return `${context.reason}:${context.tenantKey || getErpTokenRuntime().tenantKey || "default"}:${context.browserId}:${context.actorId}:${generation}:${window}`;
}

export async function getOrGenerateErpToken(context: ResolveTokenContext): Promise<CurrentErpTokenState> {
  const activeRuntime = getErpTokenRuntime();
  const now = activeRuntime.now?.() ?? Date.now();
  const tenantKey = context.tenantKey || activeRuntime.tenantKey || "default";
  const key = tokenStateKey(tenantKey, context.browserId);
  const expected = { authState: context.authState, actorId: context.actorId };
  const existing = await activeRuntime.store.get(key);
  if (!context.forceReplacement && existing && isReusableToken(existing, expected, now)) return existing;

  const lockKey = context.lockKey || `lock:erp-token:${tenantKey}:${context.browserId}`;
  return activeRuntime.store.withLock(lockKey, getErpTokenConfig().lockTtlMs, async () => {
    const lockedNow = activeRuntime.now?.() ?? Date.now();
    const latest = await activeRuntime.store.get(key);
    if (!context.forceReplacement && latest && isReusableToken(latest, expected, lockedNow)) return latest;

    // Do not retry here. An ambiguous sign-in timeout may already be billable.
    const issued = await context.issue(generationIdempotencyKey(context, (latest?.generation || 0) + 1, lockedNow));
    const config = getErpTokenConfig();
    const next: CurrentErpTokenState = {
      browserId: context.browserId,
      tenantKey,
      accessToken: issued.accessToken,
      authState: context.authState,
      actorId: context.actorId,
      userId: context.userId,
      firebaseUid: context.firebaseUid,
      issuedAt: lockedNow,
      businessExpiresAt: lockedNow + config.businessTtlSeconds * 1000,
      backendExpiresAt: issued.backendExpiresAt ?? lockedNow + config.backendTokenTtlSeconds * 1000,
      generation: (latest?.generation || 0) + 1,
    };
    await activeRuntime.store.set(key, next);
    return next;
  });
}

export async function invalidateErpToken(tenantKey: string, browserId: string) {
  const activeRuntime = getErpTokenRuntime();
  await activeRuntime.store.delete(tokenStateKey(tenantKey, browserId));
}

/** Development/test adapter only. It is intentionally rejected by default in production. */
export class InMemoryErpTokenStore implements ErpTokenStore {
  private readonly tokens = new Map<string, CurrentErpTokenState>();
  private readonly proofs = new Map<string, AuthProof>();
  private readonly locks = new Map<string, Promise<void>>();

  async get(key: string) { return this.tokens.get(key) || null; }
  async set(key: string, value: CurrentErpTokenState) { this.tokens.set(key, value); }
  async delete(key: string) { this.tokens.delete(key); }
  async getProof(key: string) { return this.proofs.get(key) || null; }
  async setProof(key: string, proof: AuthProof) { this.proofs.set(key, proof); }
  async deleteProof(key: string) { this.proofs.delete(key); }
  async withLock<T>(key: string, _ttlMs: number, action: () => Promise<T>): Promise<T> {
    const previous = this.locks.get(key) || Promise.resolve();
    let release!: () => void;
    const current = new Promise<void>((resolve) => { release = resolve; });
    const queued = previous.then(() => current);
    this.locks.set(key, queued);
    await previous;
    try { return await action(); }
    finally {
      release();
      if (this.locks.get(key) === queued) this.locks.delete(key);
    }
  }
}
