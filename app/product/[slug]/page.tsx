"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { useStore } from "@/context/store-context";
import { useToast } from "@/components/ui/toaster";
import { ProductCard } from "@/components/product-card";
import { SubmitPopup } from "@/components/submit-popup";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export default function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((item) => item.slug === slug);
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed } = useStore();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"desc" | "spec" | "reviews">("desc");
  const [selectedColor, setSelectedColor] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<"idle" | "checking" | "available">("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    notFound();
  }

  const checkDelivery = () => {
    setDeliveryStatus("checking");
    setTimeout(() => setDeliveryStatus("available"), 1000);
  };

  const handleAddToCart = (type: "cart" | "enquiry") => {
    addToCart(product, 1, { color: selectedColor, fabric: product.fabric[0] });
    if (type === "enquiry") {
       setShowSuccess(true);
    } else {
       toast(`Secured in your bag.`);
    }
  };

  const related = products.filter(p => p.slug !== product.slug).slice(0, 4);

  return (
    <main className="mx-auto max-w-[var(--max-width)] px-6 py-12 md:py-24 space-y-24 bg-bg-soft-white">
      {/* 1. Cinematic Commerce Section */}
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* Left: Interactive 360 Showcase */}
        <section className="space-y-8">
          <div className="relative aspect-square rounded-[12px] overflow-hidden bg-white border border-border-light-gray group cursor-ew-resize soft-shadow">
             <img src={product.image} className="h-full w-full object-contain p-12 transition-all duration-1000 group-hover:scale-105 group-active:rotate-y-180" alt={product.name} />
             
             {/* Dimension Lines (Terracotta) */}
             <svg className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" viewBox="0 0 400 400">
                <path d="M50 350 L350 350" stroke="#A35D45" strokeWidth="1" fill="none" className="ani-line" />
                <path d="M50 340 L50 360" stroke="#A35D45" strokeWidth="1" fill="none" />
                <path d="M350 340 L350 360" stroke="#A35D45" strokeWidth="1" fill="none" />
                <text x="200" y="340" fill="#A35D45" fontSize="10" textAnchor="middle" className="font-bold uppercase tracking-widest">Architectural Width: 92 in</text>
             </svg>

             <button 
               onClick={() => toggleWishlist(product)}
               className="absolute right-6 top-6 h-12 w-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-text-dark-gray/40 hover:text-accent-terracotta transition-all border border-border-light-gray hover:ani-heart"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={isInWishlist(product.slug) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
             </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white border border-border-light-gray cursor-pointer hover:border-accent-terracotta transition soft-shadow">
                   <img src={product.image} className="h-full w-full object-contain p-4" alt="thumb" />
                </div>
             ))}
          </div>
        </section>

        {/* Right: Info Dense Segmented UI */}
        <section className="space-y-12">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5 bg-accent-terracotta text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                   {product.rating} ★ Verified Piece
                 </div>
                 <span className="text-xs font-bold text-text-dark-gray/60">{product.reviews} Artisan Appraisals</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-text-rich-black italic">{product.name}</h1>
              <p className="text-xl text-text-dark-gray leading-relaxed max-w-lg font-medium">{product.tagline}</p>
           </div>

           <div className="space-y-3 border-y border-border-light-gray py-10">
              <div className="flex items-baseline gap-6">
                 <span className="text-6xl font-bold text-text-rich-black tracking-tighter">{formatCurrency(product.price)}</span>
                 <span className="text-2xl text-text-dark-gray/30 line-through tracking-tighter italic">{formatCurrency(product.originalPrice)}</span>
              </div>
              <p className="text-xs font-bold text-accent-terracotta uppercase tracking-[0.3em] bg-accent-terracotta/5 inline-block px-4 py-1.5 rounded-full">
                Commission Saving: {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Applied Today
              </p>
           </div>

           {/* Configuration & Pincode (Terracotta Theme) */}
           <div className="space-y-10">
              <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-rich-black">Delivery Logistics</p>
                 <div className="flex flex-col gap-4">
                    <div className="flex max-w-sm border-b-2 border-accent-terracotta pb-3">
                      <input 
                        type="text" 
                        placeholder="Primary Residence Pincode" 
                        className="flex-1 text-sm font-bold bg-transparent outline-none text-text-rich-black placeholder:text-text-dark-gray/30"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                      <button onClick={checkDelivery} className="text-xs font-black uppercase tracking-widest text-accent-terracotta">Verify</button>
                    </div>
                    {deliveryStatus === "available" && (
                       <p className="text-sm font-bold text-text-dark-gray ani-page-reveal">✨ White-Glove Curation available for <span className="text-accent-terracotta underline">April 24</span></p>
                    )}
                 </div>
              </div>

              {/* Terracotta Actions */}
              <div className="grid sm:grid-cols-2 gap-6">
                 <button 
                   onClick={() => handleAddToCart("cart")}
                   className="h-16 rounded-[12px] border-2 border-accent-terracotta text-accent-terracotta font-bold text-xs uppercase tracking-widest hover:bg-accent-terracotta/5 transition-all active:scale-95"
                 >
                    ADD TO BAG
                 </button>
                 <button 
                   onClick={() => handleAddToCart("enquiry")}
                   className="btn-premium h-16 text-sm"
                 >
                    🟤 EXPLORE COLLECTION
                 </button>
              </div>
           </div>

           {/* Trust Badges (Terracotta Icons) */}
           <div className="grid grid-cols-3 gap-8 py-12 border-t border-border-light-gray">
              {[["Secure Checkout", "🛡️"], ["5 Year Warranty", "📜"], ["Atelier Finish", "💎"]].map(([label, icon]) => (
                <div key={label} className="flex flex-col items-center gap-3 text-center group transition hover:-translate-y-1">
                   <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{icon}</span>
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-dark-gray/40 group-hover:text-accent-terracotta transition-colors">{label}</span>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* 2. Structured Narrative Layer */}
      <section className="grid lg:grid-cols-2 gap-24 py-20 border-t border-border-light-gray">
         <div className="space-y-16">
            <div className="space-y-8">
               <h2 className="section-heading italic">Artisanal Narrative</h2>
               <p className="text-xl leading-relaxed text-text-dark-gray max-w-[60ch] font-medium">
                  {product.description}
               </p>
            </div>

            <div className="space-y-10">
               <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-text-rich-black border-b border-border-light-gray pb-4">Specifications</h3>
               <div className="grid gap-8">
                  {Object.entries(product.specifications).map(([k, v]) => (
                     <div key={k} className="flex justify-between items-center group">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-text-dark-gray/40 group-hover:text-accent-terracotta transition-colors">{k}</span>
                        <span className="text-sm font-bold text-text-rich-black tracking-tight">{v}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 3. Inquiries & Appraisals */}
         <div className="space-y-20">
            <div className="space-y-10">
               <h2 className="section-heading italic">Atelier Inquiries</h2>
               <Accordion type="single" collapsible className="w-full">
                  {product.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-border-light-gray">
                      <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.2em] text-text-rich-black hover:text-accent-terracotta text-left">
                         {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-text-dark-gray font-medium">
                         {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
               </Accordion>
            </div>

            <div className="space-y-12">
               <h2 className="section-heading italic">Collector Appraisals</h2>
               <div className="space-y-12">
                  {product.reviews_list.map((r, i) => (
                    <div key={i} className="space-y-5 p-8 bg-white rounded-3xl soft-shadow border border-border-light-gray">
                       <div className="flex items-center gap-4">
                          <span className="text-accent-terracotta text-sm font-bold">{r.rating} ★★★★★</span>
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-rich-black">{r.user}</span>
                       </div>
                       <p className="text-lg italic text-text-dark-gray leading-relaxed font-serif">"{r.comment}"</p>
                       <p className="text-[10px] font-bold text-text-dark-gray/30 uppercase tracking-widest">{r.date} • Verified Commission</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 4. Architectural Complements */}
      <section className="space-y-16 pt-32 border-t border-border-light-gray">
         <div className="text-center space-y-4">
            <h2 className="section-heading italic">Curate the Space</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-dark-gray/40">Architectural Complements for your consideration</p>
         </div>
         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(p => <ProductCard key={p.slug} product={p} />)}
         </div>
      </section>

      {/* Mobile Sticky CTA (Terracotta) */}
      <div className="fixed bottom-0 left-0 right-0 z-[2000] bg-white/95 backdrop-blur-2xl border-t border-border-light-gray p-5 md:hidden ani-page-reveal">
         <button 
           onClick={() => handleAddToCart("enquiry")}
           className="w-full btn-premium py-5 h-auto text-sm"
         >
            🟤 EXPLORE COLLECTION | {formatCurrency(product.price)}
         </button>
      </div>

      {showSuccess && <SubmitPopup onClose={() => setShowSuccess(false)} />}
    </main>
  );
}
