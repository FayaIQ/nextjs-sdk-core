/**
 * Brand interface representing menu brand data
 */
export interface Brand {
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
export type GetBrandsResponse = Brand[];
