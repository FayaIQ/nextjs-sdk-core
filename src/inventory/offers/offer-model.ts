
export enum offerTypes {
  ItemsDiscount = 1,
  InvoiceDiscount = 2,
  ExtraItemDiscount = 3,
  ShippingDiscount = 4,
  CustomerDiscount = 5,
  CustomerItemsDiscount = 6,
}



/**
 * Paging parameters for offers listing
 */
export class OfferPagingParameters {
  currentPage: number;
  pageSize: number;
  sortField: string | null;
  currentSortField: string | null;
  currentSortOrder: string | null;

  constructor({
    currentPage = 1,
    pageSize = 20,
    sortField = null,
    currentSortField = null,
    currentSortOrder = null,
  }: {
    currentPage?: number;
    pageSize?: number;
    sortField?: string | null;
    currentSortField?: string | null;
    currentSortOrder?: string | null;
  } = {}) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.currentSortField = currentSortField;
    this.currentSortOrder = currentSortOrder;
  }

  toURLParams(): Record<string, string> {
    const params: Record<string, string> = {
      CurrentPage: this.currentPage.toString(),
      PageSize: this.pageSize.toString(),
    };
    if (this.sortField) params.SortField = this.sortField;
    if (this.currentSortField) params.CurrentSortField = this.currentSortField;
    if (this.currentSortOrder) params.CurrentSortOrder = this.currentSortOrder;
    return params;
  }
}

/**
 * Offers filter parameters matching the API query shape.
 * Supported query params:
 * - Name (string)
 * - Start (date-time string)
 * - End (date-time string)
 * - DiscountType (0,1,2)
 * - IsActive (boolean)
 * - HasCouponCode (boolean)
 * - OfferFilterType (integer)
 * - ItemId (integer)
 * - Barcode (string)
 * + paging/sorting fields: CurrentPage, PageSize, SortField, CurrentSortField, CurrentSortOrder
 */
export class OffersFilterParameters {
  // Paging
  pagingParameters: OfferPagingParameters;

  // Filters
  Name: string | null;
  Start: string | null;
  End: string | null;
  DiscountType: number | null;
  IsActive: boolean | null;
  HasCouponCode: boolean | null;
  OfferFilterType: number | null;
  ItemId: number | null;
  Barcode: string | null;

  constructor({
    pagingParameters = new OfferPagingParameters(),
    Name = null,
    Start = null,
    End = null,
    DiscountType = null,
    IsActive = null,
    HasCouponCode = null,
    OfferFilterType = null,
    ItemId = null,
    Barcode = null,
  }: {
    pagingParameters?: OfferPagingParameters;
    Name?: string | null;
    Start?: string | null;
    End?: string | null;
    DiscountType?: number | null;
    IsActive?: boolean | null;
    HasCouponCode?: boolean | null;
    OfferFilterType?: number | null;
    ItemId?: number | null;
    Barcode?: string | null;
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.Name = Name;
    this.Start = Start;
    this.End = End;
    this.DiscountType = DiscountType;
    this.IsActive = IsActive;
    this.HasCouponCode = HasCouponCode;
    this.OfferFilterType = OfferFilterType;
    this.ItemId = ItemId;
    this.Barcode = Barcode;
  }

  toURLSearchParams(): URLSearchParams {
    const params = new URLSearchParams();

    const paging = this.pagingParameters.toURLParams();
    Object.entries(paging).forEach(([k, v]) => params.set(k, v));

    if (this.Name !== null) params.set("Name", this.Name);
    if (this.Start !== null) params.set("Start", this.Start);
    if (this.End !== null) params.set("End", this.End);
    if (this.DiscountType !== null) params.set("DiscountType", String(this.DiscountType));
    if (this.IsActive !== null) params.set("IsActive", String(this.IsActive));
    if (this.HasCouponCode !== null) params.set("HasCouponCode", String(this.HasCouponCode));
    if (this.OfferFilterType !== null) params.set("OfferFilterType", String(this.OfferFilterType));
    if (this.ItemId !== null) params.set("ItemId", String(this.ItemId));
    if (this.Barcode !== null) params.set("Barcode", this.Barcode);

    return params;
  }

  toMap(): Record<string, any> {
    const map: Record<string, any> = {};
    Object.assign(map, this.pagingParameters.toURLParams());
    if (this.Name !== null) map.Name = this.Name;
    if (this.Start !== null) map.Start = this.Start;
    if (this.End !== null) map.End = this.End;
    if (this.DiscountType !== null) map.DiscountType = this.DiscountType;
    if (this.IsActive !== null) map.IsActive = this.IsActive;
    if (this.HasCouponCode !== null) map.HasCouponCode = this.HasCouponCode;
    if (this.OfferFilterType !== null) map.OfferFilterType = this.OfferFilterType;
    if (this.ItemId !== null) map.ItemId = this.ItemId;
    if (this.Barcode !== null) map.Barcode = this.Barcode;
    return map;
  }

  static fromURLSearchParams(params: URLSearchParams): OffersFilterParameters {
    const paging = new OfferPagingParameters({
      currentPage: params.get("CurrentPage") ? parseInt(params.get("CurrentPage")!) : 1,
      pageSize: params.get("PageSize") ? parseInt(params.get("PageSize")!) : 20,
      sortField: params.get("SortField") || null,
      currentSortField: params.get("CurrentSortField") || null,
      currentSortOrder: params.get("CurrentSortOrder") || null,
    });

    return new OffersFilterParameters({
      pagingParameters: paging,
      Name: params.get("Name") || null,
      Start: params.get("Start") || null,
      End: params.get("End") || null,
      DiscountType: params.get("DiscountType") ? parseInt(params.get("DiscountType")!) : null,
      IsActive: params.get("IsActive") ? params.get("IsActive") === "true" : null,
      HasCouponCode: params.get("HasCouponCode") ? params.get("HasCouponCode") === "true" : null,
      OfferFilterType: params.get("OfferFilterType") ? parseInt(params.get("OfferFilterType")!) : null,
      ItemId: params.get("ItemId") ? parseInt(params.get("ItemId")!) : null,
      Barcode: params.get("Barcode") || null,
    });
  }
}


