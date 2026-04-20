"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore, OrderRecord, OrderStatus } from "@/context/store-context";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const STATUS_LABELS: Record<OrderStatus, { label: string; color: string }> = {
  pending:          { label: "Pending",          color: "bg-amber-100 text-amber-700"     },
  confirmed:        { label: "Confirmed",        color: "bg-blue-100 text-blue-700"       },
  packed:           { label: "Packed",           color: "bg-purple-100 text-purple-700"   },
  shipped:          { label: "Shipped",          color: "bg-indigo-100 text-indigo-700"   },
  out_for_delivery: { label: "Out for Delivery", color: "bg-orange-100 text-orange-700"   },
  delivered:        { label: "Delivered",        color: "bg-green-100 text-green-700"     },
  cancelled:        { label: "Cancelled",        color: "bg-red-100 text-red-600"         },
  return_requested: { label: "Return Requested", color: "bg-amber-100 text-amber-700"     },
  returned:         { label: "Returned",         color: "bg-gray-100 text-gray-600"       },
  refunded:         { label: "Refunded",         color: "bg-teal-100 text-teal-700"       },
};

const CANCEL_REASONS = [
  "Changed my mind", "Found better price elsewhere",
  "Ordered by mistake", "Delivery taking too long", "Other"
];

const RETURN_REASONS = [
  "Product damaged on delivery", "Wrong product received",
  "Does not match description", "Quality not as expected", "Other"
];

export default function AccountPage() {
  const { orderHistory, cancelOrder, returnOrder } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cancelModal, setCancelModal] = useState<{ orderId: string } | null>(null);
  const [returnModal, setReturnModal] = useState<{ orderId: string } | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = orderHistory.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.product.name.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCancel = () => {
    if (cancelModal && cancelReason) {
      cancelOrder(cancelModal.orderId, cancelReason);
      setCancelModal(null); setCancelReason("");
    }
  };

  const handleReturn = () => {
    if (returnModal && returnReason) {
      returnOrder(returnModal.orderId, returnReason);
      setReturnModal(null); setReturnReason("");
    }
  };

  const handlePrint = (order: OrderRecord) => {
    const lines = [
      `WOODNEST — Official Invoice`,
      `Order ID: ${order.id}`,
      `Date: ${new Date(order.placedAt).toLocaleDateString("en-IN")}`,
      ``,
      `Items:`,
      ...order.items.map(i => `  • ${i.product.name} x${i.quantity} = ${fmt(i.product.price * i.quantity)}`),
      ``,
      `Subtotal:  ${fmt(order.subtotal)}`,
      `Discount:  -${fmt(order.couponDiscount)}`,
      `GST:       ${fmt(order.gst)}`,
      `Shipping:  ${order.shipping === 0 ? "FREE" : fmt(order.shipping)}`,
      `Total:     ${fmt(order.total)}`,
      ``,
      `Delivery Address:`,
      `  ${order.address.fullName}`,
      `  ${order.address.addressLine}, ${order.address.city} — ${order.address.pincode}`,
    ].join("\n");

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<pre style="font-family:monospace; padding:40px; font-size:14px">${lines}</pre>`);
      win.print();
    }
  };

  return (
    <main className="mx-auto max-w-[var(--max-width)] px-6 py-12 md:py-20 bg-bg-soft-white min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-serif text-4xl font-bold italic text-text-rich-black">My Orders</h1>
          <p className="text-text-dark-gray/60 font-medium mt-1">{orderHistory.length} total order{orderHistory.length !== 1 ? "s" : ""} in your archive</p>
        </div>
        <Link href="/shop" className="btn-premium text-sm px-8 py-4">Continue Shopping</Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by order ID or product name..."
          className="flex-1 bg-white border border-border-light-gray rounded-xl px-5 py-3 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors soft-shadow"
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-white border border-border-light-gray rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-accent-terracotta transition-colors soft-shadow"
        >
          <option value="all">All Status</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-32 space-y-6">
          <span className="text-8xl block animate-bounce">📦</span>
          <h2 className="font-serif text-2xl italic font-bold text-text-rich-black">No orders yet</h2>
          <p className="text-text-dark-gray/60 font-medium">Your order archive is empty. Start curating your sanctuary.</p>
          <Link href="/shop" className="btn-premium px-10 py-4 inline-block">Explore Collection</Link>
        </div>
      )}

      {/* Order List */}
      <div className="space-y-5">
        {filtered.map(order => {
          const statusMeta = STATUS_LABELS[order.status] ?? STATUS_LABELS.confirmed;
          const isExpanded = expanded === order.id;
          const canCancel = ["pending", "confirmed", "packed"].includes(order.status);
          const canReturn = order.status === "delivered";

          return (
            <div key={order.id} className="bg-white rounded-[12px] border border-border-light-gray soft-shadow overflow-hidden">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : order.id)}>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-sm font-black text-text-rich-black">{order.id}</span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${statusMeta.color}`}>{statusMeta.label}</span>
                  </div>
                  <p className="text-xs text-text-dark-gray/50 font-medium">
                    Placed {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    {" • "}
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    {" • "}
                    {fmt(order.total)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/order/${order.id}`}
                    onClick={e => e.stopPropagation()}
                    className="text-[10px] font-black uppercase tracking-widest text-accent-terracotta border border-accent-terracotta/30 px-4 py-2 rounded-lg hover:bg-accent-terracotta/5 transition-colors"
                  >
                    Track
                  </Link>
                  <button className={`text-text-dark-gray/40 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-border-light-gray px-6 pb-6 space-y-6 ani-reveal">
                  {/* Items */}
                  <div className="space-y-4 pt-6">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <img src={item.product.image} className="h-16 w-16 bg-bg-soft-white rounded-xl border border-border-light-gray object-contain p-2" alt={item.product.name} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-text-rich-black">{item.product.name}</p>
                          <p className="text-xs text-text-dark-gray/50">Qty {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-text-rich-black">{fmt(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div className="text-sm space-y-2 bg-bg-soft-white rounded-xl p-5 border border-border-light-gray">
                    <div className="flex justify-between text-text-dark-gray/60"><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
                    {order.couponDiscount > 0 && <div className="flex justify-between text-accent-terracotta"><span>Coupon</span><span>−{fmt(order.couponDiscount)}</span></div>}
                    <div className="flex justify-between text-text-dark-gray/60"><span>GST</span><span>{fmt(order.gst)}</span></div>
                    <div className="flex justify-between text-text-dark-gray/60"><span>Shipping</span><span>{order.shipping === 0 ? "FREE" : fmt(order.shipping)}</span></div>
                    <div className="flex justify-between font-black text-text-rich-black border-t border-border-light-gray pt-2"><span>Total</span><span>{fmt(order.total)}</span></div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handlePrint(order)}
                      className="text-[10px] font-black uppercase tracking-widest border border-border-light-gray px-4 py-2.5 rounded-lg hover:border-accent-terracotta hover:text-accent-terracotta transition-colors"
                    >
                      📄 Download Invoice
                    </button>
                    {canCancel && (
                      <button
                        onClick={() => setCancelModal({ orderId: order.id })}
                        className="text-[10px] font-black uppercase tracking-widest border border-red-200 text-red-500 px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        ✕ Cancel Order
                      </button>
                    )}
                    {canReturn && (
                      <button
                        onClick={() => setReturnModal({ orderId: order.id })}
                        className="text-[10px] font-black uppercase tracking-widest border border-amber-200 text-amber-600 px-4 py-2.5 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        🔄 Return / Exchange
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Cancel Modal ── */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[3000] flex items-center justify-center p-6">
          <div className="bg-white rounded-[12px] p-8 max-w-md w-full space-y-6 soft-shadow ani-reveal">
            <h3 className="font-serif text-2xl italic font-bold text-text-rich-black">Cancel Order</h3>
            <p className="text-sm text-text-dark-gray/60 font-medium">Please select a reason for cancellation. Refunds are processed within 3-5 business days.</p>
            <div className="space-y-3">
              {CANCEL_REASONS.map(r => (
                <label key={r} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${cancelReason === r ? "border-red-400 bg-red-50" : "border-border-light-gray hover:border-red-200"}`}>
                  <input type="radio" name="cancel" value={r} onChange={() => setCancelReason(r)} className="accent-red-500" />
                  <span className="text-sm font-medium text-text-rich-black">{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setCancelModal(null); setCancelReason(""); }} className="flex-1 h-12 rounded-xl border-2 border-border-light-gray font-bold text-sm hover:border-red-200 transition-all">Keep Order</button>
              <button onClick={handleCancel} disabled={!cancelReason} className="flex-1 h-12 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all disabled:opacity-40">Confirm Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Return Modal ── */}
      {returnModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[3000] flex items-center justify-center p-6">
          <div className="bg-white rounded-[12px] p-8 max-w-md w-full space-y-6 soft-shadow ani-reveal">
            <h3 className="font-serif text-2xl italic font-bold text-text-rich-black">Request Return</h3>
            <p className="text-sm text-text-dark-gray/60 font-medium">Our team will review your return and schedule a pickup within 24 hours of approval.</p>
            <div className="space-y-3">
              {RETURN_REASONS.map(r => (
                <label key={r} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${returnReason === r ? "border-accent-terracotta bg-accent-terracotta/5" : "border-border-light-gray hover:border-accent-terracotta/30"}`}>
                  <input type="radio" name="return" value={r} onChange={() => setReturnReason(r)} className="accent-accent-terracotta" />
                  <span className="text-sm font-medium text-text-rich-black">{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setReturnModal(null); setReturnReason(""); }} className="flex-1 h-12 rounded-xl border-2 border-border-light-gray font-bold text-sm transition-all">Cancel</button>
              <button onClick={handleReturn} disabled={!returnReason} className="flex-1 btn-premium h-12 text-sm disabled:opacity-40">Submit Return</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
