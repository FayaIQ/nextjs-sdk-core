import { NextRequest, NextResponse } from 'next/server';

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

/**
 * Add an item to the wishlist
 * @param itemId - The item ID to add to wishlist
 * @returns Promise with success response
 */
declare function postWish(itemId: string | number): Promise<void>;

/**
 * Remove an item from the wishlist
 * @param itemId - The item ID to remove from wishlist
 * @returns Promise with success response
 */
declare function deleteWish(itemId: string | number): Promise<void>;

declare function GET(request: NextRequest): Promise<Response>;

/**
 * POST handler for adding an item to wishlist
 * Route: /api/wishes/[itemId]
 */
declare function POST(request: NextRequest, context: {
    params: Promise<{
        itemId: string;
    }>;
}): Promise<NextResponse>;

/**
 * DELETE handler for removing an item from wishlist
 * Route: /api/wishes/[itemId]
 */
declare function DELETE(request: NextRequest, context: {
    params: Promise<{
        itemId: string;
    }>;
}): Promise<NextResponse>;

export { DELETE as DeleteWishDELETE, GET as GetWishesGET, type GetWishesParams, POST as PostWishPOST, type Wish, type WishesResponse, deleteWish, getWishes, postWish };
