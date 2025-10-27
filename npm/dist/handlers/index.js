import {
  ItemsFilterParameters,
  getProductInfo,
  getProducts,
  getStoreInfo
} from "../chunk-J6LAVJH6.js";
import {
  postWithoutAuth
} from "../chunk-A723DX7U.js";
import {
  getAuthConfig
} from "../chunk-GQDJ3DYT.js";
import {
  Api
} from "../chunk-Q7ILR5WQ.js";

// src/handlers/storeInfo.ts
import { NextResponse } from "next/server";
async function GET() {
  try {
    const storeInfo = await getStoreInfo();
    return NextResponse.json(storeInfo);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch store info";
    console.error("Store info error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/handlers/getProducts.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return NextResponse2.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse2.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/handlers/productInfo.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request, { params }) {
  try {
    const product = await getProductInfo(params.id);
    return NextResponse3.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch product info";
    console.error("Product info error:", message);
    return NextResponse3.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/handlers/login.ts
import { cookies } from "next/headers";
async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }
    const authConfig = getAuthConfig();
    const data = await postWithoutAuth(
      Api.signIn,
      {
        username,
        password,
        clientId: authConfig.clientId,
        clientSecret: authConfig.clientSecret,
        Language: authConfig.language ?? 0,
        GMT: authConfig.gmt ?? 3,
        IsFromNotification: false
      }
    );
    const cookieStore = await cookies();
    const expiresIn = data.expires || 7200;
    cookieStore.set({
      name: "access_token",
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn
    });
    if (data.employeeStoreId) {
      cookieStore.set({
        name: "employee_store_id",
        value: data.employeeStoreId.toString(),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expiresIn
      });
    }
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
      user: data.user || null
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({
      error: error instanceof Error ? error.message : "Login failed"
    }, { status: 500 });
  }
}

// src/handlers/logout.ts
import { cookies as cookies2 } from "next/headers";
async function POST2() {
  try {
    const cookieStore = await cookies2();
    cookieStore.delete("access_token");
    cookieStore.delete("employee_store_id");
    cookieStore.delete("delivery_token");
    cookieStore.delete("roles");
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
export {
  GET2 as GetProductsGET,
  POST as LoginPOST,
  POST2 as LogoutPOST,
  GET3 as ProductInfoGET,
  GET as StoreInfoGET
};
