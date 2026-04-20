"use client";

import Link from "next/link";
import { useStore } from "@/context/store-context";

export default function AccountDashboard() {
  const { loyaltyPoints, wishlist, cartItems } = useStore();

  const menuGroups = [
    {
      title: "Orders",
      items: [
        { label: "My Orders", icon: "📦" },
        { label: "My Returns", icon: "⎌" },
        { label: "Order Tracking", icon: "📍" }
      ]
    },
    {
      title: "Account Settings",
      items: [
        { label: "Profile Information", icon: "👤" },
        { label: "Manage Addresses", icon: "🏡" },
        { label: "PAN Card Information", icon: "💳" }
      ]
    },
    {
      title: "Payments",
      items: [
        { label: "Gift Cards", icon: "🎁" },
        { label: "Saved Cards", icon: "💳" },
        { label: "UPI Identifiers", icon: "🔗" }
      ]
    }
  ];

  return (
    <main className="mx-auto max-w-[1248px] px-4 py-8 grid gap-4 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="space-y-4">
         <div className="bg-white market-shadow p-3 flex items-center gap-3 ani-slide-right">
            <div className="h-12 w-12 rounded-full bg-[#2874f0] text-white flex items-center justify-center font-bold">RM</div>
            <div>
               <p className="text-[10px] text-[#878787] font-bold">Hello,</p>
               <p className="text-sm font-bold">Rahul Mondal</p>
            </div>
         </div>

         <nav className="bg-white market-shadow divide-y divide-[#f0f0f0] ani-slide-right stagger-1">
            {menuGroups.map((group) => (
              <div key={group.title} className="p-1">
                 <p className="px-4 py-3 text-xs font-bold text-[#878787] uppercase tracking-widest">{group.title}</p>
                 <div className="flex flex-col">
                    {group.items.map((item) => (
                      <button key={item.label} className="flex items-center gap-4 px-4 py-3 text-sm font-medium hover:bg-[#f5faff] transition group">
                         <span className="text-lg group-hover:scale-125 transition-transform">{item.icon}</span>
                         <span className="group-hover:text-[#2874f0]">{item.label}</span>
                         <span className="ml-auto text-[#878787] opacity-0 group-hover:opacity-100">❯</span>
                      </button>
                    ))}
                 </div>
              </div>
            ))}
            <button className="w-full flex items-center gap-4 px-4 py-4 text-sm font-bold text-[#2874f0] hover:bg-red-50 hover:text-red-600 transition">
               <span>🚪</span>
               <span>Logout</span>
            </button>
         </nav>
      </aside>

      {/* Main Content */}
      <section className="space-y-4">
         <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white market-shadow p-6 text-center space-y-2 ani-zoom stagger-1 border-t-2 border-[#ff9f00]">
               <p className="text-3xl">🪙</p>
               <p className="text-xl font-black text-[#212121]">{loyaltyPoints}</p>
               <p className="text-xs font-bold text-[#878787] uppercase">SuperCoins</p>
            </div>
            <div className="bg-white market-shadow p-6 text-center space-y-2 ani-zoom stagger-2 border-t-2 border-[#2874f0]">
               <p className="text-3xl">❤️</p>
               <p className="text-xl font-black text-[#212121]">{wishlist.length}</p>
               <p className="text-xs font-bold text-[#878787] uppercase">In Wishlist</p>
            </div>
            <div className="bg-white market-shadow p-6 text-center space-y-2 ani-zoom stagger-3 border-t-2 border-[#fb641b]">
               <p className="text-3xl">🛒</p>
               <p className="text-xl font-black text-[#212121]">{cartItems.length}</p>
               <p className="text-xs font-bold text-[#878787] uppercase">In Cart</p>
            </div>
         </div>

         <div className="bg-white market-shadow p-8 reveal-on-scroll">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-6 mb-6">
               <h2 className="text-xl font-bold">Recent Orders</h2>
               <button className="text-sm font-bold text-[#2874f0] hover:underline">VIEW ALL ORDERS</button>
            </div>
            <div className="flex flex-col items-center justify-center py-10 opacity-50 space-y-4">
               <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/empty-orders-5079a4.png" width="120" alt="empty" />
               <p className="text-sm font-bold">No orders found in the last 6 months.</p>
            </div>
         </div>

         <div className="bg-white market-shadow p-8 reveal-on-scroll">
             <h2 className="text-xl font-bold border-b border-[#f0f0f0] pb-6 mb-6">Recommended for You</h2>
             <p className="text-sm text-[#878787]">Sync your furniture preferences tailored to your apartment scale.</p>
             <Link href="/customize" className="mt-6 inline-block bg-[#2874f0] text-white px-8 py-3 text-sm font-bold rounded-sm">OPEN CUSTOMIZER</Link>
         </div>

         {/* Marketing Banner */}
         <div className="rounded-sm overflow-hidden market-shadow h-32 bg-[linear-gradient(90deg,#2874f0,#fb641b)] p-8 flex items-center justify-between reveal-on-scroll">
            <div className="text-white">
               <p className="text-lg font-black italic">UPGRADE TO GOLD STATUS</p>
               <p className="text-xs font-bold">Shop for ₹2,450 more to unlock free priority delivery.</p>
            </div>
            <button className="bg-white text-[#2874f0] px-6 py-2 rounded-sm font-bold text-xs shadow-lg ani-pulse">UPGRADE NOW</button>
         </div>
      </section>
    </main>
  );
}
