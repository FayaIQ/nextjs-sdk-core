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

export interface postCustomerRequest extends OfferPostRequest {
  minimumCartValue ?: number
}
export interface postOffersInvoiceDiscountRequest extends OfferPostRequest {
  minimumCartValue ?: number,
  couponCode ?: string,
  useCouponMultipleTimesBySameUserCount ?: number
}


export interface OffersFilters {
  Name?: string | null;
  Start?: Date | null;
  End?: Date | null;
  DiscountType?: number | null;
  IsActive?: boolean | null;
  HasCouponCode?: boolean | null;
  OfferFilterType?: number | null;
  ItemId?: number | null;
  Barcode?: string | null;
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
        results: Offer[];
    }


