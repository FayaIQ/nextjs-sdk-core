import { NextRequest, NextResponse } from "next/server";
import { Product } from "../../../types";
export declare function GET(req: NextRequest): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;
