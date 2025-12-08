import {
  loginUser
} from "./chunk-7764LQL3.js";
import {
  getAuthConfig
} from "./chunk-JC63QBDJ.js";

// src/identity/handler/login.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const config = getAuthConfig();
    const credentials = {
      clientId: body.clientId ?? config.clientId,
      clientSecret: body.clientSecret ?? config.clientSecret,
      username: body.username ?? config.username,
      password: body.password ?? config.password,
      Language: body.Language ?? config.language ?? 0,
      GMT: body.GMT ?? config.gmt ?? 3,
      IsFromNotification: false
    };
    const response = await loginUser(credentials);
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        employeeStoreId: response.employeeStoreId || null,
        roles: response.roles || [],
        user: response.user || null
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed unexpectedly";
    console.error("Login error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 401 }
    );
  }
}

export {
  POST
};
