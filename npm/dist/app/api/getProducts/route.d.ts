<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
export declare function GET(req: NextRequest): Promise<NextResponse<unknown>>;
=======
import { NextRequest, NextResponse } from 'next/server';
import { P as Product } from '../../../types-CY01mA9d.js';

declare function GET(req: NextRequest): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;

export { GET };
>>>>>>> 0fef2320e5af8b91ccaf3d1daab482378f4d43c7
