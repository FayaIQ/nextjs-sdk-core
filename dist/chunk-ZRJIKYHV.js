// src/core/config.ts
var getAuthConfig = () => {
  if (typeof process !== "undefined" && process.env) {
    const envConfig = {
      clientId: process.env.STOREAK_CLIENT_ID,
      clientSecret: process.env.STOREAK_CLIENT_SECRET,
      username: process.env.STOREAK_USERNAME,
      password: process.env.STOREAK_PASSWORD
    };
    if (envConfig.clientId && envConfig.clientSecret && envConfig.username && envConfig.password) {
      return {
        ...envConfig,
        language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
        gmt: parseInt(process.env.STOREAK_GMT || "3")
      };
    }
  }
  const missing = [];
  const required = [
    "STOREAK_CLIENT_ID",
    "STOREAK_CLIENT_SECRET"
  ];
  required.forEach((name) => {
    if (!process.env?.[name]) missing.push(name);
  });
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for authentication: ${missing.join(", ")}`
    );
  }
  return {
    clientId: process.env.STOREAK_CLIENT_ID,
    clientSecret: process.env.STOREAK_CLIENT_SECRET,
    username: process.env.STOREAK_USERNAME,
    password: process.env.STOREAK_PASSWORD,
    language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
    gmt: parseInt(process.env.STOREAK_GMT || "3")
  };
};

export {
  getAuthConfig
};
