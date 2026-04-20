"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/store-context";
import { products } from "@/data/products";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const PINCODE_MAP: Record<string, { city: string; available: boolean }> = {
  "560001": { city: "Bengaluru", available: true },
  "400001": { city: "Mumbai", available: true },
  "110001": { city: "Delhi", available: true },
  "600001": { city: "Chennai", available: true },
};

export default function CartPage() {
  const {
    cartItems, removeFromCart, updateCartQuantity, toggleWishlist,
    subtotal, productDiscount, couponDiscount, shipping, gst, total,
    appliedCoupon, couponError, applyCoupon, removeCoupon,
    deliveryOption,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<{ city: string; available: boolean } | null>(null);

  const checkPincode = () => {
    const result = PINCODE_MAP[pincode] ?? { city: "Your Area", available: pincode.length === 6 };
    setPincodeResult(result);
  };

  const upsell = products.filter(p => !cartItems.find(i => i.product.slug === p.slug)).slice(0, 3);

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-8 text-center px-6 py-24 bg-bg-soft-white">
        <span className="text-8xl animate-bounce">🛋️</span>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl font-bold italic text-text-rich-black">Your bag is empty</h1>
          <p className="text-text-dark-gray/60 font-medium max-w-sm mx-auto">Discover our curated furniture masterpieces and add your favourites.</p>
        </div>
        <Link href="/shop" className="btn-premium text-sm px-12 py-5">Explore Collection</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[var(--max-width)] px-6 py-12 md:py-20 grid gap-10 lg:grid-cols-[1fr_400px] items-start bg-bg-soft-white">

      {/* ── LEFT: Products ────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold italic text-text-rich-black">Shopping Bag <span className="text-accent-terracotta">({cartItems.reduce((s, i) => s + i.quantity, 0)})</span></h1>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-accent-terracotta hover:underline">Continue Shopping</Link>
        </div>

        {cartItems.map((item, idx) => {
          const disc = Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100);
          const isLowStock = item.product.stockCount <= 3;

          return (
            <div key={`${item.product.slug}-${idx}`} className="bg-bg-soft-white rounded-[12px] border border-border-muted soft-shadow p-6 flex gap-6 group hover-shadow">
              {/* Image */}
              <Link href={`/product/${item.product.slug}`} className="h-32 w-32 flex-shrink-0 bg-bg-soft-white rounded-xl overflow-hidden border border-border-light-gray">
                <img src={item.product.image} className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" alt={item.product.name} />
              </Link>

              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Link href={`/product/${item.product.slug}`} className="font-bold text-text-rich-black hover:text-accent-terracotta transition-colors line-clamp-1">{item.product.name}</Link>
                    <p className="text-[10px] font-bold text-text-dark-gray/40 uppercase tracking-widest">{item.product.category} • Handcrafted Collective</p>
                  </div>
                  {isLowStock && (
                    <span className="flex-shrink-0 text-[9px] font-black uppercase tracking-wider bg-red-50 text-red-500 border border-red-100 px-2 py-1 rounded-full animate-pulse">
                      Only {item.product.stockCount} left!
                    </span>
                  )}
                </div>

                {/* Variant pills */}
                {item.configuration && Object.entries(item.configuration).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(item.configuration).map(([k, v]) => (
                      <span key={k} className="text-[9px] font-bold uppercase tracking-wider bg-bg-soft-white text-text-dark-gray px-2.5 py-1 rounded-full border border-border-light-gray">
                        {k}: {String(v)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-bold text-text-rich-black">{fmt(item.product.price)}</span>
                  <span className="text-sm text-text-dark-gray/30 line-through">{fmt(item.product.originalPrice)}</span>
                  {disc > 0 && <span className="text-xs font-bold text-accent-terracotta bg-accent-terracotta/10 px-2 py-0.5 rounded-full">{disc}% off</span>}
                </div>

                <p className="text-xs font-bold text-green-600">🚚 {item.product.leadTime}</p>

                <div className="flex items-center justify-between pt-2 border-t border-border-light-gray">
                  {/* Qty stepper */}
                  <div className="flex items-center border border-border-light-gray rounded-lg overflow-hidden">
                    <button onClick={() => updateCartQuantity(item.product.slug, item.quantity - 1, item.configuration)} className="w-9 h-9 flex items-center justify-center text-text-dark-gray hover:bg-bg-soft-white font-bold transition-colors">−</button>
                    <span className="w-9 h-9 flex items-center justify-center text-sm font-bold border-x border-border-light-gray">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.product.slug, item.quantity + 1, item.configuration)} className="w-9 h-9 flex items-center justify-center text-text-dark-gray hover:bg-bg-soft-white font-bold transition-colors">+</button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
                    <button onClick={() => removeFromCart(item.product.slug, item.configuration)} className="text-text-dark-gray/40 hover:text-red-500 transition-colors">Remove</button>
                    <button onClick={() => { toggleWishlist(item.product); removeFromCart(item.product.slug, item.configuration); }} className="text-accent-terracotta hover:text-accent-terracotta-dark transition-colors">Save ❤️</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Frequently Bought Together */}
        <div className="bg-bg-soft-white rounded-[12px] border border-border-muted soft-shadow p-6 space-y-5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Frequently Bought Together</p>
          <div className="grid grid-cols-3 gap-4">
            {upsell.map(p => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group text-center space-y-3">
                <div className="aspect-square bg-bg-soft-white rounded-xl overflow-hidden border border-border-light-gray">
                  <img src={p.image} className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform" alt={p.name} />
                </div>
                <p className="text-xs font-bold text-text-rich-black group-hover:text-accent-terracotta transition-colors line-clamp-2 leading-tight">{p.name}</p>
                <p className="text-sm font-bold text-accent-terracotta">{fmt(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Checkout Button (sticky on mobile) */}
        <div className="hidden md:flex justify-end pt-4">
          <Link href="/checkout" className="btn-premium text-sm px-16 py-5">Proceed to Checkout →</Link>
        </div>
      </section>

      {/* ── RIGHT: Order Summary ──────────────────── */}
      <aside className="space-y-5 sticky top-24">

        {/* Coupon Code Box */}
        <div className="bg-bg-soft-white rounded-[12px] border border-border-muted soft-shadow p-6 space-y-5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Apply Coupon</p>

          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-accent-terracotta/5 border border-accent-terracotta/20 rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-black text-accent-terracotta">{appliedCoupon.code}</p>
                <p className="text-[10px] text-accent-terracotta/70 font-medium">{appliedCoupon.label}</p>
              </div>
              <button onClick={removeCoupon} className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest">Remove</button>
            </div>
          ) : (
            <>
              <div className="flex gap-3">
                <input
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === "Enter" && applyCoupon(couponInput)}
                  placeholder="Enter code (e.g. WOODNEST10)"
                  className="flex-1 bg-bg-soft-white border border-border-light-gray rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-accent-terracotta transition-colors"
                />
                <button onClick={() => applyCoupon(couponInput)} className="btn-premium text-xs px-5 py-3">Apply</button>
              </div>
              {couponError && <p className="text-xs text-red-500 font-medium">{couponError}</p>}
              <div className="flex gap-2 flex-wrap">
                {["WOODNEST10", "NEWUSER20", "LUXURY15"].map(code => (
                  <button key={code} onClick={() => { setCouponInput(code); applyCoupon(code); }} className="text-[9px] font-black uppercase tracking-wider border border-accent-terracotta/30 text-accent-terracotta px-2 py-1 rounded-full hover:bg-accent-terracotta hover:text-white transition-all">{code}</button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Shipping Estimator */}
        <div className="bg-bg-soft-white rounded-[12px] border border-border-muted soft-shadow p-6 space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Delivery Availability</p>
          <div className="flex gap-3">
            <input
              value={pincode}
              onChange={e => setPincode(e.target.value.slice(0, 6))}
              type="text"
              inputMode="numeric"
              placeholder="Enter pincode"
              className="flex-1 bg-bg-soft-white border border-border-light-gray rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-accent-terracotta transition-colors"
            />
            <button onClick={checkPincode} className="btn-premium text-xs px-5 py-3">Check</button>
          </div>
          {pincodeResult && (
            <p className={`text-xs font-bold ${pincodeResult.available ? "text-green-600" : "text-red-500"}`}>
              {pincodeResult.available
                ? `✓ White-Glove Delivery available in ${pincodeResult.city} (${deliveryOption === "express" ? "2 days" : "7 days"})`
                : `✗ Delivery not available in ${pincodeResult.city} yet`
              }
            </p>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="bg-bg-soft-white rounded-[12px] border border-border-muted soft-shadow divide-y divide-border-light-gray">
          <p className="px-6 py-4 text-xs font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Price Details</p>
          <div className="px-6 py-5 space-y-4 text-sm">
            <div className="flex justify-between text-text-dark-gray">
              <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-semibold">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-green-600 font-bold">
              <span>Product Discount</span>
              <span>−{fmt(productDiscount)}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-accent-terracotta font-bold">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span>−{fmt(couponDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-text-dark-gray">
              <span>GST (18%)</span>
              <span className="font-semibold">{fmt(gst)}</span>
            </div>
            <div className="flex justify-between text-text-dark-gray">
              <span>Shipping</span>
              <span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>{shipping === 0 ? "FREE" : fmt(shipping)}</span>
            </div>
            <div className="flex justify-between font-black text-text-rich-black text-lg pt-2 border-t border-border-light-gray">
              <span>Total Amount</span>
              <span>{fmt(total)}</span>
            </div>
            {(productDiscount + couponDiscount) > 0 && (
              <p className="text-xs font-bold text-green-600 bg-green-50 px-3 py-2 rounded-xl text-center">
                🎉 You save {fmt(productDiscount + couponDiscount)} on this order!
              </p>
            )}
          </div>
        </div>

        <Link href="/checkout" className="btn-premium w-full text-center text-sm py-5 block">Secure Checkout →</Link>

        <div className="flex items-center gap-3 justify-center text-[10px] font-bold uppercase tracking-widest text-text-dark-gray/40">
          <span>🛡️ Secure</span>
          <span>•</span>
          <span>📜 5-Yr Warranty</span>
          <span>•</span>
          <span>🚚 White-Glove</span>
        </div>

        {/* Mobile sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-xl border-t border-border-light-gray p-4 z-50">
          <Link href="/checkout" className="btn-premium w-full text-center py-4 block text-sm">Checkout → {fmt(total)}</Link>
        </div>
      </aside>
    </main>
  );
}
