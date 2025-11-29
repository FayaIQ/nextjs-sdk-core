import { NextRequest } from 'next/server';

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        storeId: string;
    }>;
}): Promise<Response>;

export { GET };
