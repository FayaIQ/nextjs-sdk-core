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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAuthConfig
});
