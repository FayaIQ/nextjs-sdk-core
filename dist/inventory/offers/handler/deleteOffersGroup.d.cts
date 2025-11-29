import { NextResponse } from 'next/server';

declare function DELETE(_request: Request, { params }: {
    params: Promise<{
        id: string;
        offerGroupId: string;
    }>;
}): Promise<NextResponse<any>>;

export { DELETE };
