import { NextRequest, NextResponse } from "next/server";
import { putUserInfo } from "../putUserInfo";

/**
 * Ready-to-use API route handler for updating user information
 * Users can simply re-export this in their app/api/users/route.ts:
 *
 * @example
 * export { PUT } from 'erp-core/identity/users';
 */
export async function PUT(request: NextRequest) {
  try {
    const userInfo = await request.json();

    if (
      !userInfo.FullName ||
      !userInfo.Email ||
      !userInfo.Phone ||
      userInfo.Gender === undefined
    ) {
      return NextResponse.json(
        { error: "FullName, Email, Phone, and Gender are required fields" },
        { status: 400 }
      );
    }

    if (!userInfo.Address || !userInfo.Address.DistrictId) {
      return NextResponse.json(
        { error: "Address with DistrictId is required" },
        { status: 400 }
      );
    }

    const result = await putUserInfo(userInfo);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update user info";
    console.error("User info update error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
