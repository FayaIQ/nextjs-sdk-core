/**
 * Order filter models and API integration
 * Based on the Orders/Paging API endpoint
 */

// ============= ENUMS =============

/**
 * Order type classification
 */
export enum OrderType {
  UnderAcceptance = 1,
  Conformed = 2,
  UnderPreparing = 3,
  Delivering = 4,
  Prepared = 5,
  Delivered = 6,
  Rejected = 7,
  Canceled = 8,
  Unknown = 9,
}

export enum PayType {
  None = 0,
  CashOnDelivery = 1,
  CashOnStore = 2,
  CashOnline = 3,
}

/**
 * Delivery method types
 */
export enum DeleveryType {
  None = 0,
  StorePickup = 1,
  HomeDelivery = 2,
}

/**
 * Sign/comparison operators for filtering
 */
export enum Sign {
  Equal = 0,
  NotEqual = 1,
  GreaterThan = 2,
  LessThan = 3,
  GreaterThanOrEqual = 4,
  LessThanOrEqual = 5,
}

// ============= PAGING PARAMETERS =============

/**
 * Paging and sorting configuration for orders
 */
export class OrderPagingParameters {
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

// ============= MAIN FILTER CLASS =============

/**
 * Comprehensive order filtering parameters
 */
export class OrdersFilterParameters {
  // Pagination
  pagingParameters: OrderPagingParameters;

  // Store and Menu
  storeId: number | null;
  menuId: number | null;

  // Date range
  dateFrom: string | null; 
  dateTo: string | null;
  startTime: string | null;
  endTime: string | null;

  // Status filters
  orderStatusId: number | null;
  orderStatusIds: number[] | null;
  isCanceled: boolean | null;
  isConfirmed: boolean | null;
  isRejected: boolean | null;
  isPrint: boolean | null;

  // Order identification
  number: number | null;
  referenceId: string | null;
  referenceDeliveryId: string | null;

  // Location filters
  locationId: number | null;
  countryId: number | null;
  cityId: number | null;
  districtId: number | null;
  buildingId: number | null;
  apartmentId: number | null;

  // Order type and payment
  orderType: OrderType | null;
  payType: PayType | null;
  DeleveryType: DeleveryType | null;

  // User and delegate
  username: string | null;
  customerId: string | null; // UUID
  delegateId: string | null; // UUID
  delegateWithCustomerId: string | null; // UUID
  statusChangedBy: string | null; // UUID

  // Currency and amount
  viewInMainCurrency: boolean | null;
  totalAmount: number | null;
  sign: Sign | null;

  // Offers and applications
  couponOfferId: string | null; // UUID
  applicationId: string | null; // UUID

  constructor({
    pagingParameters = new OrderPagingParameters(),
    storeId = null,
    menuId = null,
    dateFrom = null,
    dateTo = null,
    startTime = null,
    endTime = null,
    orderStatusId = null,
    orderStatusIds = null,
    isCanceled = null,
    isConfirmed = null,
    isRejected = null,
    isPrint = null,
    number = null,
    referenceId = null,
    referenceDeliveryId = null,
    locationId = null,
    countryId = null,
    cityId = null,
    districtId = null,
    buildingId = null,
    apartmentId = null,
    orderType = null,
    payType = null,
    DeleveryType = null,
    username = null,
    customerId = null,
    delegateId = null,
    delegateWithCustomerId = null,
    statusChangedBy = null,
    viewInMainCurrency = null,
    totalAmount = null,
    sign = null,
    couponOfferId = null,
    applicationId = null,
  }: {
    pagingParameters?: OrderPagingParameters;
    storeId?: number | null;
    menuId?: number | null;
    dateFrom?: string | null;
    dateTo?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    orderStatusId?: number | null;
    orderStatusIds?: number[] | null;
    isCanceled?: boolean | null;
    isConfirmed?: boolean | null;
    isRejected?: boolean | null;
    isPrint?: boolean | null;
    number?: number | null;
    referenceId?: string | null;
    referenceDeliveryId?: string | null;
    locationId?: number | null;
    countryId?: number | null;
    cityId?: number | null;
    districtId?: number | null;
    buildingId?: number | null;
    apartmentId?: number | null;
    orderType?: OrderType | null;
    payType?: PayType | null;
    DeleveryType?: DeleveryType | null;
    username?: string | null;
    customerId?: string | null;
    delegateId?: string | null;
    delegateWithCustomerId?: string | null;
    statusChangedBy?: string | null;
    viewInMainCurrency?: boolean | null;
    totalAmount?: number | null;
    sign?: Sign | null;
    couponOfferId?: string | null;
    applicationId?: string | null;
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.storeId = storeId;
    this.menuId = menuId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.startTime = startTime;
    this.endTime = endTime;
    this.orderStatusId = orderStatusId;
    this.orderStatusIds = orderStatusIds;
    this.isCanceled = isCanceled;
    this.isConfirmed = isConfirmed;
    this.isRejected = isRejected;
    this.isPrint = isPrint;
    this.number = number;
    this.referenceId = referenceId;
    this.referenceDeliveryId = referenceDeliveryId;
    this.locationId = locationId;
    this.countryId = countryId;
    this.cityId = cityId;
    this.districtId = districtId;
    this.buildingId = buildingId;
    this.apartmentId = apartmentId;
    this.orderType = orderType;
    this.payType = payType;
    this.DeleveryType = DeleveryType;
    this.username = username;
    this.customerId = customerId;
    this.delegateId = delegateId;
    this.delegateWithCustomerId = delegateWithCustomerId;
    this.statusChangedBy = statusChangedBy;
    this.viewInMainCurrency = viewInMainCurrency;
    this.totalAmount = totalAmount;
    this.sign = sign;
    this.couponOfferId = couponOfferId;
    this.applicationId = applicationId;
  }

  /**
   * Create a copy with updated parameters
   */
  copyWith(updates: Partial<OrdersFilterParameters>): OrdersFilterParameters {
    return new OrdersFilterParameters({
      pagingParameters: updates.pagingParameters || this.pagingParameters,
      storeId: updates.storeId !== undefined ? updates.storeId : this.storeId,
      menuId: updates.menuId !== undefined ? updates.menuId : this.menuId,
      dateFrom: updates.dateFrom !== undefined ? updates.dateFrom : this.dateFrom,
      dateTo: updates.dateTo !== undefined ? updates.dateTo : this.dateTo,
      startTime: updates.startTime !== undefined ? updates.startTime : this.startTime,
      endTime: updates.endTime !== undefined ? updates.endTime : this.endTime,
      orderStatusId: updates.orderStatusId !== undefined ? updates.orderStatusId : this.orderStatusId,
      orderStatusIds: updates.orderStatusIds !== undefined ? updates.orderStatusIds : this.orderStatusIds,
      isCanceled: updates.isCanceled !== undefined ? updates.isCanceled : this.isCanceled,
      isConfirmed: updates.isConfirmed !== undefined ? updates.isConfirmed : this.isConfirmed,
      isRejected: updates.isRejected !== undefined ? updates.isRejected : this.isRejected,
      isPrint: updates.isPrint !== undefined ? updates.isPrint : this.isPrint,
      number: updates.number !== undefined ? updates.number : this.number,
      referenceId: updates.referenceId !== undefined ? updates.referenceId : this.referenceId,
      referenceDeliveryId: updates.referenceDeliveryId !== undefined ? updates.referenceDeliveryId : this.referenceDeliveryId,
      locationId: updates.locationId !== undefined ? updates.locationId : this.locationId,
      countryId: updates.countryId !== undefined ? updates.countryId : this.countryId,
      cityId: updates.cityId !== undefined ? updates.cityId : this.cityId,
      districtId: updates.districtId !== undefined ? updates.districtId : this.districtId,
      buildingId: updates.buildingId !== undefined ? updates.buildingId : this.buildingId,
      apartmentId: updates.apartmentId !== undefined ? updates.apartmentId : this.apartmentId,
      orderType: updates.orderType !== undefined ? updates.orderType : this.orderType,
      payType: updates.payType !== undefined ? updates.payType : this.payType,
      DeleveryType: updates.DeleveryType !== undefined ? updates.DeleveryType : this.DeleveryType,
      username: updates.username !== undefined ? updates.username : this.username,
      customerId: updates.customerId !== undefined ? updates.customerId : this.customerId,
      delegateId: updates.delegateId !== undefined ? updates.delegateId : this.delegateId,
      delegateWithCustomerId: updates.delegateWithCustomerId !== undefined ? updates.delegateWithCustomerId : this.delegateWithCustomerId,
      statusChangedBy: updates.statusChangedBy !== undefined ? updates.statusChangedBy : this.statusChangedBy,
      viewInMainCurrency: updates.viewInMainCurrency !== undefined ? updates.viewInMainCurrency : this.viewInMainCurrency,
      totalAmount: updates.totalAmount !== undefined ? updates.totalAmount : this.totalAmount,
      sign: updates.sign !== undefined ? updates.sign : this.sign,
      couponOfferId: updates.couponOfferId !== undefined ? updates.couponOfferId : this.couponOfferId,
      applicationId: updates.applicationId !== undefined ? updates.applicationId : this.applicationId,
    });
  }

  /**
   * Convert to URL search parameters
   * FIXED: This is the key method that was causing the issue
   */
  toURLSearchParams(): URLSearchParams {
    const params = new URLSearchParams();

    // Add paging parameters directly (don't add pagingParameters as object!)
    const pagingParams = this.pagingParameters.toURLParams();
    Object.entries(pagingParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.set(key, value);
      }
    });

    // Add all filter parameters
    if (this.storeId !== null) params.set("StoreId", this.storeId.toString());
    if (this.menuId !== null) params.set("MenuId", this.menuId.toString());
    if (this.dateFrom !== null) params.set("DateFrom", this.dateFrom);
    if (this.dateTo !== null) params.set("DateTo", this.dateTo);
    if (this.startTime !== null) params.set("StartTime", this.startTime);
    if (this.endTime !== null) params.set("EndTime", this.endTime);
    if (this.orderStatusId !== null) params.set("OrderStatusId", this.orderStatusId.toString());
    
    // Handle array of order status IDs
    if (this.orderStatusIds !== null && this.orderStatusIds.length > 0) {
      this.orderStatusIds.forEach(id => params.append("OrderStatusIds", id.toString()));
    }

    if (this.isCanceled !== null) params.set("IsCancled", this.isCanceled.toString());
    if (this.isConfirmed !== null) params.set("IsConformed", this.isConfirmed.toString());
    if (this.isRejected !== null) params.set("IsRejected", this.isRejected.toString());
    if (this.isPrint !== null) params.set("IsPrint", this.isPrint.toString());
    if (this.number !== null) params.set("Number", this.number.toString());
    if (this.referenceId !== null) params.set("ReferenceId", this.referenceId);
    if (this.referenceDeliveryId !== null) params.set("ReferenceDeliveryId", this.referenceDeliveryId);
    if (this.locationId !== null) params.set("LocationId", this.locationId.toString());
    if (this.countryId !== null) params.set("CountryId", this.countryId.toString());
    if (this.cityId !== null) params.set("CityId", this.cityId.toString());
    if (this.districtId !== null) params.set("DistrictId", this.districtId.toString());
    if (this.buildingId !== null) params.set("BuildingId", this.buildingId.toString());
    if (this.apartmentId !== null) params.set("AppartmentId", this.apartmentId.toString());
    if (this.orderType !== null) params.set("OrderType", this.orderType.toString());
    if (this.payType !== null) params.set("PayType", this.payType.toString());
    if (this.DeleveryType !== null) params.set("DeleveryType", this.DeleveryType.toString());
    if (this.username !== null) params.set("Username", this.username);
    if (this.customerId !== null) params.set("CustomerId", this.customerId);
    if (this.delegateId !== null) params.set("DelagateId", this.delegateId);
    if (this.delegateWithCustomerId !== null) params.set("DelegateWithCustomerId", this.delegateWithCustomerId);
    if (this.statusChangedBy !== null) params.set("StatusChangedBy", this.statusChangedBy);
    if (this.viewInMainCurrency !== null) params.set("ViewInMainCurrency", this.viewInMainCurrency.toString());
    if (this.totalAmount !== null) params.set("TotalAmount", this.totalAmount.toString());
    if (this.sign !== null) params.set("Sign", this.sign.toString());
    if (this.couponOfferId !== null) params.set("CouponOfferId", this.couponOfferId);
    if (this.applicationId !== null) params.set("ApplicationId", this.applicationId);

    return params;
  }

  /**
   * Convert to plain object map
   */
  toMap(): Record<string, any> {
    const map: Record<string, any> = {};
    
    const pagingParams = this.pagingParameters.toURLParams();
    Object.assign(map, pagingParams);

    if (this.storeId !== null) map.StoreId = this.storeId;
    if (this.menuId !== null) map.MenuId = this.menuId;
    if (this.dateFrom !== null) map.DateFrom = this.dateFrom;
    if (this.dateTo !== null) map.DateTo = this.dateTo;
    if (this.startTime !== null) map.StartTime = this.startTime;
    if (this.endTime !== null) map.EndTime = this.endTime;
    if (this.orderStatusId !== null) map.OrderStatusId = this.orderStatusId;
    if (this.orderStatusIds !== null) map.OrderStatusIds = this.orderStatusIds;
    if (this.isCanceled !== null) map.IsCancled = this.isCanceled;
    if (this.isConfirmed !== null) map.IsConformed = this.isConfirmed;
    if (this.isRejected !== null) map.IsRejected = this.isRejected;
    if (this.isPrint !== null) map.IsPrint = this.isPrint;
    if (this.number !== null) map.Number = this.number;
    if (this.referenceId !== null) map.ReferenceId = this.referenceId;
    if (this.referenceDeliveryId !== null) map.ReferenceDeliveryId = this.referenceDeliveryId;
    if (this.locationId !== null) map.LocationId = this.locationId;
    if (this.countryId !== null) map.CountryId = this.countryId;
    if (this.cityId !== null) map.CityId = this.cityId;
    if (this.districtId !== null) map.DistrictId = this.districtId;
    if (this.buildingId !== null) map.BuildingId = this.buildingId;
    if (this.apartmentId !== null) map.AppartmentId = this.apartmentId;
    if (this.orderType !== null) map.OrderType = this.orderType;
    if (this.payType !== null) map.PayType = this.payType;
    if (this.DeleveryType !== null) map.DeleveryType = this.DeleveryType;
    if (this.username !== null) map.Username = this.username;
    if (this.customerId !== null) map.CustomerId = this.customerId;
    if (this.delegateId !== null) map.DelagateId = this.delegateId;
    if (this.delegateWithCustomerId !== null) map.DelegateWithCustomerId = this.delegateWithCustomerId;
    if (this.statusChangedBy !== null) map.StatusChangedBy = this.statusChangedBy;
    if (this.viewInMainCurrency !== null) map.ViewInMainCurrency = this.viewInMainCurrency;
    if (this.totalAmount !== null) map.TotalAmount = this.totalAmount;
    if (this.sign !== null) map.Sign = this.sign;
    if (this.couponOfferId !== null) map.CouponOfferId = this.couponOfferId;
    if (this.applicationId !== null) map.ApplicationId = this.applicationId;

    return map;
  }

  /**
   * Create filter from URL search parameters
   */
  static fromURLSearchParams(params: URLSearchParams): OrdersFilterParameters {
    const pagingParameters = new OrderPagingParameters({
      currentPage: params.get("CurrentPage") ? parseInt(params.get("CurrentPage")!) : 1,
      pageSize: params.get("PageSize") ? parseInt(params.get("PageSize")!) : 20,
      sortField: params.get("SortField") || null,
      currentSortField: params.get("CurrentSortField") || null,
      currentSortOrder: params.get("CurrentSortOrder") || null,
    });

    // Handle array of order status IDs
    const orderStatusIds = params.getAll("OrderStatusIds").map(id => parseInt(id));

    return new OrdersFilterParameters({
      pagingParameters,
      storeId: params.get("StoreId") ? parseInt(params.get("StoreId")!) : null,
      menuId: params.get("MenuId") ? parseInt(params.get("MenuId")!) : null,
      dateFrom: params.get("DateFrom") || null,
      dateTo: params.get("DateTo") || null,
      startTime: params.get("StartTime") || null,
      endTime: params.get("EndTime") || null,
      orderStatusId: params.get("OrderStatusId") ? parseInt(params.get("OrderStatusId")!) : null,
      orderStatusIds: orderStatusIds.length > 0 ? orderStatusIds : null,
      isCanceled: params.get("IsCancled") ? params.get("IsCancled") === "true" : null,
      isConfirmed: params.get("IsConformed") ? params.get("IsConformed") === "true" : null,
      isRejected: params.get("IsRejected") ? params.get("IsRejected") === "true" : null,
      isPrint: params.get("IsPrint") ? params.get("IsPrint") === "true" : null,
      number: params.get("Number") ? parseInt(params.get("Number")!) : null,
      referenceId: params.get("ReferenceId") || null,
      referenceDeliveryId: params.get("ReferenceDeliveryId") || null,
      locationId: params.get("LocationId") ? parseInt(params.get("LocationId")!) : null,
      countryId: params.get("CountryId") ? parseInt(params.get("CountryId")!) : null,
      cityId: params.get("CityId") ? parseInt(params.get("CityId")!) : null,
      districtId: params.get("DistrictId") ? parseInt(params.get("DistrictId")!) : null,
      buildingId: params.get("BuildingId") ? parseInt(params.get("BuildingId")!) : null,
      apartmentId: params.get("AppartmentId") ? parseInt(params.get("AppartmentId")!) : null,
      orderType: params.get("OrderType") ? parseInt(params.get("OrderType")!) as OrderType : null,
      payType: params.get("PayType") ? parseInt(params.get("PayType")!) as PayType : null,
      DeleveryType: params.get("DeleveryType") ? parseInt(params.get("DeleveryType")!) as DeleveryType : null,
      username: params.get("Username") || null,
      customerId: params.get("CustomerId") || null,
      delegateId: params.get("DelagateId") || null,
      delegateWithCustomerId: params.get("DelegateWithCustomerId") || null,
      statusChangedBy: params.get("StatusChangedBy") || null,
      viewInMainCurrency: params.get("ViewInMainCurrency") ? params.get("ViewInMainCurrency") === "true" : null,
      totalAmount: params.get("TotalAmount") ? parseFloat(params.get("TotalAmount")!) : null,
      sign: params.get("Sign") ? parseInt(params.get("Sign")!) as Sign : null,
      couponOfferId: params.get("CouponOfferId") || null,
      applicationId: params.get("ApplicationId") || null,
    });
  }
}

// Interfaces remain the same...
export interface CurrentPhase {
  orderPhaseID: number;
  statusID: number;
  status: string;
  status_en: string;
  time: string;
  username: string;
  note: string | null;
}

export interface OrderAddress {
  id: number;
  gps: string;
  distance: number;
  country: { id: number; name: string; name_en: string };
  city: { id: number; name: string; name_en: string };
  district: { id: number; name: string; name_en: string };
  building: string | null;
  appartmentNumber: string | null;
  note: string;
}

export interface OrdersApiResponse {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  sortField: string;
  currentSortField: string;
  currentSortOrder: string;
  nextSortOrder: string;
  results: Order[];
}

export interface OrderCustomer {
  id: string;
  username: string;
  fullName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  gender: number;
  birthdate: string;
  address: OrderAddress;
}

export interface OrderClient {
  id: string;
  name: string;
  storeId: number;
  locationId: number;
  address: string | null;
  addressId: number;
  email: string;
  phoneCode: string | null;
  phoneNumber: string;
  createdBy: string | null;
  isApproved: boolean;
  isAddedByAdmin: boolean;
  isPublic: boolean;
  clientTypeId: string;
  clientType: unknown | null;
  classId: string;
  class: unknown | null;
}

export interface OrderItem {
  orderItemID: number;
  itemID: number;
  price: number;
  total: number;
  quantity: number;
  discountType?: number;
  payType: number;
  offerDesc?: string;
  isCanceled: boolean;
  note?: string | null;
  
  itemInfo: {
    name: string;
    nameSecondary: string | null;
    iconPath: string;
    picturePath: string;
    barcode: string;
    code: string | null;
  };
  collectionInfo?: {
    color?: {
      code: string;
      colorName: string;
      secondaryColorName?: string;
      picturePath?: string;
      iconPath?: string;
      isDefault?: boolean | null;
      syncThirdPartyId?: string | null;
    };
    size?: {
      val1: string;
    };
  };
}

export interface Order {
  orderID: number;
  orderNo: number;
  orderDate: string;
  total: number;
  orderType: number;
  payType: number;
  deleveryType: number;
  deliveryPrice: number;
  orderDeleveryDate: string | null;
  orderPhaseID: number;
  coupanCode?: string | undefined;
  storeId: string | null;
  storeName?: string | null;
  discountType?: number | null;
  discountValue?: string | number;
  totalAmount: number;
  referenceId?: string | null;
  latestOrderStatus: number;
  currentPhase: CurrentPhase;
  currencyExchangeRateHistory?: null;
  isRejected?: boolean;
  rejectionNote?: string | null;
  laserNote?: string | null;
  giftNote?: string | null;
  customer?: OrderCustomer;
  client?: OrderClient | null;
  address?: OrderAddress;
  orderItems?: OrderItem[];
  orderPhases?: CurrentPhase[];
  paymentStatus?: string;
  couponOffer?: {
    name: string;
    couponCode: string;
    discountType: number;
    discountValue: number;
  };
}

export interface OrderDetail {
  orderID: number;
  orderDate: string;
  orderDeleveryDate: string | null;
  orderNo: number;
  total: number;
  deliveryPrice: number;
  totalAmount: number;
  orderType: number;
  payType: number;
  deleveryType: number;
  orderPhaseID: number;
  storeId: string | null;
  latestOrderStatus: number;
  currentPhase: CurrentPhase;
  discountType?: number | null;
  discountValue?: string | number | undefined;
  isRejected?: boolean;
  rejectionNote?: string | null;
  laserNote?: string | null;
  giftNote?: string | null;
  customer?: OrderCustomer;
  client?: OrderClient | null;
  address?: OrderAddress;
  orderItems?: OrderItem[];
  orderPhases: CurrentPhase[];
  referenceId?: string | null;
  referenceDeliveryId?: string | null;
  gatewayType?: number;
  paymentStatus?: string;
  couponOffer?: {
    name?: string;
    couponCode?: string;
    discountType?: number;
    discountValue?: number;
  };
}

// === POST Order request models ===
export interface PostOrderItemRequest {
  itemId: number;
  quantity: number;
  freeQuantity?: number;
  discount?: number;
  colorId?: number | null;
  sizeId?: number | null;
  unitLevel?: number;
  note?: string | null;
  costPrice?: number | null;
  price?: number | null;
  pricePack1?: number | null;
  pricePack2?: number | null;
}

export interface PostOrderAddressRequest {
  gps?: string | null;
  districtId?: number | null;
  note?: string | null;
  appartmentId?: number | null;
}

export interface PostOrderRequest {
  storeId?: number;
  address?: PostOrderAddressRequest | null;
  orderType?: number;
  payType?: number;
  gatewayType?: number;
  deleveryType?: number;
  orderDeleveryDate?: string | null;
  note?: string | null;
  currencyId?: number;
  couponCode?: string | null;
  laserNote?: string | null;
  giftNote?: string | null;
  clientId?: string | null;
  paymentTokenId?: string | null;
  points?: number;
  applyDarkOffer?: boolean;
  orderItems?: PostOrderItemRequest[];
}