import { NextRequest } from 'next/server';

interface Wish {
    id: number;
    itemId: number;
    userId: number;
    createdAt?: string;
}
interface WishesResponse {
    data: Wish[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
}

interface GetWishesParams {
    currentPage?: number;
    pageSize?: number;
}
/**
 * Get wishes with pagination
 * @param params - Pagination and filter parameters
 * @returns Promise with WishesResponse
 */
declare function getWishes(params?: GetWishesParams): Promise<WishesResponse>;

declare function GET(request: NextRequest): Promise<Response>;

export { GET as GetWishesGET, type GetWishesParams, type Wish, type WishesResponse, getWishes };
