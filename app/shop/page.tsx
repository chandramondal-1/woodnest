"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("relevance");

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => (selectedCategory === "All" || p.category.includes(selectedCategory)))
      .filter(p => p.price <= priceRange)
      .filter(p => p.rating >= minRating)
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, priceRange, minRating, sortBy]);

  return (
    <main className="mx-auto max-w-[var(--max-width)] px-6 py-12 md:py-24 space-y-12">
      {/* 1. Refined Breadcrumbs */}
      <nav className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ani-page-reveal">
         <Link href="/" className="hover:text-market-blue transition-colors">Archive</Link>
         <span>❯</span>
         <span className="text-slate-900">Catalog Collection</span>
      </nav>

      <div className="grid lg:grid-cols-[300px_1fr] gap-20 items-start">
        {/* 2. Premium Sidebar Filters */}
        <aside className="bg-white soft-shadow rounded-3xl p-8 space-y-12 border border-black/5 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-hide ani-page-reveal">
           <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 border-b border-black/5 pb-4">Configuration</h2>
              
              <div className="space-y-6 pt-4">
                 <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categories</p>
                    <div className="flex flex-col gap-3">
                       {["All", "1 Seater", "2 Seater", "3 Seater", "L Shape", "Recliner"].map(c => (
                          <label key={c} className="flex items-center gap-3 text-[13px] font-bold text-slate-600 cursor-pointer group transition-all hover:translate-x-1">
                             <input 
                               type="radio" 
                               name="cat" 
                               checked={selectedCategory === c} 
                               onChange={() => setSelectedCategory(c)} 
                               className="h-4 w-4 accent-market-blue" 
                             />
                             <span className="group-hover:text-market-blue">{c}</span>
                          </label>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Investment Range</p>
                    <input 
                      type="range" 
                      max={100000} 
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none accent-market-blue cursor-pointer" 
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-[11px] font-black text-slate-900">
                       <span>₹0</span>
                       <span className="text-market-blue">₹{priceRange.toLocaleString()}</span>
                    </div>
                 </div>

                 <div className="space-y-3 pt-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Appraisal Level</p>
                    {[4, 3].map(r => (
                      <label key={r} className="flex items-center gap-3 text-[13px] font-bold text-slate-600 cursor-pointer group" onClick={() => setMinRating(r)}>
                         <input type="radio" name="rating" className="h-4 w-4 accent-market-blue" />
                         <span className="group-hover:text-market-blue">{r}★ & Certified Above</span>
                      </label>
                    ))}
                 </div>
              </div>
           </div>

           <button 
             onClick={() => { setSelectedCategory("All"); setPriceRange(100000); setMinRating(0); }}
             className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50 transition"
           >
              Reset Filters
           </button>
        </aside>

        {/* 3. Immersive Results Area */}
        <section className="space-y-12">
           {/* Sort & Header Refinement */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-black/5 ani-page-reveal">
              <div className="space-y-1">
                 <h1 className="text-2xl font-bold tracking-tight text-slate-900">{filteredProducts.length} Commissionable Pieces</h1>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Authentically sourced and design-certified</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <span className="hidden sm:inline">Preference:</span>
                 <div className="flex gap-6 overflow-x-auto whitespace-nowrap">
                    {[["relevance", "Popularity"], ["price-low", "Value Low"], ["price-high", "Value High"], ["rating", "Appraisal"]].map(([val, label]) => (
                       <button 
                         key={val} 
                         onClick={() => setSortBy(val)}
                         className={`hover:text-market-blue transition-colors ${sortBy === val ? 'text-market-blue border-b-2 border-market-blue pb-1' : ''}`}
                       >
                          {label}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* High Breathing Space Grid */}
           <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map(p => (
                <ProductCard key={p.slug} product={p} />
              ))}
           </div>

           {filteredProducts.length === 0 && (
              <div className="py-40 text-center space-y-6 ani-page-reveal">
                 <div className="text-6xl mb-4">🔍</div>
                 <h3 className="section-heading">No Masterpieces Found</h3>
                 <p className="text-slate-400 font-medium">Try refining your architectural filters or broadening the search.</p>
                 <button 
                    onClick={() => { setSelectedCategory("All"); setPriceRange(100000); setMinRating(0); }} 
                    className="btn-premium bg-market-blue text-white"
                 >
                    Restore Full Catalog
                 </button>
              </div>
           )}
        </section>
      </div>
    </main>
  );
}
