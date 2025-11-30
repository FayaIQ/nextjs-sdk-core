/**
 * Brand interface representing menu brand data
 */
interface Brand {
    id: string | number;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
    [key: string]: any;
}
/**
 * Response type for getBrands API call
 */
type GetBrandsResponse = Brand[];

/**
 * Get menu brands list
 *
 * Server-side: Uses authenticated API call with getWithAuth
 * Client-side: Uses Next.js API route handler
 *
 * @returns Promise with brands array
 *
 * @example
 * // Server Component
 * const brands = await getBrands();
 *
 * @example
 * // Client Component
 * const brands = await getBrands();
 */
declare function getBrands(): Promise<GetBrandsResponse>;

export { type Brand as B, type GetBrandsResponse as G, getBrands as g };
