import { NextRequest, NextResponse } from "next/server";
export declare function GET(req: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<unknown>>;
