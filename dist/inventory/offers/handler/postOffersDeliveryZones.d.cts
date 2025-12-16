import { NextRequest } from 'next/server';

declare function POST(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Response>;

export { POST };
