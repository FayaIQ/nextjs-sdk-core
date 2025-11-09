// src/inventory/orders/getOrders.ts
async function getOrders({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-HKQGA2FY.js");
    const { default: getToken } = await import("./token-JM35RI33.js");
    const { Api } = await import("./api-2XXZYWI5.js");
    const token = await getToken();
    return getWithAuth(
      `${Api.getOrders}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/orders?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/order-models.ts
var OrderType = /* @__PURE__ */ ((OrderType2) => {
  OrderType2[OrderType2["UnderAcceptance"] = 1] = "UnderAcceptance";
  OrderType2[OrderType2["Conformed"] = 2] = "Conformed";
  OrderType2[OrderType2["UnderPreparing"] = 3] = "UnderPreparing";
  OrderType2[OrderType2["Delivering"] = 4] = "Delivering";
  OrderType2[OrderType2["Prepared"] = 5] = "Prepared";
  OrderType2[OrderType2["Delivered"] = 6] = "Delivered";
  OrderType2[OrderType2["Rejected"] = 7] = "Rejected";
  OrderType2[OrderType2["Canceled"] = 8] = "Canceled";
  OrderType2[OrderType2["Unknown"] = 9] = "Unknown";
  return OrderType2;
})(OrderType || {});
var PayType = /* @__PURE__ */ ((PayType2) => {
  PayType2[PayType2["None"] = 0] = "None";
  PayType2[PayType2["CashOnDelivery"] = 1] = "CashOnDelivery";
  PayType2[PayType2["CashOnStore"] = 2] = "CashOnStore";
  PayType2[PayType2["CashOnline"] = 3] = "CashOnline";
  return PayType2;
})(PayType || {});
var DeleveryType = /* @__PURE__ */ ((DeleveryType2) => {
  DeleveryType2[DeleveryType2["None"] = 0] = "None";
  DeleveryType2[DeleveryType2["StorePickup"] = 1] = "StorePickup";
  DeleveryType2[DeleveryType2["HomeDelivery"] = 2] = "HomeDelivery";
  return DeleveryType2;
})(DeleveryType || {});
var Sign = /* @__PURE__ */ ((Sign2) => {
  Sign2[Sign2["Equal"] = 0] = "Equal";
  Sign2[Sign2["NotEqual"] = 1] = "NotEqual";
  Sign2[Sign2["GreaterThan"] = 2] = "GreaterThan";
  Sign2[Sign2["LessThan"] = 3] = "LessThan";
  Sign2[Sign2["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
  Sign2[Sign2["LessThanOrEqual"] = 5] = "LessThanOrEqual";
  return Sign2;
})(Sign || {});
var OrderPagingParameters = class {
  constructor({
    currentPage = 1,
    pageSize = 20,
    sortField = null,
    currentSortField = null,
    currentSortOrder = null
  } = {}) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.currentSortField = currentSortField;
    this.currentSortOrder = currentSortOrder;
  }
  toURLParams() {
    const params = {
      CurrentPage: this.currentPage.toString(),
      PageSize: this.pageSize.toString()
    };
    if (this.sortField) params.SortField = this.sortField;
    if (this.currentSortField) params.CurrentSortField = this.currentSortField;
    if (this.currentSortOrder) params.CurrentSortOrder = this.currentSortOrder;
    return params;
  }
};
var OrdersFilterParameters = class _OrdersFilterParameters {
  // UUID
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
    DeleveryType: DeleveryType2 = null,
    username = null,
    customerId = null,
    delegateId = null,
    delegateWithCustomerId = null,
    statusChangedBy = null,
    viewInMainCurrency = null,
    totalAmount = null,
    sign = null,
    couponOfferId = null,
    applicationId = null
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
    this.DeleveryType = DeleveryType2;
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
  copyWith(updates) {
    return new _OrdersFilterParameters({
      pagingParameters: updates.pagingParameters || this.pagingParameters,
      storeId: updates.storeId !== void 0 ? updates.storeId : this.storeId,
      menuId: updates.menuId !== void 0 ? updates.menuId : this.menuId,
      dateFrom: updates.dateFrom !== void 0 ? updates.dateFrom : this.dateFrom,
      dateTo: updates.dateTo !== void 0 ? updates.dateTo : this.dateTo,
      startTime: updates.startTime !== void 0 ? updates.startTime : this.startTime,
      endTime: updates.endTime !== void 0 ? updates.endTime : this.endTime,
      orderStatusId: updates.orderStatusId !== void 0 ? updates.orderStatusId : this.orderStatusId,
      orderStatusIds: updates.orderStatusIds !== void 0 ? updates.orderStatusIds : this.orderStatusIds,
      isCanceled: updates.isCanceled !== void 0 ? updates.isCanceled : this.isCanceled,
      isConfirmed: updates.isConfirmed !== void 0 ? updates.isConfirmed : this.isConfirmed,
      isRejected: updates.isRejected !== void 0 ? updates.isRejected : this.isRejected,
      isPrint: updates.isPrint !== void 0 ? updates.isPrint : this.isPrint,
      number: updates.number !== void 0 ? updates.number : this.number,
      referenceId: updates.referenceId !== void 0 ? updates.referenceId : this.referenceId,
      referenceDeliveryId: updates.referenceDeliveryId !== void 0 ? updates.referenceDeliveryId : this.referenceDeliveryId,
      locationId: updates.locationId !== void 0 ? updates.locationId : this.locationId,
      countryId: updates.countryId !== void 0 ? updates.countryId : this.countryId,
      cityId: updates.cityId !== void 0 ? updates.cityId : this.cityId,
      districtId: updates.districtId !== void 0 ? updates.districtId : this.districtId,
      buildingId: updates.buildingId !== void 0 ? updates.buildingId : this.buildingId,
      apartmentId: updates.apartmentId !== void 0 ? updates.apartmentId : this.apartmentId,
      orderType: updates.orderType !== void 0 ? updates.orderType : this.orderType,
      payType: updates.payType !== void 0 ? updates.payType : this.payType,
      DeleveryType: updates.DeleveryType !== void 0 ? updates.DeleveryType : this.DeleveryType,
      username: updates.username !== void 0 ? updates.username : this.username,
      customerId: updates.customerId !== void 0 ? updates.customerId : this.customerId,
      delegateId: updates.delegateId !== void 0 ? updates.delegateId : this.delegateId,
      delegateWithCustomerId: updates.delegateWithCustomerId !== void 0 ? updates.delegateWithCustomerId : this.delegateWithCustomerId,
      statusChangedBy: updates.statusChangedBy !== void 0 ? updates.statusChangedBy : this.statusChangedBy,
      viewInMainCurrency: updates.viewInMainCurrency !== void 0 ? updates.viewInMainCurrency : this.viewInMainCurrency,
      totalAmount: updates.totalAmount !== void 0 ? updates.totalAmount : this.totalAmount,
      sign: updates.sign !== void 0 ? updates.sign : this.sign,
      couponOfferId: updates.couponOfferId !== void 0 ? updates.couponOfferId : this.couponOfferId,
      applicationId: updates.applicationId !== void 0 ? updates.applicationId : this.applicationId
    });
  }
  /**
   * Convert to URL search parameters
   * FIXED: This is the key method that was causing the issue
   */
  toURLSearchParams() {
    const params = new URLSearchParams();
    const pagingParams = this.pagingParameters.toURLParams();
    Object.entries(pagingParams).forEach(([key, value]) => {
      if (value !== null && value !== void 0) {
        params.set(key, value);
      }
    });
    if (this.storeId !== null) params.set("StoreId", this.storeId.toString());
    if (this.menuId !== null) params.set("MenuId", this.menuId.toString());
    if (this.dateFrom !== null) params.set("DateFrom", this.dateFrom);
    if (this.dateTo !== null) params.set("DateTo", this.dateTo);
    if (this.startTime !== null) params.set("StartTime", this.startTime);
    if (this.endTime !== null) params.set("EndTime", this.endTime);
    if (this.orderStatusId !== null) params.set("OrderStatusId", this.orderStatusId.toString());
    if (this.orderStatusIds !== null && this.orderStatusIds.length > 0) {
      this.orderStatusIds.forEach((id) => params.append("OrderStatusIds", id.toString()));
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
  toMap() {
    const map = {};
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
  static fromURLSearchParams(params) {
    const pagingParameters = new OrderPagingParameters({
      currentPage: params.get("CurrentPage") ? parseInt(params.get("CurrentPage")) : 1,
      pageSize: params.get("PageSize") ? parseInt(params.get("PageSize")) : 20,
      sortField: params.get("SortField") || null,
      currentSortField: params.get("CurrentSortField") || null,
      currentSortOrder: params.get("CurrentSortOrder") || null
    });
    const orderStatusIds = params.getAll("OrderStatusIds").map((id) => parseInt(id));
    return new _OrdersFilterParameters({
      pagingParameters,
      storeId: params.get("StoreId") ? parseInt(params.get("StoreId")) : null,
      menuId: params.get("MenuId") ? parseInt(params.get("MenuId")) : null,
      dateFrom: params.get("DateFrom") || null,
      dateTo: params.get("DateTo") || null,
      startTime: params.get("StartTime") || null,
      endTime: params.get("EndTime") || null,
      orderStatusId: params.get("OrderStatusId") ? parseInt(params.get("OrderStatusId")) : null,
      orderStatusIds: orderStatusIds.length > 0 ? orderStatusIds : null,
      isCanceled: params.get("IsCancled") ? params.get("IsCancled") === "true" : null,
      isConfirmed: params.get("IsConformed") ? params.get("IsConformed") === "true" : null,
      isRejected: params.get("IsRejected") ? params.get("IsRejected") === "true" : null,
      isPrint: params.get("IsPrint") ? params.get("IsPrint") === "true" : null,
      number: params.get("Number") ? parseInt(params.get("Number")) : null,
      referenceId: params.get("ReferenceId") || null,
      referenceDeliveryId: params.get("ReferenceDeliveryId") || null,
      locationId: params.get("LocationId") ? parseInt(params.get("LocationId")) : null,
      countryId: params.get("CountryId") ? parseInt(params.get("CountryId")) : null,
      cityId: params.get("CityId") ? parseInt(params.get("CityId")) : null,
      districtId: params.get("DistrictId") ? parseInt(params.get("DistrictId")) : null,
      buildingId: params.get("BuildingId") ? parseInt(params.get("BuildingId")) : null,
      apartmentId: params.get("AppartmentId") ? parseInt(params.get("AppartmentId")) : null,
      orderType: params.get("OrderType") ? parseInt(params.get("OrderType")) : null,
      payType: params.get("PayType") ? parseInt(params.get("PayType")) : null,
      DeleveryType: params.get("DeleveryType") ? parseInt(params.get("DeleveryType")) : null,
      username: params.get("Username") || null,
      customerId: params.get("CustomerId") || null,
      delegateId: params.get("DelagateId") || null,
      delegateWithCustomerId: params.get("DelegateWithCustomerId") || null,
      statusChangedBy: params.get("StatusChangedBy") || null,
      viewInMainCurrency: params.get("ViewInMainCurrency") ? params.get("ViewInMainCurrency") === "true" : null,
      totalAmount: params.get("TotalAmount") ? parseFloat(params.get("TotalAmount")) : null,
      sign: params.get("Sign") ? parseInt(params.get("Sign")) : null,
      couponOfferId: params.get("CouponOfferId") || null,
      applicationId: params.get("ApplicationId") || null
    });
  }
};

export {
  getOrders,
  OrderType,
  PayType,
  DeleveryType,
  Sign,
  OrderPagingParameters,
  OrdersFilterParameters
};
