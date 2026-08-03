export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  username?: string;
  password?: string;
  thirdPartyToken?: string;
  language?: number;
  gmt?: number;
}

export interface ErpTokenConfig {
  /** Commercial reuse window. This is deliberately separate from backend JWT TTL. */
  businessTtlSeconds: number;
  browserCookieTtlSeconds: number;
  lockTtlMs: number;
  authProofTtlSeconds: number;
  botTokenTtlSeconds: number;
  backendTokenTtlSeconds: number;
}

const positiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getEnvVar = (key: string, brand?: string): string | undefined => {
  if (typeof process === "undefined") return undefined;
  return (brand && process.env[`${brand.toUpperCase()}_${key}`]) || process.env[key];
};

export const getAuthConfig = (): AuthConfig => {
  const brand = process.env?.STOREAK_BRAND || process.env?.BRAND;
  const clientId = getEnvVar("STOREAK_CLIENT_ID", brand);
  const clientSecret = getEnvVar("STOREAK_CLIENT_SECRET", brand);
  if (!clientId || !clientSecret) {
    throw new Error("Missing required STOREAK_CLIENT_ID or STOREAK_CLIENT_SECRET");
  }
  return {
    clientId,
    clientSecret,
    username: getEnvVar("STOREAK_USERNAME", brand),
    password: getEnvVar("STOREAK_PASSWORD", brand),
    language: positiveInt(getEnvVar("STOREAK_LANGUAGE", brand), 0),
    gmt: positiveInt(getEnvVar("STOREAK_GMT", brand), 3),
  };
};

/**
 * Names intentionally distinguish the commercial three-hour window from the
 * ERP backend token's technical validity window.
 */
export const getErpTokenConfig = (): ErpTokenConfig => ({
  businessTtlSeconds: positiveInt(process.env.ERP_TOKEN_BUSINESS_TTL_SECONDS, 10_800),
  browserCookieTtlSeconds: positiveInt(process.env.ERP_BROWSER_COOKIE_TTL_SECONDS, 31_536_000),
  lockTtlMs: positiveInt(process.env.ERP_TOKEN_LOCK_TTL_MS, 15_000),
  authProofTtlSeconds: positiveInt(process.env.ERP_AUTH_PROOF_TTL_SECONDS, 3_600),
  botTokenTtlSeconds: positiveInt(process.env.ERP_BOT_TOKEN_TTL_SECONDS, 10_800),
  backendTokenTtlSeconds: positiveInt(process.env.ERP_TOKEN_BACKEND_TTL_SECONDS, 86_400),
});

/** @deprecated Use getErpTokenConfig(). */
export const getCookieTTLConfig = () => ({
  sessionTTL: getErpTokenConfig().businessTtlSeconds,
  tpIdTTL: getErpTokenConfig().authProofTtlSeconds,
  isUserTTL: 31_536_000,
});
