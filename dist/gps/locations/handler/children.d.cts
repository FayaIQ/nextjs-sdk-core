import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for location children (cities/districts)
 * Users can simply re-export this in their app/api/locations/[parentId]/children/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/locations/handler/children';
 */
declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        parentId: string;
    }>;
}): Promise<NextResponse<any>>;

export { GET };
