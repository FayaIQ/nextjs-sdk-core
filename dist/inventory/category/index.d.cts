import { NextRequest, NextResponse } from 'next/server';

interface Category {
    CategoryID: number;
    name: string;
}

/**
 * Fetches a list of categories from the server
 * Works in both server and client components
 *
 * @returns Promise with category data
 *
 * @example
 * // Server component
 * const categories = await getCatigories();
 *
 * @example
 * // Client component
 * const categories = await getCatigories();
 */
declare function getCatigories(): Promise<Category[]>;

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET(request: NextRequest): Promise<NextResponse<Category[]> | NextResponse<{
    error: string;
}>>;

export { GET as CategoriesGET, type Category, getCatigories };
