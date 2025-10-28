export class Api {
  private static LOCAL_BASE = "http://localhost:3000";
  private static IDENTITY_BASE = `https://storeak-identity-service.azurewebsites.net/api`;
  private static NEWS_BASE = `https://storeak-news-service.azurewebsites.net/api`;
  private static STORES_BASE = `https://storeak-stores-service.azurewebsites.net/api`;
  private static GPS_BASE = `https://storeak-gps-service.azurewebsites.net/api`;
  private static THEME_BASE = `https://storeak-Theme-service.azurewebsites.net/api`;
  private static INVENTORY_BASE = `https://storeak-inventory-service.azurewebsites.net/api`;
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
  static getProductInfo(id: string): string {
    return `${Api.INVENTORY_BASE}/v1/Items/${id}/FullInfo`;
  }
  static getMenus: string = `${Api.INVENTORY_BASE}/v1/Menus/Search/true`;
  static getMenusDropdown: string = `${Api.INVENTORY_BASE}/v1/Menus/Dropdown`;
  static getCouponOffers: string = `${Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
  static getBranches: string = `${Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
  static getBrands: string = `${Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
  static getWishes: string = `${Api.INVENTORY_BASE}/v1/wishes/paging`;
  static getOrders: string = `${Api.INVENTORY_BASE}/v1/Orders/Paging`;
  static postOrders: string = `${Api.INVENTORY_BASE}/v2/Orders`;
  static getStoreInfo: string = `${Api.STORES_BASE}/v1/Stores/Info`;
  static getCities: string = `${Api.GPS_BASE}/v1/Locations`;
  static getDeliveryZones: string = `${Api.GPS_BASE}/v1/DeliveryZones`;
  static getSlideShows: string = `${Api.THEME_BASE}/v1/SlideShows/Paging`;

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

  static getItemsSource: string = `${Api.INVENTORY_BASE}/v1/StoreItemSources/Dropdown`;
  /////////////////////////////////////////
  //GPS 


  static getCountries: string = `${Api.GPS_BASE}/v1/Locations/Countries/Dropdown`;


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
