"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product } from "@/data/products";

// ─── Types ─────────────────────────────────────────────────────────────────

export type CartItem = {
  product: Product;
  quantity: number;
  configuration?: Record<string, any>;
};

export type OrderStatus =
  | "pending" | "confirmed" | "packed" | "shipped" | "out_for_delivery"
  | "delivered" | "cancelled" | "return_requested" | "returned" | "refunded";

export type OrderRecord = {
  id: string;
  items: CartItem[];
  address: ShippingAddress;
  deliveryOption: "standard" | "express";
  paymentMethod: string;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  shipping: number;
  gst: number;
  total: number;
  status: OrderStatus;
  placedAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  cancelReason?: string;
  returnReason?: string;
};

export type ShippingAddress = {
  fullName: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  addressLine: string;
  landmark?: string;
};

export type CouponResult = {
  code: string;
  type: "percent" | "flat";
  value: number;
  label: string;
};

const VALID_COUPONS: Record<string, CouponResult> = {
  WOODNEST10: { code: "WOODNEST10", type: "percent", value: 10, label: "10% off your order" },
  NEWUSER20:  { code: "NEWUSER20",  type: "percent", value: 20, label: "20% off for new users" },
  LUXURY15:   { code: "LUXURY15",   type: "flat",    value: 15000, label: "₹15,000 off on luxury pieces" },
};

type StoreContextType = {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, config?: any) => void;
  removeFromCart: (slug: string, config?: any) => void;
  updateCartQuantity: (slug: string, quantity: number, config?: any) => void;
  clearCart: () => void;
  totalCartItems: number;
  totalCartPrice: number;

  // Mini Cart
  miniCartOpen: boolean;
  setMiniCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (slug: string) => boolean;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // Coupon
  appliedCoupon: CouponResult | null;
  couponError: string;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;

  // Price Engine
  subtotal: number;
  productDiscount: number;
  couponDiscount: number;
  shipping: number;
  gst: number;
  total: number;

  // Checkout state
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (addr: ShippingAddress) => void;
  deliveryOption: "standard" | "express";
  setDeliveryOption: (opt: "standard" | "express") => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;

  // Orders
  orderHistory: OrderRecord[];
  placeOrder: (paymentMethod: string) => OrderRecord;
  cancelOrder: (orderId: string, reason: string) => void;
  returnOrder: (orderId: string, reason: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  // Legacy
  loyaltyPoints: number;
  addLoyaltyPoints: (points: number) => void;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ─── Provider ──────────────────────────────────────────────────────────────

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState("");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express">("standard");
  const [guestEmail, setGuestEmail] = useState("");
  const [orderHistory, setOrderHistory] = useState<OrderRecord[]>([]);

  // ── Persistence ──
  useEffect(() => {
    try {
      const savedCart    = localStorage.getItem("wn_cart");
      const savedWish    = localStorage.getItem("wn_wishlist");
      const savedPoints  = localStorage.getItem("wn_points");
      const savedOrders  = localStorage.getItem("wn_orders");
      const savedAddress = localStorage.getItem("wn_address");
      const savedCoupon  = localStorage.getItem("wn_coupon");

      if (savedCart)    setCartItems(JSON.parse(savedCart));
      if (savedWish)    setWishlist(JSON.parse(savedWish));
      if (savedPoints)  setLoyaltyPoints(parseInt(savedPoints));
      if (savedOrders)  setOrderHistory(JSON.parse(savedOrders));
      if (savedAddress) setShippingAddress(JSON.parse(savedAddress));
      if (savedCoupon)  setAppliedCoupon(JSON.parse(savedCoupon));
    } catch {}
  }, []);

  useEffect(() => { try { localStorage.setItem("wn_cart",    JSON.stringify(cartItems));    } catch {} }, [cartItems]);
  useEffect(() => { try { localStorage.setItem("wn_wishlist", JSON.stringify(wishlist));     } catch {} }, [wishlist]);
  useEffect(() => { try { localStorage.setItem("wn_points",  loyaltyPoints.toString());      } catch {} }, [loyaltyPoints]);
  useEffect(() => { try { localStorage.setItem("wn_orders",  JSON.stringify(orderHistory));  } catch {} }, [orderHistory]);
  useEffect(() => { try { localStorage.setItem("wn_address", JSON.stringify(shippingAddress)); } catch {} }, [shippingAddress]);
  useEffect(() => { try { localStorage.setItem("wn_coupon",  JSON.stringify(appliedCoupon)); } catch {} }, [appliedCoupon]);

  // ── Price Engine ──
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const productDiscount = cartItems.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity, 0);

  const couponDiscount = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") return Math.round(subtotal * appliedCoupon.value / 100);
    return Math.min(appliedCoupon.value, subtotal);
  })();

  const shipping = deliveryOption === "express" ? 999 : (subtotal > 49999 ? 0 : 499);
  const taxable = Math.max(0, subtotal - couponDiscount);
  const gst = Math.round(taxable * 0.18);
  const total = taxable + gst + shipping;

  // ── Cart Actions ──
  const addToCart = useCallback((product: Product, quantity = 1, config?: any) => {
    setCartItems(prev => {
      const configKey = JSON.stringify(config || {});
      const existing = prev.findIndex(item =>
        item.product.slug === product.slug && JSON.stringify(item.configuration || {}) === configKey
      );
      if (existing > -1) {
        const next = [...prev];
        next[existing] = { ...next[existing], quantity: next[existing].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity, configuration: config }];
    });
    setMiniCartOpen(true);
  }, []);

  const removeFromCart = useCallback((slug: string, config?: any) => {
    const configKey = JSON.stringify(config || {});
    setCartItems(prev => prev.filter(item =>
      !(item.product.slug === slug && JSON.stringify(item.configuration || {}) === configKey)
    ));
  }, []);

  const updateCartQuantity = useCallback((slug: string, quantity: number, config?: any) => {
    if (quantity <= 0) { removeFromCart(slug, config); return; }
    const configKey = JSON.stringify(config || {});
    setCartItems(prev => prev.map(item =>
      (item.product.slug === slug && JSON.stringify(item.configuration || {}) === configKey)
        ? { ...item, quantity } : item
    ));
  }, [removeFromCart]);

  const clearCart = () => setCartItems([]);

  // ── Coupon ──
  const applyCoupon = useCallback((code: string) => {
    const found = VALID_COUPONS[code.toUpperCase().trim()];
    if (found) {
      setAppliedCoupon(found);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try WOODNEST10, NEWUSER20, or LUXURY15.");
    }
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError("");
    localStorage.removeItem("wn_coupon");
  }, []);

  // ── Order System ──
  const placeOrder = useCallback((paymentMethod: string): OrderRecord => {
    const id = `WN-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const deliveryDays = deliveryOption === "express" ? 2 : 7;
    const est = new Date(Date.now() + deliveryDays * 86400000);
    const estimatedDelivery = est.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

    const order: OrderRecord = {
      id,
      items: [...cartItems],
      address: shippingAddress!,
      deliveryOption,
      paymentMethod,
      subtotal,
      discount: productDiscount,
      couponDiscount,
      shipping,
      gst,
      total,
      status: "confirmed",
      placedAt: new Date().toISOString(),
      estimatedDelivery,
    };

    setOrderHistory(prev => [order, ...prev]);
    clearCart();
    removeCoupon();
    return order;
  }, [cartItems, shippingAddress, deliveryOption, subtotal, productDiscount, couponDiscount, shipping, gst, total, removeCoupon]);

  const cancelOrder = useCallback((orderId: string, reason: string) => {
    setOrderHistory(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: "cancelled", cancelReason: reason } : o
    ));
  }, []);

  const returnOrder = useCallback((orderId: string, reason: string) => {
    setOrderHistory(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: "return_requested", returnReason: reason } : o
    ));
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrderHistory(prev => prev.map(o =>
      o.id === orderId ? { ...o, status, ...(trackingNumber ? { trackingNumber } : {}) } : o
    ));
  }, []);

  // ── Wishlist & Compare ──
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev =>
      prev.find(p => p.slug === product.slug)
        ? prev.filter(p => p.slug !== product.slug)
        : [...prev, product]
    );
  }, []);

  const isInWishlist = useCallback((slug: string) => wishlist.some(p => p.slug === slug), [wishlist]);

  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed(prev => [product, ...prev.filter(p => p.slug !== product.slug)].slice(0, 10));
  }, []);

  const toggleCompare = useCallback((product: Product) => {
    setCompareList(prev =>
      prev.find(p => p.slug === product.slug)
        ? prev.filter(p => p.slug !== product.slug)
        : [...prev, product].slice(0, 4)
    );
  }, []);

  const addLoyaltyPoints = (points: number) => setLoyaltyPoints(p => p + points);
  const totalCartItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalCartPrice = subtotal;

  return (
    <StoreContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, totalCartItems, totalCartPrice,
      miniCartOpen, setMiniCartOpen,
      wishlist, toggleWishlist, isInWishlist,
      recentlyViewed, addToRecentlyViewed,
      appliedCoupon, couponError, applyCoupon, removeCoupon,
      subtotal, productDiscount, couponDiscount, shipping, gst, total,
      shippingAddress, setShippingAddress,
      deliveryOption, setDeliveryOption,
      guestEmail, setGuestEmail,
      orderHistory, placeOrder, cancelOrder, returnOrder, updateOrderStatus,
      loyaltyPoints, addLoyaltyPoints,
      compareList, toggleCompare,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
