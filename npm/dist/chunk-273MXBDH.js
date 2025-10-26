// src/api/api.ts
var _Api = class _Api {
  // Dynamic endpoints with IDs
  static getProductInfo(id) {
    return `${_Api.INVENTORY_BASE}/v1/Items/${id}/FullInfo`;
  }
  // Wishlist endpoints (lowercase per spec)
  static postWish(id) {
    return `${_Api.INVENTORY_BASE}/v1/items/${id}/wish`;
  }
  static deleteWish(id) {
    return `${_Api.INVENTORY_BASE}/v1/items/${id}/unwish`;
  }
  static getCategoryProducts(id) {
    return `${_Api.INVENTORY_BASE}/v1/Items/Paging/Mobile?CurrentPage=1&PageSize=1000&menuId=${id}`;
  }
  static getOrder(id) {
    return `${_Api.INVENTORY_BASE}/v3/Orders/${id}`;
  }
  static putOrderApprove(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}ApproveDeliveryOrder`;
  }
  static putOrderApproveList() {
    return `${_Api.INVENTORY_BASE}/v1/Orders/ApproveDeliveryOrder/List`;
  }
  static putOrderDisapprove(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}DisapproveDeliveryOrder`;
  }
  static putOrderDisapproveList() {
    return `${_Api.INVENTORY_BASE}/v1/Orders/DisapproveDeliveryOrder/List`;
  }
  static putChangeStatusOrder(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ChangeDeliveryOrderStatus`;
  }
  static cancelOrder(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Cancel`;
  }
  static getOrdersDelagates(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
  }
  static postOrdersDelagates(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
  }
  static putOrdersDelagatesLoggedIn(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates/LoggedInUser`;
  }
  static deleteDelagate(orderId, delegateId) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Delagates/${delegateId}`;
  }
  static putOrderDiscount(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Discount`;
  }
  static putOrderReferenceId(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceId`;
  }
  static putOrderReferenceDeliveryId(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceDeliveryId`;
  }
  /////////////////////////////////////////
  //
  static getInvoiceDiscount(code) {
    const clean = encodeURIComponent(code);
    return `${_Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount/${clean}`;
  }
  static patchCartItem(id) {
    return `${_Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
      String(id)
    )}`;
  }
  static deleteCartItem(id) {
    return `${_Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
      String(id)
    )}`;
  }
};
_Api.LOCAL_BASE = "http://localhost:3000";
_Api.IDENTITY_BASE = `https://storeak-identity-service.azurewebsites.net/api`;
_Api.NEWS_BASE = `https://storeak-news-service.azurewebsites.net/api`;
_Api.STORES_BASE = `https://storeak-stores-service.azurewebsites.net/api`;
_Api.GPS_BASE = `https://storeak-gps-service.azurewebsites.net/api`;
_Api.THEME_BASE = `https://storeak-Theme-service.azurewebsites.net/api`;
_Api.INVENTORY_BASE = `https://storeak-inventory-service.azurewebsites.net/api`;
_Api.IDENTITY_URL = `https://storeak-identity-service.azurewebsites.net/api`;
_Api.signIn = `${_Api.IDENTITY_BASE}/v1/token`;
_Api.refreshToken = `${_Api.IDENTITY_BASE}/v1/token/refresh`;
_Api.sessionLogout = `${_Api.IDENTITY_BASE}/v1/session/logout`;
_Api.clearCart = `${_Api.INVENTORY_BASE}/v1/Carts/Clear`;
_Api.getUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.postUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.putUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.patchUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.putUserAvatar = `${_Api.IDENTITY_BASE}/v1/Users/avatar`;
_Api.putUserPassword = `${_Api.IDENTITY_BASE}/v1/Users/password`;
_Api.getUserPreferences = `${_Api.IDENTITY_BASE}/v1/Users/preferences`;
_Api.putUserPreferences = `${_Api.IDENTITY_BASE}/v1/Users/preferences`;
_Api.phoneVerificationSend = `${_Api.IDENTITY_BASE}/v1/verification/phone/send`;
_Api.phoneVerificationVerify = `${_Api.IDENTITY_BASE}/v1/verification/phone/verify`;
// Other services
_Api.getProducts = `${_Api.INVENTORY_BASE}/v1/Items/Paging/Mobile`;
_Api.getCategories = `${_Api.INVENTORY_BASE}/v1/Menus/Search/true`;
_Api.getBranches = `${_Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
_Api.getBrands = `${_Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
_Api.getWishes = `${_Api.INVENTORY_BASE}/v1/wishes/paging`;
_Api.getOrders = `${_Api.INVENTORY_BASE}/v1/Orders/Paging`;
_Api.postOrders = `${_Api.INVENTORY_BASE}/v2/Orders`;
_Api.getStoreInfo = `${_Api.STORES_BASE}/v1/Stores/Info`;
_Api.getCities = `${_Api.GPS_BASE}/v1/Locations`;
_Api.getDeliveryZones = `${_Api.GPS_BASE}/v1/DeliveryZones`;
_Api.getSlideShows = `${_Api.THEME_BASE}/v1/SlideShows/Paging`;
// orders endpoints
_Api.getOrderFullInfo = `${_Api.INVENTORY_BASE}/v1/Orders/List/FullInfo`;
_Api.postOrderDelagatesList = `${_Api.INVENTORY_BASE}/v1/Orders/Delagates/List`;
_Api.getCheckoutQuote = `${_Api.INVENTORY_BASE}/v1/Checkout/Quote`;
// Cart endpoints
_Api.getCurrentCart = `${_Api.INVENTORY_BASE}/v1/Carts/Current`;
_Api.postCartItems = `${_Api.INVENTORY_BASE}/v1/Carts/Items`;
var Api = _Api;

export {
  Api
};
