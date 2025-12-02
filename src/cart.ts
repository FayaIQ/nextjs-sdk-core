"use client";

// Centralized cart store with in-memory cache and event subscriptions
// Minimizes repeated synchronous localStorage access on every render.
// Exposes async-like API to avoid blocking the main thread in hot paths.

export type CartItem = {
  id: number;
  name: string;
  enName: string;
  image: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  availableQuantity: number;
  selectedColor?: any;
  selectedSize?: any;
};

export type CouponData = {
  code: string;
  discount: number;
  totalAfterDiscount: number;
  message: string;
};

let cartCache: CartItem[] | null = null;
let couponCache: CouponData | null = null;
const subscribers = new Set<(cart: CartItem[]) => void>();
const couponSubscribers = new Set<(coupon: CouponData | null) => void>();

function readLocalStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("cart");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalStorage(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  } catch {
    // ignore
  }
}

function readCouponStorage(): CouponData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("appliedCoupon");
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed;
  } catch (error) {
    console.error("Error reading coupon from localStorage:", error);
    return null;
  }
}

function writeCouponStorage(coupon: CouponData | null) {
  if (typeof window === "undefined") return;
  try {
    if (coupon) {
      window.localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
    } else {
      window.localStorage.removeItem("appliedCoupon");
    }
    window.dispatchEvent(new Event("couponUpdated"));
  } catch (error) {
    console.error("Error writing coupon to localStorage:", error);
  }
}

function ensureInitialized() {
  if (cartCache === null) {
    cartCache = readLocalStorage();
    couponCache = readCouponStorage();
    if (typeof window !== "undefined") {
      // Keep cache in sync when other tabs update it
      window.addEventListener("storage", (e: StorageEvent) => {
        if (e.key === "cart") {
          cartCache = readLocalStorage();
          notify();
        }
        if (e.key === "appliedCoupon") {
          couponCache = readCouponStorage();
          notifyCoupon();
        }
      });
      window.addEventListener("cartUpdated", () => {
        cartCache = readLocalStorage();
        notify();
      });
      window.addEventListener("couponUpdated", () => {
        couponCache = readCouponStorage();
        notifyCoupon();
      });
    }
  }
}

function notify() {
  if (!cartCache) return;
  subscribers.forEach((fn) => fn(cartCache!));
}

function notifyCoupon() {
  couponSubscribers.forEach((fn) => fn(couponCache));
}

export async function clearCart() {
  ensureInitialized();
  cartCache = [];
  writeLocalStorage(cartCache);
  notify();
}
export async function getCart(): Promise<CartItem[]> {
  ensureInitialized();
  // Defer to next task to avoid blocking current render path
  await Promise.resolve();

  return cartCache ? [...cartCache] : [];
}

export function getCartSync(): CartItem[] {
  ensureInitialized();
  return cartCache ? [...cartCache] : [];
}

export async function setCart(cart: CartItem[]) {
  ensureInitialized();
  cartCache = [...cart];
  writeLocalStorage(cartCache);
  notify();
}

export async function addItem(item: CartItem) {
  ensureInitialized();
  const list = cartCache ? [...cartCache] : [];
  const idx = list.findIndex(
    (x) =>
      x.id === item.id &&
      (x.selectedColor?.id ?? null) === (item.selectedColor?.id ?? null) &&
      (x.selectedSize?.id ?? null) === (item.selectedSize?.id ?? null)
  );
  if (idx >= 0) {
    const safeQty = Math.max(1, Math.floor(Number(list[idx].quantity) || 1));
    list[idx] = {
      ...list[idx],
      quantity: safeQty + Math.max(1, Math.floor(item.quantity || 1)),
    };
  } else {
    list.push({
      ...item,
      quantity: Math.max(1, Math.floor(item.quantity || 1)),
    });
  }
  await setCart(list);
}

export async function updateQuantity(
  id: number,
  quantity: number,
  selectedColorId?: number | null,
  selectedSizeId?: number | null
) {
  ensureInitialized();
  const list = cartCache ? [...cartCache] : [];
  const safeQty = Math.max(
    1,
    Math.min(1000, Math.floor(Number(quantity) || 1))
  );
  const updated = list.map((x) => {
    const match =
      x.id === id &&
      (x.selectedColor?.id ?? null) ===
        (selectedColorId ?? x.selectedColor?.id ?? null) &&
      (x.selectedSize?.id ?? null) ===
        (selectedSizeId ?? x.selectedSize?.id ?? null);
    return match ? { ...x, quantity: safeQty } : x;
  });
  await setCart(updated);
}

export async function removeItem(
  id: number,
  selectedColorId?: number | null,
  selectedSizeId?: number | null
) {
  ensureInitialized();
  const list = cartCache ? [...cartCache] : [];
  const filtered = list.filter(
    (x) =>
      !(
        x.id === id &&
        (x.selectedColor?.id ?? null) ===
          (selectedColorId ?? x.selectedColor?.id ?? null) &&
        (x.selectedSize?.id ?? null) ===
          (selectedSizeId ?? x.selectedSize?.id ?? null)
      )
  );
  await setCart(filtered);
}

export function subscribe(fn: (cart: CartItem[]) => void) {
  ensureInitialized();
  subscribers.add(fn);
  // Immediately emit current state
  if (cartCache) fn([...cartCache]);
  return () => subscribers.delete(fn);
}

// Coupon management functions
export async function getAppliedCoupon(): Promise<CouponData | null> {
  ensureInitialized();
  await Promise.resolve();
  return couponCache ? { ...couponCache } : null;
}

export function getAppliedCouponSync(): CouponData | null {
  ensureInitialized();
  return couponCache ? { ...couponCache } : null;
}

export async function setAppliedCoupon(coupon: CouponData | null) {
  ensureInitialized();
  couponCache = coupon ? { ...coupon } : null;
  writeCouponStorage(couponCache);
  notifyCoupon();
}

export async function clearAppliedCoupon() {
  await setAppliedCoupon(null);
}

export function subscribeToCoupon(fn: (coupon: CouponData | null) => void) {
  ensureInitialized();
  couponSubscribers.add(fn);
  // Immediately emit current state
  fn(couponCache);
  return () => couponSubscribers.delete(fn);
}
