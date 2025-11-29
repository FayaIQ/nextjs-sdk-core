import { NextRequest } from 'next/server';

declare function DELETE(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Response>;

export { DELETE };
