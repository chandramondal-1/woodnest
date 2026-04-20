"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/store-context";
import { products } from "@/data/products";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function MiniCart() {
  const {
    miniCartOpen, setMiniCartOpen,
    cartItems, removeFromCart, updateCartQuantity,
    subtotal, couponDiscount, shipping, gst, total,
    appliedCoupon,
  } = useStore();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMiniCartOpen(false);
      }
    };
    if (miniCartOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [miniCartOpen, setMiniCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = miniCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [miniCartOpen]);

  const upsellProducts = products.filter(p => !cartItems.find(i => i.product.slug === p.slug)).slice(0, 2);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] transition-opacity duration-500 ${miniCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[2001] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${miniCartOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Mini Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-border-light-gray">
          <div>
            <h2 className="font-serif text-xl font-bold text-text-rich-black italic">Your Bag</h2>
            <p className="text-xs font-bold text-text-dark-gray/60 uppercase tracking-widest mt-0.5">
              {cartItems.reduce((s, i) => s + i.quantity, 0)} pieces selected
            </p>
          </div>
          <button
            onClick={() => setMiniCartOpen(false)}
            className="h-10 w-10 rounded-full border border-border-light-gray flex items-center justify-center hover:bg-bg-soft-white transition-colors text-text-dark-gray"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
              <span className="text-6xl">🛋️</span>
              <p className="font-serif italic text-2xl text-text-rich-black">Your bag is empty</p>
              <p className="text-sm text-text-dark-gray/60 font-medium">Discover our curated luxury collection.</p>
              <button
                onClick={() => setMiniCartOpen(false)}
                className="btn-premium text-sm px-8 py-4"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item, idx) => {
                const disc = Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100);
                return (
                  <div key={`${item.product.slug}-${idx}`} className="flex gap-5 group">
                    {/* Thumbnail */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setMiniCartOpen(false)}
                      className="h-24 w-24 flex-shrink-0 bg-bg-soft-white rounded-xl overflow-hidden border border-border-light-gray"
                    >
                      <img src={item.product.image} className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform" alt={item.product.name} />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setMiniCartOpen(false)}
                        className="text-sm font-bold text-text-rich-black hover:text-accent-terracotta transition-colors line-clamp-2 leading-snug"
                      >
                        {item.product.name}
                      </Link>

                      {/* Variant pills */}
                      {item.configuration && Object.entries(item.configuration).length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(item.configuration).map(([k, v]) => (
                            <span key={k} className="text-[9px] font-bold uppercase tracking-wider bg-bg-soft-white text-text-dark-gray px-2 py-0.5 rounded-full border border-border-light-gray">
                              {k}: {String(v)}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price + Discount */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-text-rich-black">{fmt(item.product.price)}</span>
                        {disc > 0 && <span className="text-[10px] font-bold text-accent-terracotta bg-accent-terracotta/10 px-1.5 py-0.5 rounded-full">-{disc}%</span>}
                      </div>

                      {/* Qty Stepper + Remove */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border-light-gray rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.product.slug, item.quantity - 1, item.configuration)}
                            className="w-8 h-8 flex items-center justify-center text-text-dark-gray hover:bg-bg-soft-white transition-colors font-bold text-lg"
                          >
                            −
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-text-rich-black border-x border-border-light-gray">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.slug, item.quantity + 1, item.configuration)}
                            className="w-8 h-8 flex items-center justify-center text-text-dark-gray hover:bg-bg-soft-white transition-colors font-bold text-lg"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.slug, item.configuration)}
                          className="text-[10px] font-bold uppercase tracking-widest text-text-dark-gray/40 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Divider */}
              <div className="border-t border-border-light-gray pt-6 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-dark-gray/40">Complete the Room</p>
                {upsellProducts.map(p => (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    onClick={() => setMiniCartOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-xl bg-bg-soft-white border border-border-light-gray hover:border-accent-terracotta transition-colors group"
                  >
                    <img src={p.image} className="h-12 w-12 object-contain" alt={p.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-text-rich-black line-clamp-1">{p.name}</p>
                      <p className="text-xs text-accent-terracotta font-bold">{fmt(p.price)}</p>
                    </div>
                    <span className="text-accent-terracotta text-lg group-hover:translate-x-1 transition-transform">+</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer — always visible when items exist */}
        {cartItems.length > 0 && (
          <div className="border-t border-border-light-gray px-7 py-6 space-y-4 bg-white">
            {/* Mini price breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-dark-gray/60 font-medium">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-accent-terracotta font-bold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>−{fmt(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-text-dark-gray/60 font-medium">
                <span>GST (18%)</span>
                <span>{fmt(gst)}</span>
              </div>
              <div className="flex justify-between text-text-dark-gray/60 font-medium">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>{shipping === 0 ? "FREE" : fmt(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-text-rich-black text-base pt-2 border-t border-border-light-gray">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={() => setMiniCartOpen(false)}
                className="h-12 rounded-xl border-2 border-accent-terracotta text-accent-terracotta font-bold text-xs uppercase tracking-widest flex items-center justify-center hover:bg-accent-terracotta/5 transition-colors"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={() => setMiniCartOpen(false)}
                className="h-12 btn-premium text-sm inline-flex items-center justify-center"
              >
                Checkout →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
