
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
  // TODO: Remove these defaults in production - should use env vars only
  return {
    clientId: "610262c3-b8ff-40b5-8a8e-951eadbe7a31",
    clientSecret: "UxiTJPZguIXBxVLjxGltrHvOdEqsjndG",
    username: "athathak",
    password: "123456",
    language: 0,
    gmt: 3,
  };
};
