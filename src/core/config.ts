
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
<<<<<<< HEAD
=======
      thirdPartyToken: getEnvVar("STOREAK_THIRD_PARTY_TOKEN", brand),
>>>>>>> dcc4086e0f7fa63c7aa80bd64a15391cc1ec5e96
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
<<<<<<< HEAD
=======
    thirdPartyToken: getEnvVar("STOREAK_THIRD_PARTY_TOKEN", brand),
>>>>>>> dcc4086e0f7fa63c7aa80bd64a15391cc1ec5e96
    language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand) || "0"),
    gmt: parseInt(getEnvVar("STOREAK_GMT", brand) || "3"),
  } as AuthConfig;
};
