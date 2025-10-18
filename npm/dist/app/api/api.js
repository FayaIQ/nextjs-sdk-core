"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
class Api {
    // Dynamic endpoints with IDs
    static getProductInfo(id) {
        return `${Api.INVENTORY_BASE}/v1/Items/${id}/FullInfo`;
    }
    // Wishlist endpoints (lowercase per spec)
    static postWish(id) {
        return `${Api.INVENTORY_BASE}/v1/items/${id}/wish`;
    }
    static deleteWish(id) {
        return `${Api.INVENTORY_BASE}/v1/items/${id}/unwish`;
    }
    static getCategoryProducts(id) {
        return `${Api.INVENTORY_BASE}/v1/Items/Paging/Mobile?CurrentPage=1&PageSize=1000&menuId=${id}`;
    }
    static getOrder(id) {
        return `${Api.INVENTORY_BASE}/v3/Orders/${id}`;
    }
    static getInvoiceDiscount(code) {
        const clean = encodeURIComponent(code);
        return `${Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount/${clean}`;
    }
    static cancelOrder(id) {
        return `${Api.INVENTORY_BASE}/v1/Orders/${id}/Cancel`;
    }
    static patchCartItem(id) {
        return `${Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(String(id))}`;
    }
    static deleteCartItem(id) {
        return `${Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(String(id))}`;
    }
}
exports.Api = Api;
Api.LOCAL_BASE = "http://localhost:3000";
Api.IDENTITY_BASE = `https://storeak-identity-service.azurewebsites.net/api`;
Api.NEWS_BASE = `https://storeak-news-service.azurewebsites.net/api`;
Api.STORES_BASE = `https://storeak-stores-service.azurewebsites.net/api`;
Api.GPS_BASE = `https://storeak-gps-service.azurewebsites.net/api`;
Api.THEME_BASE = `https://storeak-Theme-service.azurewebsites.net/api`;
Api.INVENTORY_BASE = `https://storeak-inventory-service.azurewebsites.net/api`;
Api.IDENTITY_URL = `https://storeak-identity-service.azurewebsites.net/api`;
// Identity endpoints
Api.signIn = `${Api.IDENTITY_BASE}/v1/token`;
Api.refreshToken = `${Api.IDENTITY_BASE}/v1/token/refresh`;
Api.sessionLogout = `${Api.IDENTITY_BASE}/v1/session/logout`;
Api.clearCart = `${Api.INVENTORY_BASE}/v1/Carts/Clear`;
Api.getUserInfo = `${Api.IDENTITY_BASE}/v1/Users`;
Api.postUserInfo = `${Api.IDENTITY_BASE}/v1/Users`;
Api.putUserInfo = `${Api.IDENTITY_BASE}/v1/Users`;
Api.patchUserInfo = `${Api.IDENTITY_BASE}/v1/Users`;
Api.putUserAvatar = `${Api.IDENTITY_BASE}/v1/Users/avatar`;
Api.putUserPassword = `${Api.IDENTITY_BASE}/v1/Users/password`;
Api.getUserPreferences = `${Api.IDENTITY_BASE}/v1/Users/preferences`;
Api.putUserPreferences = `${Api.IDENTITY_BASE}/v1/Users/preferences`;
Api.phoneVerificationSend = `${Api.IDENTITY_BASE}/v1/verification/phone/send`;
Api.phoneVerificationVerify = `${Api.IDENTITY_BASE}/v1/verification/phone/verify`;
// Other services
Api.getProducts = `${Api.INVENTORY_BASE}/v1/Items/Paging/Mobile?`;
Api.getCategories = `${Api.INVENTORY_BASE}/v1/Menus/Search/true`;
Api.getBranches = `${Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
Api.getBrands = `${Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
Api.getWishes = `${Api.INVENTORY_BASE}/v1/wishes/paging`;
Api.getOrders = `${Api.INVENTORY_BASE}/v1/Orders/Paging`;
Api.postOrders = `${Api.INVENTORY_BASE}/v2/Orders`;
Api.getCities = `${Api.GPS_BASE}/v1/Locations`;
Api.getDeliveryZones = `${Api.GPS_BASE}/v1/DeliveryZones`;
Api.getSlideShows = `${Api.THEME_BASE}/v1/SlideShows/Paging`;
Api.getCheckoutQuote = `${Api.INVENTORY_BASE}/v1/Checkout/Quote`;
// Cart endpoints
Api.getCurrentCart = `${Api.INVENTORY_BASE}/v1/Carts/Current`;
Api.postCartItems = `${Api.INVENTORY_BASE}/v1/Carts/Items`;
