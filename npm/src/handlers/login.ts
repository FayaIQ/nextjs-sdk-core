import { cookies } from "next/headers";
import { postWithoutAuth } from "../core/fetcher";
import {  getAuthConfig } from "../core/config";
import { Api } from "../api/api";

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires: number;
  employeeStoreId?: number;
  roles?: string[];
  user?: any;
  [key: string]: any;
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const authConfig = getAuthConfig();

    const data = await postWithoutAuth<LoginResponse>(
      Api.signIn,
      {
        username,
        password,
        clientId: authConfig.clientId,
        clientSecret: authConfig.clientSecret,
        Language: authConfig.language ?? 0,
        GMT: authConfig.gmt ?? 3,
        IsFromNotification: false,
      } as any
    );

    const cookieStore = await cookies();
    const expiresIn = data.expires || 7200;

    // Save access token
    cookieStore.set({
      name: "access_token",
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn,
    });

    // Save employee store ID if available
    if (data.employeeStoreId) {
      cookieStore.set({
        name: "employee_store_id",
        value: data.employeeStoreId.toString(),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expiresIn,
      });
    }
  
    // Save roles if available (convert array to comma-separated string)
    if (data.roles && Array.isArray(data.roles)) {
      cookieStore.set({
        name: "roles",
        value: data.roles.join(","),
        httpOnly: false, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expiresIn
      });
    }

    return Response.json({ 
      success: true,
      employeeStoreId: data.employeeStoreId || null,
      roles: data.roles || [],
      user: data.user || null,
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ 
      error: error instanceof Error ? error.message : "Login failed" 
    }, { status: 500 });
  }
}