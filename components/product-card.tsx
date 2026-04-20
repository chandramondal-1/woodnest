"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { useStore } from "@/context/store-context";
import { useToast } from "@/components/ui/toaster";
import { useState } from "react";
import { useTilt } from "@/hooks/use-luxury-effects";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { toast } = useToast();
  const [isFlying, setIsFlying] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const tiltRef = useTilt();

  const isFavorited = isInWishlist(product.slug);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlying(true);
    setTimeout(() => {
      addToCart(product, 1, { color: product.colors[0], fabric: product.fabric[0] });
      toast(`Secured ${product.name} in your bag.`);
      setIsFlying(false);
    }, 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHeartAnimating(true);
    toggleWishlist(product);
    setTimeout(() => setIsHeartAnimating(false), 400);
  };

  return (
    <article 
      ref={tiltRef as any}
      className={`group relative bg-bg-soft-white rounded-[12px] overflow-hidden soft-shadow hover-shadow ani-page-reveal border border-border-muted ${isFlying ? 'ani-fly-to-cart' : ''}`}
    >
      {/* 1. Shimmering Texture Container */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-[#fafafa] overflow-hidden ani-shimmer">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-contain p-6 transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Floating Tag */}
        {product.trending && (
          <div className="absolute left-4 top-4 bg-accent-terracotta text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg group-hover:ani-heart">
            Premium Choice
          </div>
        )}

        {/* Wishlist Icon with Heart Animation */}
        <button 
          onClick={handleWishlist}
          className={`absolute right-4 top-4 z-20 h-11 w-11 bg-white/90 backdrop-blur rounded-full flex items-center justify-center transition-all shadow-sm ${isHeartAnimating ? 'ani-heart' : ''} ${isFavorited ? 'text-accent-terracotta' : 'text-text-dark-gray/40'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </Link>

      <div className="p-8 space-y-5">
        <div className="space-y-1">
           <Link href={`/product/${product.slug}`} className="text-lg font-bold text-text-rich-black group-hover:text-accent-terracotta transition-colors line-clamp-1">{product.name}</Link>
           <p className="text-[10px] font-bold uppercase tracking-widest text-text-dark-gray/60">{product.category} • Handcrafted Collective</p>
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1.5 text-xs font-bold text-text-rich-black px-2 py-0.5 rounded-full bg-accent-terracotta/5">
              <span className="text-accent-terracotta">{product.rating}</span>
              <span className="text-accent-terracotta">★</span>
           </div>
           <span className="text-[10px] font-bold text-text-dark-gray/40 italic">({product.reviews} appraisals)</span>
        </div>

        {/* Terracotta Price Section */}
        <div className="flex items-baseline gap-4 pt-3 border-t border-border-light-gray">
           <span className="text-2xl font-bold text-text-rich-black tracking-tight">{formatCurrency(product.price)}</span>
           {discountPercent > 0 && (
             <div className="flex items-center gap-2">
                <span className="text-sm text-text-dark-gray/30 line-through tracking-tighter">{formatCurrency(product.originalPrice)}</span>
                <span className="text-[10px] font-bold text-accent-terracotta bg-accent-terracotta/10 px-2 py-0.5 rounded-full">-{discountPercent}%</span>
             </div>
           )}
        </div>

        {/* Terracotta Primary CTA */}
        <button 
           onClick={handleQuickAdd}
           className="w-full bg-accent-terracotta text-white h-14 rounded-[12px] text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-accent-terracotta-dark shadow-md active:scale-95 flex items-center justify-center gap-3"
        >
           {isFlying ? "💨 SECURING PIECE" : "EXPLORE COLLECTION"}
           {!isFlying && <span className="group-hover:translate-x-2 transition-transform">❯</span>}
        </button>
      </div>

      {/* Animation Overlay */}
      {isFlying && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5000] ani-fly-to-cart">
           <div className="text-5xl">🛋️</div>
        </div>
      )}
    </article>
  );
}
