/**
 * Brand interface representing menu brand data
 */
export interface Brand {
  id: string | number;
  name: string;
  /** optional localized or secondary name (e.g., English) */
  secondaryName?: string | null;
  description?: string | null;
  /** imageUrl may be null in API responses */
  imageUrl?: string | null;
  isActive?: boolean;
  // allow extra fields without breaking imports
  [key: string]: any;
}

/**
 * Response type for getBrands API call
 */
export type GetBrandsResponse = {
  brands: Brand[];
};
