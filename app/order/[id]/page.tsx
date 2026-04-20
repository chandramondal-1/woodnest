"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/store-context";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const ORDER_TIMELINE = [
  { key: "confirmed",        icon: "✅", label: "Order Confirmed",      desc: "Your order has been placed and confirmed." },
  { key: "packed",           icon: "📦", label: "Packed",               desc: "Your sofa is being packed at our atelier." },
  { key: "shipped",          icon: "🚚", label: "Shipped",              desc: "Out for white-glove transit to your city." },
  { key: "out_for_delivery", icon: "🏎️", label: "Out for Delivery",     desc: "Our team is en route to your residence." },
  { key: "delivered",        icon: "🏠", label: "Delivered",            desc: "Delivered and assembled at your home." },
];

const STATUS_ORDER = ["confirmed", "packed", "shipped", "out_for_delivery", "delivered"];

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orderHistory } = useStore();
  const [confetti, setConfetti] = useState(true);
  const [particles, setParticles] = useState<{ x: number; color: string; delay: number }[]>([]);

  const order = orderHistory.find(o => o.id === id);

  useEffect(() => {
    // Generate confetti positions
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        x: Math.random() * 100,
        color: i % 2 === 0 ? "#A35D45" : "#d4af37",
        delay: Math.random() * 2,
      }))
    );
    const t = setTimeout(() => setConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const currentStatusIdx = order ? STATUS_ORDER.indexOf(order.status) : 0;

  if (!order) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-6 bg-bg-soft-white">
        <span className="text-6xl">🔍</span>
        <h1 className="font-serif text-3xl italic font-bold text-text-rich-black">Order not found</h1>
        <p className="text-text-dark-gray/60">Order <code className="font-mono text-sm bg-bg-soft-white px-2 py-1 rounded">{id}</code> doesn't exist in your session.</p>
        <Link href="/account" className="btn-premium px-10 py-4">View All Orders</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-soft-white">
      {/* Confetti Burst */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-[9000] overflow-hidden">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-2 h-3 rounded-sm ani-confetti"
              style={{ left: `${p.x}%`, top: "-20px", backgroundColor: p.color, animationDelay: `${p.delay}s` }}
            />
          ))}
        </div>
      )}

      <div className="mx-auto max-w-[900px] px-6 py-12 md:py-24 space-y-10">

        {/* Success Header */}
        <div className="text-center space-y-6 ani-reveal">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-accent-terracotta/10 border-2 border-accent-terracotta mx-auto ani-glow">
            <span className="text-5xl">✓</span>
          </div>
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold italic text-text-rich-black">Order Secured!</h1>
            <p className="text-text-dark-gray/60 font-medium mt-2">Your masterpiece is on its way to your sanctuary.</p>
          </div>
          <div className="inline-block bg-white border border-border-light-gray rounded-2xl px-8 py-4 soft-shadow">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dark-gray/40">Order ID</p>
            <p className="font-mono text-xl font-black text-text-rich-black tracking-widest">{order.id}</p>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-8 space-y-8 ani-reveal" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-serif text-xl font-bold italic text-text-rich-black">Shipment Timeline</h2>

          {order.status === "cancelled" ? (
            <div className="flex items-center gap-4 p-6 bg-red-50 rounded-xl border border-red-100">
              <span className="text-3xl">❌</span>
              <div>
                <p className="font-bold text-red-600">Order Cancelled</p>
                <p className="text-sm text-red-400 font-medium">{order.cancelReason}</p>
              </div>
            </div>
          ) : order.status === "return_requested" ? (
            <div className="flex items-center gap-4 p-6 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-3xl">🔄</span>
              <div>
                <p className="font-bold text-amber-600">Return Requested</p>
                <p className="text-sm text-amber-400 font-medium">{order.returnReason}</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border-light-gray" />

              <div className="space-y-8">
                {ORDER_TIMELINE.map((step, idx) => {
                  const done = idx <= currentStatusIdx;
                  const current = idx === currentStatusIdx;

                  return (
                    <div key={step.key} className="flex items-start gap-6 relative">
                      <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 border-2 transition-all duration-700 ${done ? "bg-accent-terracotta border-accent-terracotta shadow-[0_0_20px_rgba(163,93,69,0.3)]" : "bg-white border-border-light-gray"}`}>
                        <span className={done ? "grayscale-0" : "grayscale opacity-30"}>{step.icon}</span>
                      </div>
                      <div className={`pt-1.5 transition-all duration-500 ${done ? "opacity-100" : "opacity-30"}`}>
                        <p className={`font-bold text-sm ${current ? "text-accent-terracotta" : "text-text-rich-black"}`}>{step.label}</p>
                        <p className="text-xs text-text-dark-gray/60 font-medium">{step.desc}</p>
                        {current && (
                          <p className="text-[10px] font-black uppercase tracking-widest text-accent-terracotta mt-1 animate-pulse">Current Status</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {order.trackingNumber && (
                <div className="mt-6 p-4 bg-bg-soft-white rounded-xl border border-border-light-gray">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-dark-gray/40">Tracking Number</p>
                  <p className="font-mono text-sm font-bold text-text-rich-black mt-1">{order.trackingNumber}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Items + Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Items */}
          <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-6 space-y-5 ani-reveal" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-serif text-lg font-bold italic">Commissioned Pieces</h2>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <img src={item.product.image} className="h-16 w-16 bg-bg-soft-white rounded-xl border border-border-light-gray object-contain p-2" alt={item.product.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-rich-black line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-text-dark-gray/50 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-text-rich-black flex-shrink-0">{fmt(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-6 space-y-4 ani-reveal" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-serif text-lg font-bold italic">Payment Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-dark-gray/60"><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
                {order.couponDiscount > 0 && <div className="flex justify-between text-accent-terracotta font-bold"><span>Coupon Savings</span><span>−{fmt(order.couponDiscount)}</span></div>}
                <div className="flex justify-between text-text-dark-gray/60"><span>GST</span><span>{fmt(order.gst)}</span></div>
                <div className="flex justify-between text-text-dark-gray/60"><span>Shipping</span><span className={order.shipping === 0 ? "text-green-600" : ""}>{order.shipping === 0 ? "FREE" : fmt(order.shipping)}</span></div>
                <div className="flex justify-between font-black text-text-rich-black text-base border-t border-border-light-gray pt-3"><span>Total Paid</span><span>{fmt(order.total)}</span></div>
              </div>
              <div className="p-3 bg-bg-soft-white rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-dark-gray/40 text-center">via {order.paymentMethod.toUpperCase()}</div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-6 space-y-3 ani-reveal" style={{ animationDelay: "0.5s" }}>
              <h2 className="font-serif text-lg font-bold italic">Delivery Address</h2>
              <address className="not-italic text-sm text-text-dark-gray/70 font-medium leading-relaxed space-y-0.5">
                <p className="font-bold text-text-rich-black">{order.address.fullName}</p>
                <p>{order.address.addressLine}</p>
                {order.address.landmark && <p>{order.address.landmark}</p>}
                <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
                <p className="font-bold text-text-rich-black mt-2">📞 {order.address.phone}</p>
              </address>
              <div className="p-3 bg-accent-terracotta/5 rounded-xl border border-accent-terracotta/20">
                <p className="text-xs font-bold text-accent-terracotta">🚚 Estimated Delivery: {order.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 ani-reveal" style={{ animationDelay: "0.6s" }}>
          <Link href="/account" className="flex-1 h-14 rounded-xl border-2 border-accent-terracotta text-accent-terracotta font-bold text-sm flex items-center justify-center hover:bg-accent-terracotta/5 transition-all uppercase tracking-widest">
            View All Orders
          </Link>
          <Link href="/shop" className="flex-1 btn-premium text-sm inline-flex items-center justify-center">
            🛋️ Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
