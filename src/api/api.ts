export class Api {
  private static LOCAL_BASE = "http://localhost:3000";
  private static IDENTITY_BASE = `https://storeak-identity-service.azurewebsites.net/api`;
  private static NEWS_BASE = `https://storeak-news-service.azurewebsites.net/api`;
  private static STORES_BASE = `https://storeak-stores-service.azurewebsites.net/api`;
  private static GPS_BASE = `https://storeak-gps-service.azurewebsites.net/api`;
  private static THEME_BASE = `https://storeak-Theme-service.azurewebsites.net/api`;
  private static INVENTORY_BASE = `https://storeak-inventory-service.azurewebsites.net/api`;
  private static CRM_BASE = `https://storeak-crm-service.azurewebsites.net/api`;
  public static IDENTITY_URL = `https://storeak-identity-service.azurewebsites.net/api`;

  static signIn: string = `${Api.IDENTITY_BASE}/v1/token`;
  static refreshToken: string = `${Api.IDENTITY_BASE}/v1/token/refresh`;
  static sessionLogout: string = `${Api.IDENTITY_BASE}/v1/session/logout`;
  static clearCart: string = `${Api.INVENTORY_BASE}/v1/Carts/Clear`;
  static getUserInfo: string = `${Api.IDENTITY_BASE}/v1/Users`;
  static postUserInfo: string = `${Api.IDENTITY_BASE}/v1/Users`;
  static putUserInfo: string = `${Api.IDENTITY_BASE}/v1/Users`;
  static patchUserInfo: string = `${Api.IDENTITY_BASE}/v1/Users`;
  static putUserAvatar: string = `${Api.IDENTITY_BASE}/v1/Users/avatar`;
  static putUserPassword: string = `${Api.IDENTITY_BASE}/v1/Users/password`;
  static getUserPreferences: string = `${Api.IDENTITY_BASE}/v1/Users/preferences`;
  static putUserPreferences: string = `${Api.IDENTITY_BASE}/v1/Users/preferences`;

  static phoneVerificationSend: string = `${Api.IDENTITY_BASE}/v1/verification/phone/send`;
  static phoneVerificationVerify: string = `${Api.IDENTITY_BASE}/v1/verification/phone/verify`;

  // Other services
  static getProducts: string = `${Api.INVENTORY_BASE}/v1/Items/Paging/Mobile`;
  static getItemsPaging: string = `${Api.INVENTORY_BASE}/v2/Items/Paging`;
  static getProductInfo(id: string): string {
    return `${Api.INVENTORY_BASE}/v1/Items/${id}/FullInfo`;
  }
    static getProductInfoV2(id: string): string {
    return `${Api.INVENTORY_BASE}/v2/Items/${id}/FullInfo`;
  }
  static getMenus: string = `${Api.INVENTORY_BASE}/v1/Menus/Search/true`;
  static getMenusDropdown: string = `${Api.INVENTORY_BASE}/v1/Menus/Dropdown`;
  static getMenuById(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Menus/${id}`;
  }
  // Offers endpoints
  static getOffersPaging: string = `${Api.INVENTORY_BASE}/v1/Offers/Paging`;
  static getOfferById(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}`;
  }
  static deleteOffer(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}`;
  }
  static getOffersCustomerItemLoggedIn: string = `${Api.INVENTORY_BASE}/v1/Offers/CustomerItem/LoggedIn`;
  static getStoreInvoiceDiscount(storeId: string | number, coupon: string): string {
    return `${Api.STORES_BASE}/v1/Stores/${storeId}/Offers/InvoiceDiscount/${encodeURIComponent(String(coupon))}`;
  }
  static getDeliveryZoneDiscount(deliveryZoneId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/DeliveryZoneDiscount/${deliveryZoneId}`;
  }
  static getOffersItemsDropdown: string = `${Api.INVENTORY_BASE}/v1/Offers/Items/DropDown`;
  static getOffersSlideShowsDropdown: string = `${Api.INVENTORY_BASE}/v1/Offers/SlideShows/DropDown`;
  static getOffersItemsStores: string = `${Api.INVENTORY_BASE}/v1/Offers/Items/Stores`;
  static getOffersPointsDropdown: string = `${Api.INVENTORY_BASE}/v1/Offers/Points/DropDown`;
  static getOffersNewsDropdown: string = `${Api.INVENTORY_BASE}/v1/Offers/News/DropDown`;
  static getOffersCouponsDropdown: string = `${Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
  static postOffersItemsDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/ItemsDiscount`;
  static postOffersAddItemsByFilter(offerId: string | number, forceUpdate: boolean | string): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${offerId}/AddItemsByFilter/${encodeURIComponent(String(forceUpdate))}`;
  }
  static postOffersDeliveryZones(offerId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${offerId}/DeliveryZones`;
  }
  static getOffersGroups(offerId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups`;
  }
  static putOffersGroup(offerId: string | number, id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups/${id}`;
  }

  static deleteOffersGroup(offerId: string | number, id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups/${id}`;
  }
  static postOffersItemsDiscountCustomers: string = `${Api.INVENTORY_BASE}/v1/Offers/ItemsDiscount/Customers`;
  static postOffersExtraItemDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/ExtraItemDiscount`;
  static postOffersCustomerDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/CustomerDiscount`;
  static postOffersInvoiceDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount`;
  static postOffersMultiCouponDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/MultiCouponDiscount`;
  static postOffersShippingDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/ShippingDiscount`;
  static postOffersPointDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/PointDiscount`;
  static postOffersItemCollectionDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/ItemCollectionDiscount`;
  static postOffersDarkDiscount: string = `${Api.INVENTORY_BASE}/v1/Offers/DarkDiscount`;
  static putOffersCustomerDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/CustomerDiscount`;
  }
  static putOffersExtraItemDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/ExtraItemDiscount`;
  }
  static putOffersInvoiceDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/InvoiceDiscount`;
  }
  static putOffersItemsDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/ItemsDiscount`;
  }
  static putOffersItemsDiscountCustomers(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/ItemsDiscount/Customers`;
  }
  static putOffersShippingDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/ShippingDiscount`;
  }
  static putOffersPointDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/PointDiscount`;
  }
  static putOffersItemCollectionDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/ItemCollectionDiscount`;
  }
  static putOffersMultiCouponDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/MultiCouponDiscount`;
  }
  static putOffersDarkDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Offers/${id}/DarkDiscount`;
  }
  static getOffersCustomers: string = `${Api.INVENTORY_BASE}/v1/Offers/Customers`;
  static getCouponOffers: string = `${Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
  static getBranches: string = `${Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
  static getBrands: string = `${Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
  static getWishes: string = `${Api.INVENTORY_BASE}/v1/wishes/paging`;
  static getOrders: string = `${Api.INVENTORY_BASE}/v1/Orders/Paging`;
  // CRM - Clients
  static getClientsPaging: string = `${Api.CRM_BASE}/v1/Clients/Paging`;
  static getClients: string = `${Api.CRM_BASE}/v1/Clients`;
  static postClients: string = `${Api.CRM_BASE}/v1/Clients`;
  static postOrders: string = `${Api.INVENTORY_BASE}/v2/Orders`;
  static getStoreInfo: string = `${Api.STORES_BASE}/v1/Stores/Info`;
  static getCities: string = `${Api.GPS_BASE}/v1/Locations`;
  static getDeliveryZones: string = `${Api.GPS_BASE}/v1/DeliveryZones`;
  static getReportsCustomerOrders: string = `${Api.INVENTORY_BASE}/v1/Reports/CustomerOrders`;
  static getReportsOrderSales: string = `${Api.INVENTORY_BASE}/v1/Reports/OrderSales`;
  // Payments endpoints
  static getStorePayments(storeId: string | number): string {
    return `${Api.STORES_BASE}/v1/Stores/${storeId}/Payments`;
  }
  static getPayment(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Payments/${id}`;
  }
  static putPayment(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Payments/${id}`;
  }
  static deletePayment(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Payments/${id}`;
  }
  static postPayments: string = `${Api.INVENTORY_BASE}/v1/Payments`;
  static getPayments: string = `${Api.INVENTORY_BASE}/v1/Payments`;
  static getPaymentsReport: string = `${Api.INVENTORY_BASE}/v1/Payments/Report`;
  static getSlideShows: string = `${Api.THEME_BASE}/v1/SlideShows/Paging`;

  static getItemById(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v3/Items/${id}`;
  }
  // Dynamic endpoints with IDs

  // Wishlist endpoints (lowercase per spec)
  static postWish(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/items/${id}/wish`;
  }

  static deleteWish(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/items/${id}/unwish`;
  }

  static getCategoryProducts(id: string): string {
    return `${Api.INVENTORY_BASE}/v1/Items/Paging/Mobile?CurrentPage=1&PageSize=1000&menuId=${id}`;
  }

  static getOrder(id: string): string {
    return `${Api.INVENTORY_BASE}/v3/Orders/${id}`;
  }

  static getAddress(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Addresses/${id}`;
  }

  // Order item endpoints (v3)
  static getOrderItem(orderId: string | number, itemId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${orderId}/Items/${itemId}`;
  }

  static postOrderItem(orderId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems`;
  }

  static putOrderItemCancel(orderId: string | number, itemId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/cancel`;
  }

  static putOrderItemUndoCancel(orderId: string | number, itemId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/UndoCancel`;
  }

  static putOrderItemUpdate(orderId: string | number, itemId: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/update`;
  }

  // orders endpoints

  static getOrderFullInfo = `${Api.INVENTORY_BASE}/v1/Orders/List/FullInfo`;

  static putOrderApprove(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/ApproveDeliveryOrder`;
  }

  static putOrderApproveList: string = `${Api.INVENTORY_BASE}/v1/Orders/ApproveDeliveryOrder/List`;

  static putOrderDisapprove(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/DisapproveDeliveryOrder`;
  }

  static putOrderDisapproveList: string = `${Api.INVENTORY_BASE}/v1/Orders/DisapproveDeliveryOrder/List`;

  static putChangeStatusOrder(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/ChangeDeliveryOrderStatus`;
  }



  static cancelOrder(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/Cancel`;
  }

  static getOrdersDelagates(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
  }

  static postOrdersDelagates(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
  }

  static putOrdersDelagatesLoggedIn(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates/LoggedInUser`;
  }

  static postOrderDelagatesList = `${Api.INVENTORY_BASE}/v1/Orders/Delagates/List`;

  static deleteDelagate(
    orderId: string | number,
    delegateId: string | number
  ): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${orderId}/Delagates/${delegateId}`;
  }

  static putOrderDiscount(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/Discount`;
  }

  static putOrderReferenceId(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceId`;
  }

  static putOrderReferenceDeliveryId(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceDeliveryId`;
  }


  // category 

  static getCatigories: string = `${Api.INVENTORY_BASE}/v1/Categories/Dropdown`;
  // identity 
  static getApplicationsStores: string = `${Api.IDENTITY_BASE}/v1/Applications/Store/DropDown`;
  static getCustomersDropdown: string = `${Api.IDENTITY_BASE}/v1/Users/Customers/DropDown`;

  static getItemsSource: string = `${Api.INVENTORY_BASE}/v1/StoreItemSources/Dropdown`;
  /////////////////////////////////////////
  //GPS 


  static getCountries: string = `${Api.GPS_BASE}/v1/Locations/Countries/Dropdown`;

static getParentProducts: string = `${Api.INVENTORY_BASE}/v1/Items/ParentStore/Paging`;
  
  // Items copy endpoints
  static postCopyParentStore : string = `${Api.INVENTORY_BASE}/v1/Items/Copy/ParentStore`;

  // Item activation endpoints
  static putItemActivate(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Items/${id}/Activate`;
  }

  static putItemDeactivate(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Items/${id}/Deactivate`;
  }

  // Item update endpoint
  static putItem(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v3/Items/${id}`;
  }
  static deleteItem(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Items/${id}`;
  }


static getLocationChildren(parentId: string | number): string {
    return `${Api.GPS_BASE}/v1/Locations/${parentId}/Children/Dropdown`;
  }


  //
  static getInvoiceDiscount(code: string): string {
    const clean = encodeURIComponent(code);
    return `${Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount/${clean}`;
  }

  static getCheckoutQuote: string = `${Api.INVENTORY_BASE}/v1/Checkout/Quote`;

  // Cart endpoints
  static getCurrentCart: string = `${Api.INVENTORY_BASE}/v1/Carts/Current`;
  static postCartItems: string = `${Api.INVENTORY_BASE}/v1/Carts/Items`;
  static patchCartItem(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
      String(id)
    )}`;
  }
  static deleteCartItem(id: string | number): string {
    return `${Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
      String(id)
    )}`;
  }
}
