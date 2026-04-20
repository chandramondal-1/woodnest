"use client";

import { useState, useEffect } from "react";
import { useStore, OrderRecord, OrderStatus } from "@/context/store-context";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const ADMIN_PIN = "WOOD2024";

const ALL_STATUSES: OrderStatus[] = [
  "pending", "confirmed", "packed", "shipped", "out_for_delivery", "delivered",
  "cancelled", "return_requested", "returned", "refunded"
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending:          "Pending",
  confirmed:        "Confirmed",
  packed:           "Packed",
  shipped:          "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered:        "Delivered",
  cancelled:        "Cancelled",
  return_requested: "Return Requested",
  returned:         "Returned",
  refunded:         "Refunded",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:          "bg-amber-100 text-amber-700",
  confirmed:        "bg-blue-100 text-blue-700",
  packed:           "bg-purple-100 text-purple-700",
  shipped:          "bg-indigo-100 text-indigo-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered:        "bg-green-100 text-green-700",
  cancelled:        "bg-red-100 text-red-600",
  return_requested: "bg-amber-100 text-amber-700",
  returned:         "bg-gray-100 text-gray-600",
  refunded:         "bg-teal-100 text-teal-700",
};

export default function AdminPage() {
  const { orderHistory, updateOrderStatus, cancelOrder } = useStore();
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const tryUnlock = () => {
    if (pin === ADMIN_PIN) { setUnlocked(true); setPinError(""); }
    else { setPinError("Incorrect PIN. Try WOOD2024."); }
  };

  const filtered = orderHistory.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.address?.fullName || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total:     orderHistory.length,
    pending:   orderHistory.filter(o => ["pending", "confirmed", "packed"].includes(o.status)).length,
    shipped:   orderHistory.filter(o => ["shipped", "out_for_delivery"].includes(o.status)).length,
    delivered: orderHistory.filter(o => o.status === "delivered").length,
    revenue:   orderHistory.filter(o => !["cancelled", "refunded"].includes(o.status)).reduce((s, o) => s + o.total, 0),
  };

  // ── PIN Lock Screen ──
  if (!unlocked) {
    return (
      <main className="min-h-screen bg-text-rich-black flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-3">
            <div className="text-5xl">🔐</div>
            <h1 className="font-serif text-3xl font-bold italic text-white">Admin Panel</h1>
            <p className="text-white/40 font-medium text-sm">WOODNEST Order Management System</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[12px] p-8 space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 block mb-3">Access PIN</label>
              <input
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === "Enter" && tryUnlock()}
                placeholder="Enter admin PIN"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white font-bold text-center text-xl tracking-widest outline-none focus:border-accent-terracotta transition-colors placeholder:text-white/20"
              />
              {pinError && <p className="text-red-400 text-xs font-medium mt-2">{pinError}</p>}
            </div>
            <button onClick={tryUnlock} className="btn-premium w-full py-4 text-sm">Unlock Panel</button>
            <p className="text-[10px] font-medium text-white/20">Hint: WOOD + Year</p>
          </div>
        </div>
      </main>
    );
  }

  // ── Admin Dashboard ──
  return (
    <main className="bg-bg-soft-white min-h-screen">
      {/* Top Bar */}
      <div className="bg-text-rich-black px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold italic text-white">Admin Panel</h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-0.5">WOODNEST Order Management</p>
        </div>
        <button onClick={() => setUnlocked(false)} className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-lg">Lock</button>
      </div>

      <div className="mx-auto max-w-[var(--max-width)] px-6 py-10 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Orders",    value: stats.total,     icon: "📦" },
            { label: "Processing",      value: stats.pending,   icon: "⏳" },
            { label: "In Transit",      value: stats.shipped,   icon: "🚚" },
            { label: "Delivered",       value: stats.delivered, icon: "✅" },
            { label: "Revenue",         value: fmt(stats.revenue), icon: "💰", wide: true },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-[12px] border border-border-light-gray soft-shadow p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{s.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">{s.label}</span>
              </div>
              <p className="text-2xl font-black text-text-rich-black">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search order ID or customer name..."
            className="flex-1 bg-white border border-border-light-gray rounded-xl px-5 py-3 text-sm font-medium outline-none focus:border-accent-terracotta transition-colors soft-shadow"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-white border border-border-light-gray rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-accent-terracotta soft-shadow"
          >
            <option value="all">All Status</option>
            {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[12px] border border-border-light-gray soft-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg-soft-white border-b border-border-light-gray">
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Order ID</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Customer</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Items</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Total</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Status</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Update</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-text-dark-gray/40">Ship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light-gray">
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-16 text-center text-text-dark-gray/40 font-medium">No orders found</td></tr>
                )}
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-bg-soft-white transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-black text-text-rich-black">{order.id}</span>
                      <p className="text-[9px] text-text-dark-gray/40 mt-0.5">{new Date(order.placedAt).toLocaleDateString("en-IN")}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-text-rich-black text-xs">{order.address?.fullName}</p>
                      <p className="text-[10px] text-text-dark-gray/40">{order.address?.city}, {order.address?.pincode}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-text-rich-black font-medium">{order.items.map(i => i.product.name.split(" ").slice(-2).join(" ")).join(", ")}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-text-rich-black">{fmt(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus, trackingInputs[order.id])}
                        className="bg-white border border-border-light-gray rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-accent-terracotta transition-colors"
                      >
                        {ALL_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <input
                          value={trackingInputs[order.id] ?? (order.trackingNumber ?? "")}
                          onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                          placeholder="Tracking #"
                          className="w-28 bg-bg-soft-white border border-border-light-gray rounded-lg px-3 py-1.5 text-xs font-mono outline-none focus:border-accent-terracotta"
                        />
                        <button
                          onClick={() => updateOrderStatus(order.id, "shipped", trackingInputs[order.id])}
                          className="text-[9px] font-black uppercase tracking-wider bg-accent-terracotta text-white px-3 py-1.5 rounded-lg hover:bg-accent-terracotta-dark transition-colors whitespace-nowrap"
                        >
                          Mark Shipped
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-text-dark-gray/30">
          WOODNEST Admin Panel • All data stored in session localStorage
        </p>
      </div>
    </main>
  );
}
