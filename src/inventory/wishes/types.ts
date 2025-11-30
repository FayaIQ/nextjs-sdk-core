export interface Wish {
  id: number;
  itemId: number;
  userId: number;
  createdAt?: string;
  // Add other wish-specific fields as needed
}

export interface WishesResponse {
  data: Wish[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
