"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/store-context";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// Simple city/state lookup for demo
const PINCODE_DB: Record<string, { city: string; state: string }> = {
  "560": { city: "Bengaluru", state: "Karnataka" },
  "400": { city: "Mumbai", state: "Maharashtra" },
  "110": { city: "New Delhi", state: "Delhi" },
  "600": { city: "Chennai", state: "Tamil Nadu" },
  "700": { city: "Kolkata", state: "West Bengal" },
  "500": { city: "Hyderabad", state: "Telangana" },
  "411": { city: "Pune", state: "Maharashtra" },
};

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS = ["Identity", "Address", "Delivery", "Payment"];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems, total, subtotal, productDiscount, couponDiscount, shipping, gst,
    placeOrder, setShippingAddress, deliveryOption, setDeliveryOption, guestEmail, setGuestEmail,
  } = useStore();

  const [step, setStep] = useState<Step>(1);
  const [isGuest, setIsGuest] = useState(true);
  const [email, setEmail] = useState(guestEmail);
  const [paying, setPaying] = useState(false);
  const [payMethod, setPayMethod] = useState("upi");
  const [deliverySlot, setDeliverySlot] = useState("morning");

  const [addr, setAddr] = useState({
    fullName: "", phone: "", pincode: "", city: "", state: "",
    addressLine: "", landmark: "",
  });

  const updateAddr = (k: string, v: string) => {
    setAddr(prev => {
      const next = { ...prev, [k]: v };
      if (k === "pincode" && v.length >= 3) {
        const prefix = v.slice(0, 3);
        const found = PINCODE_DB[prefix];
        if (found) { next.city = found.city; next.state = found.state; }
      }
      return next;
    });
  };

  const handlePayNow = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1800)); // Simulate gateway
    const orderAddr = { ...addr };
    setShippingAddress(orderAddr);
    const order = placeOrder(payMethod);
    router.push(`/order/${order.id}`);
  };

  const canProceedStep1 = email.trim().length > 4;
  const canProceedStep2 = addr.fullName && addr.phone.length >= 10 && addr.pincode.length === 6 && addr.addressLine;

  if (cartItems.length === 0 && !paying) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-6">
        <span className="text-6xl">🛒</span>
        <h1 className="font-serif text-3xl italic font-bold">Nothing to checkout</h1>
        <Link href="/shop" className="btn-premium px-10 py-4">Explore Collection</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-12 md:py-20 grid gap-10 lg:grid-cols-[1fr_360px] items-start bg-bg-soft-white">

      {/* ── LEFT: Step Flow ──────────────────────── */}
      <section className="space-y-8">

        {/* Progress Indicator */}
        <div className="flex items-center gap-0">
          {STEP_LABELS.map((label, i) => {
            const n = (i + 1) as Step;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-500 ${done ? "bg-accent-terracotta border-accent-terracotta text-white" : active ? "border-accent-terracotta text-accent-terracotta bg-white" : "border-border-light-gray text-text-dark-gray/30 bg-white"}`}>
                    {done ? "✓" : n}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${active || done ? "text-accent-terracotta" : "text-text-dark-gray/30"}`}>{label}</span>
                </div>
                {i < 3 && <div className={`flex-1 h-0.5 mx-1 transition-all duration-700 ${done ? "bg-accent-terracotta" : "bg-border-light-gray"}`} />}
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: Guest / Login ── */}
        {step === 1 && (
          <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-8 space-y-8 ani-reveal">
            <div>
              <h2 className="font-serif text-2xl font-bold italic text-text-rich-black">Who's ordering?</h2>
              <p className="text-sm text-text-dark-gray/60 font-medium mt-1">No account needed. We never force sign-up.</p>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setIsGuest(true)} className={`flex-1 py-4 rounded-xl border-2 font-bold text-sm transition-all ${isGuest ? "border-accent-terracotta bg-accent-terracotta/5 text-accent-terracotta" : "border-border-light-gray text-text-dark-gray hover:border-accent-terracotta/50"}`}>
                Continue as Guest
              </button>
              <button onClick={() => setIsGuest(false)} className={`flex-1 py-4 rounded-xl border-2 font-bold text-sm transition-all ${!isGuest ? "border-accent-terracotta bg-accent-terracotta/5 text-accent-terracotta" : "border-border-light-gray text-text-dark-gray hover:border-accent-terracotta/50"}`}>
                Returning Customer
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/60 mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-bg-soft-white border border-border-light-gray rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors"
                />
              </div>
              {!isGuest && (
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/60 mb-2 block">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-bg-soft-white border border-border-light-gray rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors" />
                </div>
              )}
            </div>

            <button
              disabled={!canProceedStep1}
              onClick={() => { setGuestEmail(email); setStep(2); }}
              className="btn-premium w-full py-5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2: Address ── */}
        {step === 2 && (
          <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-8 space-y-8 ani-reveal">
            <div>
              <h2 className="font-serif text-2xl font-bold italic">Delivery Address</h2>
              <p className="text-sm text-text-dark-gray/60 font-medium mt-1">Pincode auto-fills your city & state.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { key: "fullName", label: "Full Name", placeholder: "Aparna Sharma", type: "text" },
                { key: "phone", label: "Mobile Number", placeholder: "+91 98765 43210", type: "tel" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/60 mb-2 block">{f.label}</label>
                  <input
                    type={f.type}
                    value={(addr as any)[f.key]}
                    onChange={e => updateAddr(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full bg-bg-soft-white border border-border-light-gray rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/60 mb-2 block">Pincode</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={addr.pincode}
                  onChange={e => updateAddr("pincode", e.target.value)}
                  placeholder="560001"
                  className="w-full bg-bg-soft-white border border-border-light-gray rounded-xl px-5 py-4 text-sm font-bold outline-none focus:border-accent-terracotta transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/60 mb-2 block">City</label>
                <input
                  type="text"
                  value={addr.city}
                  onChange={e => updateAddr("city", e.target.value)}
                  placeholder="Auto-filled from pincode"
                  className="w-full bg-bg-soft-white border border-border-light-gray rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/60 mb-2 block">Address Line</label>
                <input
                  type="text"
                  value={addr.addressLine}
                  onChange={e => updateAddr("addressLine", e.target.value)}
                  placeholder="House No, Building, Street, Area"
                  className="w-full bg-bg-soft-white border border-border-light-gray rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/60 mb-2 block">Landmark (Optional)</label>
                <input
                  type="text"
                  value={addr.landmark}
                  onChange={e => updateAddr("landmark", e.target.value)}
                  placeholder="Near St. Mary's Church"
                  className="w-full bg-bg-soft-white border border-border-light-gray rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="h-14 px-8 rounded-xl border-2 border-border-light-gray text-text-dark-gray font-bold text-sm hover:border-accent-terracotta transition-all">← Back</button>
              <button
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
                className="flex-1 btn-premium py-4 text-sm disabled:opacity-40"
              >
                Save Address →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Delivery ── */}
        {step === 3 && (
          <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-8 space-y-8 ani-reveal">
            <h2 className="font-serif text-2xl font-bold italic">Delivery Options</h2>

            <div className="space-y-4">
              {[
                { key: "standard", label: "Standard White-Glove", desc: "Delivery in 7-10 days • Free on orders above ₹50,000", price: shipping === 0 ? "FREE" : fmt(499) },
                { key: "express", label: "Express Priority", desc: "Delivery in 2 days • Includes assembly & installation", price: fmt(999) },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setDeliveryOption(opt.key as any)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${deliveryOption === opt.key ? "border-accent-terracotta bg-accent-terracotta/5" : "border-border-light-gray hover:border-accent-terracotta/40"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-bold text-text-rich-black">{opt.label}</p>
                      <p className="text-xs text-text-dark-gray/60 font-medium">{opt.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-black text-sm ${deliveryOption === opt.key ? "text-accent-terracotta" : "text-text-dark-gray"}`}>{opt.price}</span>
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${deliveryOption === opt.key ? "border-accent-terracotta" : "border-border-light-gray"}`}>
                        {deliveryOption === opt.key && <div className="h-2.5 w-2.5 rounded-full bg-accent-terracotta" />}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Slot Selection */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Preferred Delivery Slot</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "morning", label: "Morning", time: "9am – 1pm" },
                  { key: "afternoon", label: "Afternoon", time: "1pm – 5pm" },
                  { key: "evening", label: "Evening", time: "5pm – 9pm" },
                ].map(slot => (
                  <button
                    key={slot.key}
                    onClick={() => setDeliverySlot(slot.key)}
                    className={`py-4 px-3 rounded-xl border-2 text-center transition-all ${deliverySlot === slot.key ? "border-accent-terracotta bg-accent-terracotta/5" : "border-border-light-gray hover:border-accent-terracotta/40"}`}
                  >
                    <p className="text-xs font-black text-text-rich-black">{slot.label}</p>
                    <p className="text-[10px] text-text-dark-gray/50 font-medium">{slot.time}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="h-14 px-8 rounded-xl border-2 border-border-light-gray font-bold text-sm hover:border-accent-terracotta transition-all">← Back</button>
              <button onClick={() => setStep(4)} className="flex-1 btn-premium py-4 text-sm">Choose Payment →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Payment ── */}
        {step === 4 && (
          <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-8 space-y-8 ani-reveal">
            <h2 className="font-serif text-2xl font-bold italic">Secure Payment</h2>

            <div className="space-y-3">
              {[
                { key: "upi", icon: "📱", label: "UPI", desc: "Pay via Google Pay, PhonePe, Paytm" },
                { key: "card", icon: "💳", label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex, Rupay" },
                { key: "netbanking", icon: "🏦", label: "Net Banking", desc: "All major Indian banks" },
                { key: "cod", icon: "💵", label: "Cash on Delivery", desc: "Available for orders below ₹50,000" },
                { key: "emi", icon: "📊", label: "EMI / Pay Later", desc: "0% EMI on select cards • No Cost EMI" },
              ].map(m => (
                <button
                  key={m.key}
                  disabled={m.key === "cod" && total > 50000}
                  onClick={() => setPayMethod(m.key)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-4 ${payMethod === m.key ? "border-accent-terracotta bg-accent-terracotta/5" : "border-border-light-gray hover:border-accent-terracotta/40"} disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-text-rich-black">{m.label}</p>
                    <p className="text-[10px] text-text-dark-gray/50 font-medium">{m.desc}</p>
                  </div>
                  <div className={`h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${payMethod === m.key ? "border-accent-terracotta" : "border-border-light-gray"}`}>
                    {payMethod === m.key && <div className="h-2.5 w-2.5 rounded-full bg-accent-terracotta" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-dark-gray/30 bg-bg-soft-white rounded-xl px-5 py-3">
              <span>🔐</span>
              <span>256-bit SSL encrypted. Your payment data is never stored.</span>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(3)} className="h-16 px-8 rounded-xl border-2 border-border-light-gray font-bold text-sm hover:border-accent-terracotta transition-all">← Back</button>
              <button
                onClick={handlePayNow}
                disabled={paying}
                className={`flex-1 btn-premium py-4 text-sm ${paying ? "opacity-80 cursor-wait" : ""}`}
              >
                {paying ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Processing...
                  </span>
                ) : (
                  `🟤 Pay ${fmt(total)}`
                )}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── RIGHT: Order Summary ─────────────────── */}
      <aside className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-6 space-y-6 sticky top-24">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Order Summary ({cartItems.length} items)</p>

        <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
          {cartItems.map((item, i) => (
            <div key={i} className="flex gap-4 items-center">
              <img src={item.product.image} className="h-14 w-14 object-contain bg-bg-soft-white rounded-lg border border-border-light-gray p-1" alt={item.product.name} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-text-rich-black line-clamp-1">{item.product.name}</p>
                <p className="text-[10px] text-text-dark-gray/50">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-text-rich-black flex-shrink-0">{fmt(item.product.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-3 border-t border-border-light-gray text-sm">
          <div className="flex justify-between text-text-dark-gray/60"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          {productDiscount > 0 && <div className="flex justify-between text-green-600 font-bold"><span>Product Savings</span><span>−{fmt(productDiscount)}</span></div>}
          {couponDiscount > 0 && <div className="flex justify-between text-accent-terracotta font-bold"><span>Coupon</span><span>−{fmt(couponDiscount)}</span></div>}
          <div className="flex justify-between text-text-dark-gray/60"><span>GST (18%)</span><span>{fmt(gst)}</span></div>
          <div className="flex justify-between text-text-dark-gray/60"><span>Shipping</span><span className={shipping === 0 ? "text-green-600 font-bold" : ""}>{shipping === 0 ? "FREE" : fmt(shipping)}</span></div>
          <div className="flex justify-between font-black text-text-rich-black text-base pt-2 border-t border-border-light-gray">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-dark-gray/30">Includes GST & White-Glove Delivery</p>
        </div>
      </aside>
    </main>
  );
}
