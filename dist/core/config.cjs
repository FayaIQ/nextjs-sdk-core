"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/config.ts
var config_exports = {};
__export(config_exports, {
  getAuthConfig: () => getAuthConfig
});
module.exports = __toCommonJS(config_exports);
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
      password: getEnvVar("STOREAK_PASSWORD", brand2)
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
    language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand) || "0"),
    gmt: parseInt(getEnvVar("STOREAK_GMT", brand) || "3")
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAuthConfig
});
