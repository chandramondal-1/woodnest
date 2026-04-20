"use client";

import Link from "next/link";
import { useStore } from "@/context/store-context";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <main className="mx-auto max-w-[1248px] px-4 py-6 space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#878787] ani-fade">
         <Link href="/" className="hover:text-[#2874f0]">Home</Link>
         <span>❯</span>
         <Link href="/account" className="hover:text-[#2874f0]">Account</Link>
         <span>❯</span>
         <span>My Wishlist</span>
      </nav>

      <div className="bg-white market-shadow min-h-[400px]">
         <div className="border-b border-[#f0f0f0] p-6">
            <h1 className="text-lg font-bold">My Wishlist ({wishlist.length})</h1>
         </div>

         {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center gap-6 ani-zoom">
               <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/empty-wishlist-5079a4.png" width="200" alt="empty" />
               <p className="text-xl font-bold">Empty Wishlist!</p>
               <p className="text-sm text-[#878787]">You have no items in your wishlist. Start adding!</p>
               <Link href="/shop" className="bg-[#2874f0] text-white px-12 py-3 font-bold rounded-sm shadow-md">Continue Shopping</Link>
            </div>
         ) : (
            <div className="grid gap-px bg-[#f0f0f0] border-t border-[#f0f0f0] sm:grid-cols-2 lg:grid-cols-4">
               {wishlist.map(product => (
                 <div key={product.slug} className="bg-white p-4">
                    <ProductCard product={product} />
                 </div>
               ))}
            </div>
         )}
      </div>
    </main>
  );
}
