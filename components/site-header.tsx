"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/store-context";
import { products, categories } from "@/data/products";

export function SiteHeader() {
  const { totalCartItems, wishlist } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const suggestions = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="nav-sticky">
      {/* Scroll Progress Bar (Terracotta) */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent-terracotta z-[5000] origin-left transition-transform duration-100"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Top Banner (Warm Context) */}
      <div className="bg-text-rich-black py-2 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-bg-soft-white/60">
        Defining Modern Comfort Through Curated Craftsmanship
      </div>

      <div className="mx-auto flex h-20 w-full max-w-[var(--max-width)] items-center justify-between px-6 md:px-10">
        {/* Brand with Playfair Typography */}
        <Link href="/" className="group flex flex-col ani-reveal">
          <span className="font-serif text-2xl font-bold tracking-tight text-text-rich-black transition group-hover:text-accent-terracotta">WOODNEST</span>
          <div className="h-0.5 w-0 bg-accent-terracotta transition-all duration-500 group-hover:w-full"></div>
        </Link>

        {/* Search - Refined Minimalism */}
        <div ref={searchRef} className="relative hidden flex-1 max-w-[420px] md:block mx-12">
          <div className="flex h-12 w-full items-center bg-bg-soft-white rounded-xl px-5 border border-border-muted focus-within:border-accent-terracotta/40 transition-all shadow-sm">
             <svg className="text-text-dark-gray mr-3" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             <input 
               type="text" 
               placeholder="Discover your next centerpiece..." 
               className="flex-1 bg-transparent text-sm font-medium outline-none text-text-rich-black placeholder:text-text-dark-gray/40"
               value={searchQuery}
               onChange={(e) => {setSearchQuery(e.target.value); setShowSuggestions(true);}}
               onFocus={() => setShowSuggestions(true)}
             />
          </div>

          {showSuggestions && searchQuery.length > 0 && (
             <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-bg-soft-white rounded-2xl shadow-2xl border border-border-muted p-2 ani-page-reveal">
                {suggestions.map(p => (
                  <Link key={p.slug} href={`/product/${p.slug}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-bg-soft-white transition" onClick={() => setShowSuggestions(false)}>
                     <div className="h-12 w-12 bg-bg-soft-white rounded-lg p-1">
                        <img src={p.image} className="h-full w-full object-contain" alt={p.name} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-rich-black">{p.name}</span>
                        <span className="text-[10px] uppercase font-bold text-accent-terracotta tracking-widest">{p.category}</span>
                     </div>
                  </Link>
                ))}
             </div>
          )}
        </div>

        {/* Navigation - Warm Luxury Links */}
        <nav className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-text-dark-gray">
           <Link href="/shop" className="hover:text-accent-terracotta transition-colors border-b-2 border-transparent hover:border-accent-terracotta pb-1">Collection</Link>
           <Link href="/shop" className="hover:text-accent-terracotta transition-colors hidden lg:block">Ateliers</Link>
           
           <div className="flex items-center gap-6 border-l border-border-light-gray pl-8">
              <Link href="/wishlist" className="relative group">
                 <svg className="hover:text-accent-terracotta transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                 {wishlist.length > 0 && <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent-terracotta rounded-full"></span>}
              </Link>

              <Link href="/cart" className="relative flex items-center gap-2 group">
                 <div className="relative">
                    <svg className="group-hover:text-accent-terracotta transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.1-5.38a.5.5 0 0 0-.49-.6H6"/></svg>
                    {totalCartItems > 0 && <span className="absolute -top-2 -right-2 bg-text-rich-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-bg-soft-white font-black">{totalCartItems}</span>}
                 </div>
              </Link>
           </div>
        </nav>
      </div>

      {/* Minimal Category Rail */}
      <div className="bg-bg-soft-white/40 backdrop-blur-sm border-b border-border-muted overflow-x-auto scrollbar-hide py-3">
         <div className="mx-auto flex w-full max-w-[var(--max-width)] items-center justify-center gap-16 px-6">
            {categories.slice(0, 5).map(cat => (
              <Link key={cat.title} href="/shop" className="text-[10px] font-bold tracking-[0.3em] uppercase text-text-dark-gray/60 hover:text-accent-terracotta transition-all whitespace-nowrap">
                {cat.title}
              </Link>
            ))}
         </div>
      </div>
    </header>
  );
}
