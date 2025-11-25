
// Authentication Configuration
export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  language?: number;
  gmt?: number;
}

// Default auth config (can be overridden by env variables)
export const getAuthConfig = (): AuthConfig => {
  // Try to get from environment variables first
  if (typeof process !== "undefined" && process.env) {
    const envConfig = {
      clientId: process.env.STOREAK_CLIENT_ID,
      clientSecret: process.env.STOREAK_CLIENT_SECRET,
      username: process.env.STOREAK_USERNAME,
      password: process.env.STOREAK_PASSWORD,
    };

    // If all env vars are present, use them
    if (
      envConfig.clientId &&
      envConfig.clientSecret &&
      envConfig.username &&
      envConfig.password
    ) {
      return {
        ...envConfig,
        language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
        gmt: parseInt(process.env.STOREAK_GMT || "3"),
      } as AuthConfig;
    }
  }

  // Fallback to default values (for backward compatibility)
  // Do not provide hardcoded defaults here. Require environment configuration.
  // This makes missing configuration fail fast so callers can fix env setup.
  const missing: string[] = [];
  const required = [
    "STOREAK_CLIENT_ID",
    "STOREAK_CLIENT_SECRET",
  ];

  required.forEach((name) => {
    if (!process.env?.[name]) missing.push(name);
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for authentication: ${missing.join(", ")}`
    );
  }

  // If we reach here, env vars are present (paranoia check kept above)
  return {
    clientId: process.env.STOREAK_CLIENT_ID ,
    clientSecret: process.env.STOREAK_CLIENT_SECRET,
    username: process.env.STOREAK_USERNAME,
    password: process.env.STOREAK_PASSWORD,
    language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
    gmt: parseInt(process.env.STOREAK_GMT || "3"),
  } as AuthConfig;
};
