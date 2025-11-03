export interface OfferPostRequest {
  offerType: number
  name: string
  start: string
  end: string
  countLimit?: number
  description?: string
  discountValue: number
  discountType?: number 
  maxDiscountFlatPrice: number
  isPointsRewardsAllowed?: boolean
  isSpecific?: boolean
  isActive?: boolean
  unitLevel?: number
}

export interface Offer {
        id: string;
        name: string;
        description: string | null;
        start: Date;
        end: Date;
        offerType: number;
        countLimit: number ;
        discountValue: number ;
        discountType: number | null;
        minimumCartValue: number | null;
        minimumItemsQuntity: number | null;
        maxDiscountFlatPrice: number | null;
        couponCode: string | null;
        useCouponMultipleTimesBySameUserCount: number | null;
        canApplyRewardMultipleTimes: boolean | null;
        isPointsRewardsAllowed: boolean | null;
        pointOfferUserType: string | null;
        unitLevel: number | null;
        numberOfPaidItems: number | null;
    }

    export interface OffersPagingResponse {
        currentPage: number;
        pageCount: number;
        pageSize: number;
        rowCount: number;
        sortField: string;
        currentSortField: string;
        currentSortOrder: string;
        nextSortOrder: string;
        offers: Offer[];
    }