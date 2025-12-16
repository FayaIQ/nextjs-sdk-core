import { NextRequest, NextResponse } from 'next/server';

declare function DELETE(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

export { DELETE };
