import { NextRequest, NextResponse } from 'next/server';

interface Store {
    id: number;
    code: string;
    name: string;
}

declare function getStores(): Promise<Store[]>;

declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET as GETStores, type Store, getStores };
