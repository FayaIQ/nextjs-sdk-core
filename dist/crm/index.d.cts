import { NextRequest, NextResponse } from 'next/server';

interface ClientAddressRequest {
    gps?: string | null;
    districtId?: number | null;
    note?: string | null;
    appartmentId?: number | null;
    clientId?: string | null;
}
interface PostClientRequest {
    name: string;
    address?: ClientAddressRequest | null;
    email?: string | null;
    phoneCode?: string | null;
    phoneNumber?: string | null;
    clientTypeId?: string | null;
    classId?: string | null;
    isApproved?: boolean;
    isAddedByAdmin?: boolean;
}
interface Client {
    id: string;
    name: string;
    email?: string | null;
    phoneCode?: string | null;
    phoneNumber?: string | null;
    isApproved?: boolean;
    isAddedByAdmin?: boolean;
    address?: {
        gps?: string | null;
        districtId?: number | null;
        note?: string | null;
        appartmentId?: number | null;
        clientId?: string | null;
    } | null;
}
interface ClientsPagingResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    results: Client[];
}

/**
 * Fetch paginated clients. Accepts an optional query object which will be
 * serialized to URL parameters.
 */
declare function getClientsPaging(query?: Record<string, any>): Promise<ClientsPagingResponse>;

declare function getClients(): Promise<Client[]>;

declare function postClient(data: PostClientRequest): Promise<Client>;

declare function GET$1(request: NextRequest): Promise<NextResponse<any>>;

declare function GET(request: NextRequest): Promise<NextResponse<any>>;

declare function POST(request: NextRequest): Promise<NextResponse<any>>;

export { GET$1 as GETClients, GET as GETClientsPaging, POST as POSTClient, getClients, getClientsPaging, postClient };
