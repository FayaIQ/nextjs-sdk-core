// src/core/config.ts
var getEnvVar = (key, brand) => {
  if (typeof process === "undefined" || !process.env) return void 0;
  if (brand) {
    const brandKey = `${brand.toUpperCase()}_${key}`;
    if (process.env[brandKey]) return process.env[brandKey];
  }
  return process.env[key];
};
var getAuthConfig = () => {
  if (typeof process !== "undefined" && process.env) {
    const brand2 = process.env.STOREAK_BRAND || process.env.BRAND;
    const envConfig = {
      clientId: getEnvVar("STOREAK_CLIENT_ID", brand2),
      clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand2),
      username: getEnvVar("STOREAK_USERNAME", brand2),
      password: getEnvVar("STOREAK_PASSWORD", brand2),
      thirdPartyToken: getEnvVar("STOREAK_THIRD_PARTY_TOKEN", brand2)
    };
    if (envConfig.clientId && envConfig.clientSecret && envConfig.username && envConfig.password) {
      return {
        ...envConfig,
        language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand2) || "0"),
        gmt: parseInt(getEnvVar("STOREAK_GMT", brand2) || "3")
      };
    }
  }
  const brand = process.env?.STOREAK_BRAND || process.env?.BRAND;
  const prefix = brand ? `${brand.toUpperCase()}_` : "";
  const missing = [];
  const required = [
    `${prefix}STOREAK_CLIENT_ID`,
    `${prefix}STOREAK_CLIENT_SECRET`
  ];
  required.forEach((name) => {
    if (!process.env?.[name]) missing.push(name);
  });
  if (missing.length > 0) {
    const hint = brand ? ` (for brand: ${brand}. Set ${prefix}* variables or use standard STOREAK_* variables)` : "";
    throw new Error(
      `Missing required environment variables for authentication: ${missing.join(", ")}${hint}`
    );
  }
  return {
    clientId: getEnvVar("STOREAK_CLIENT_ID", brand),
    clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand),
    username: getEnvVar("STOREAK_USERNAME", brand),
    password: getEnvVar("STOREAK_PASSWORD", brand),
    thirdPartyToken: getEnvVar("STOREAK_THIRD_PARTY_TOKEN", brand),
    language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand) || "0"),
    gmt: parseInt(getEnvVar("STOREAK_GMT", brand) || "3")
  };
};

export {
  getAuthConfig
};
