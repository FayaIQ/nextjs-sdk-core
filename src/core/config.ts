
// Authentication Configuration
export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  thirdPartyToken?: string;
  language?: number;
  gmt?: number;
}

/**
 * Cookie TTL Configuration
 * Controls how long session and authentication cookies remain valid
 * 
 * Strategy:
 * - session_id: 2 hours (7200s) for both authenticated and anonymous sessions
 * - tp_id: Long-lived (1 year) for persistent re-authentication
 * - isUser: Long-lived (1 year) for persistent client-side state
 */
export interface CookieTTLConfig {
  /** Session cookie TTL in seconds (default: 7200 = 2 hours) */
  sessionTTL: number;
  /** Third-party token (tp_id) cookie TTL in seconds (default: 1 year, persistent) */
  tpIdTTL: number;
  /** isUser flag cookie TTL in seconds (default: 1 year, persistent) */
  isUserTTL: number;
}

// Helper to get environment variable with optional brand prefix
const getEnvVar = (key: string, brand?: string): string | undefined => {
  if (typeof process === "undefined" || !process.env) return undefined;
  
  // If brand is specified, try brand-specific variable first (e.g., BRANDA_STOREAK_CLIENT_ID)
  if (brand) {
    const brandKey = `${brand.toUpperCase()}_${key}`;
    if (process.env[brandKey]) return process.env[brandKey];
  }
  
  // Fall back to standard variable name
  return process.env[key];
};

// Default auth config (can be overridden by env variables)
// Supports brand-specific env files via STOREAK_BRAND env variable
// Example: STOREAK_BRAND=brandA will look for BRANDA_STOREAK_CLIENT_ID first, then STOREAK_CLIENT_ID
export const getAuthConfig = (): AuthConfig => {
  // Try to get from environment variables first
  if (typeof process !== "undefined" && process.env) {
    // Detect brand from environment (e.g., STOREAK_BRAND=brandA or BRAND=brandA)
    const brand = process.env.STOREAK_BRAND || process.env.BRAND;
    
    const envConfig = {
      clientId: getEnvVar("STOREAK_CLIENT_ID", brand),
      clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand),
      username: getEnvVar("STOREAK_USERNAME", brand),
      password: getEnvVar("STOREAK_PASSWORD", brand),
    };

    // If required env vars are present, use them
    // thirdPartyToken is optional
    if (
      envConfig.clientId &&
      envConfig.clientSecret &&
      envConfig.username &&
      envConfig.password
    ) {
      return {
        ...envConfig,
        language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand) || "0"),
        gmt: parseInt(getEnvVar("STOREAK_GMT", brand) || "3"),
      } as AuthConfig;
    }
  }

  // Fallback to default values (for backward compatibility)
  // Do not provide hardcoded defaults here. Require environment configuration.
  // This makes missing configuration fail fast so callers can fix env setup.
  const brand = process.env?.STOREAK_BRAND || process.env?.BRAND;
  const prefix = brand ? `${brand.toUpperCase()}_` : "";
  const missing: string[] = [];
  const required = [
    `${prefix}STOREAK_CLIENT_ID`,
    `${prefix}STOREAK_CLIENT_SECRET`,
  ];

  required.forEach((name) => {
    if (!process.env?.[name]) missing.push(name);
  });

  if (missing.length > 0) {
    const hint = brand 
      ? ` (for brand: ${brand}. Set ${prefix}* variables or use standard STOREAK_* variables)` 
      : "";
    throw new Error(
      `Missing required environment variables for authentication: ${missing.join(", ")}${hint}`
    );
  }

  // If we reach here, env vars are present (paranoia check kept above)
  return {
    clientId: getEnvVar("STOREAK_CLIENT_ID", brand)!,
    clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand)!,
    username: getEnvVar("STOREAK_USERNAME", brand),
    password: getEnvVar("STOREAK_PASSWORD", brand),
    language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand) || "0"),
    gmt: parseInt(getEnvVar("STOREAK_GMT", brand) || "3"),
  } as AuthConfig;
};

/**
 * Get cookie TTL configuration from environment or defaults
 * 
 * Environment variables:
 * - SESSION_COOKIE_TTL: Session cookie TTL in seconds (default: 7200 = 2 hours)
 * - TP_ID_COOKIE_TTL: Third-party ID token cookie TTL in seconds (default: 31536000 = 1 year)
 * - IS_USER_COOKIE_TTL: isUser flag cookie TTL in seconds (default: 31536000 = 1 year)
 * 
 * Strategy:
 * - session_id (2 hours) for both authenticated and anonymous sessions
 * - Long-lived tp_id (1 year) persists for re-authentication
 * - Long-lived isUser (1 year) persists for client-side state
 * 
 * The server uses the persistent tp_id to refresh expired session_id cookies.
 * User must explicitly logout to clear these persistent cookies.
 */
export const getCookieTTLConfig = (): CookieTTLConfig => {
  const ONE_YEAR = 365 * 24 * 60 * 60; // 31536000 seconds
  const TWO_HOURS = 2 * 60 * 60; // 7200 seconds
  
  const sessionTTL = process.env?.SESSION_COOKIE_TTL 
    ? parseInt(process.env.SESSION_COOKIE_TTL) 
    : TWO_HOURS; // 2 hours - balanced security and UX
  
  const tpIdTTL = process.env?.TP_ID_COOKIE_TTL 
    ? parseInt(process.env.TP_ID_COOKIE_TTL) 
    : ONE_YEAR; // 1 year - persistent for re-auth
  
  const isUserTTL = process.env?.IS_USER_COOKIE_TTL 
    ? parseInt(process.env.IS_USER_COOKIE_TTL) 
    : ONE_YEAR; // 1 year - persistent for client state

  return {
    sessionTTL,
    tpIdTTL,
    isUserTTL,
  };
};
