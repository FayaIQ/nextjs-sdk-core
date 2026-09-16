import { NextRequest, NextResponse } from "next/server";
import { toNextResponseFromError } from "../../../core/errorResponse";
import { getCustomerNews } from "../getCustomerNews";

export async function GET(request: NextRequest) {
  try {
    const news = await getCustomerNews();

    return NextResponse.json(news);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}
