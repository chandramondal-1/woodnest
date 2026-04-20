"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products, categories, testimonials } from "@/data/products";
import { SubmitPopup } from "@/components/submit-popup";
import { useLetterReveal, useParallax, useMagnetic } from "@/hooks/use-luxury-effects";

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });
  const [showSuccess, setShowSuccess] = useState(false);
  const { reveal } = useLetterReveal();
  const parallaxOffset = useParallax(15);
  const magneticRef = useMagnetic(0.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featured = products.slice(0, 4);

  return (
    <main className="space-y-0 overflow-hidden bg-bg-soft-white">
      {/* 1. Immersive Luxury Hero Banner */}
      <section className="relative h-screen w-full overflow-hidden bg-text-rich-black">
         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
         
         <div 
           className="absolute inset-0 transition-transform duration-[20s] ease-linear overflow-hidden"
           style={{ transform: `scale(${1 + parallaxOffset * 0.0005}) translateY(${parallaxOffset * 0.3}px)` }}
         >
            <img 
              src="https://images.unsplash.com/photo-1550254478-f3806fbdec71?auto=format&fit=crop&q=80&w=2000" 
              className="h-full w-full object-cover opacity-80" 
              alt="Luxury Living Room" 
            />
         </div>

         <div className="absolute inset-0 z-20 flex items-center px-6 md:px-20 max-w-[var(--max-width)] mx-auto">
            <div className="max-w-4xl space-y-10">
               <div className="space-y-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-accent-terracotta ani-reveal opacity-0">
                    Artisanal Craftsmanship • Timeless Comfort
                  </p>
                  <h1 className="hero-heading text-white leading-[1.1]">
                     {reveal("Luxury Sofas Crafted for Modern Living", 0.5)}
                  </h1>
               </div>
               
               <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed ani-reveal opacity-0" style={{ animationDelay: '2.5s' }}>
                 Elegant sofas designed to bring warmth, luxury, and timeless beauty into your living space.
               </p>

               <div className="flex flex-col sm:flex-row gap-6 ani-reveal opacity-0 pt-6" style={{ animationDelay: '3.2s' }}>
                  <Link ref={magneticRef as any} href="/shop" className="btn-premium px-12 py-6 text-sm">🟤 Explore Collection</Link>
                  <button onClick={() => setShowSuccess(true)} className="px-12 py-6 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-all text-sm uppercase tracking-widest">
                    Request Appraisal
                  </button>
               </div>
            </div>
         </div>

         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Discover More</span>
            <div className="h-10 w-[1px] bg-accent-terracotta" />
         </div>
      </section>

      {/* 2. Featured Sofas (Terracotta Themed) */}
      <section className="market-section">
         <div className="space-y-6 mb-24 text-center max-w-3xl mx-auto">
            <h2 className="section-heading text-text-rich-black italic">{reveal("The Masterpiece Collection", 0.1)}</h2>
            <p className="text-text-dark-gray/60 font-medium tracking-[0.2em] uppercase text-xs">Curated architectural silhouettes for the modern atelier</p>
            <div className="h-0.5 w-24 bg-accent-terracotta mx-auto rounded-full" />
         </div>

         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(p => (
              <ProductCard key={p.slug} product={p} />
            ))}
         </div>
      </section>

      {/* 3. Why WOODNEST (Luxury Values) */}
      <section className="market-section bg-bg-soft-white/60 border-y border-border-muted">
         <div className="grid md:grid-cols-4 gap-16 text-center">
            {[
               { title: "Premium Material", icon: "🪵", desc: "Hand-selected kiln-dried hardwoods and artisanal fabrics." },
               { title: "Modern Designs", icon: "📐", desc: "Architectural silhouettes engineered for ergonomic comfort." },
               { title: "Fast Delivery", icon: "🚚", desc: "White-glove concierge delivery to your primary residence." },
               { title: "Affordable Luxury", icon: "💎", desc: "Uncompromising quality accessible through direct atelier pricing." }
            ].map((item, i) => (
               <div key={i} className="space-y-6 group hover:-translate-y-2 transition-transform duration-500">
                  <div className="text-5xl group-hover:scale-125 transition-transform">{item.icon}</div>
                  <h3 className="text-lg font-bold text-text-rich-black uppercase tracking-widest">{item.title}</h3>
                  <p className="text-sm text-text-dark-gray/60 leading-relaxed font-medium">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 4. Customer Appraisals (Testimonials) */}
      <section className="market-section relative overflow-hidden">
         <div className="absolute top-0 left-0 text-[15rem] font-serif opacity-[0.02] -translate-x-20 -translate-y-20 text-accent-terracotta leading-none">“</div>
         
         <div className="max-w-5xl mx-auto space-y-20">
            <h2 className="section-heading text-center italic">Refined Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-12">
               {testimonials.map((t, i) => (
                  <div key={i} className="space-y-8 p-10 bg-white rounded-3xl soft-shadow group hover:bg-text-rich-black transition-colors duration-700">
                     <div className="flex gap-1 text-accent-terracotta">
                        {[1,2,3,4,5].map(s => <span key={s} className="text-xl">★</span>)}
                     </div>
                     <p className="text-lg italic text-text-dark-gray group-hover:text-white/80 transition-colors leading-relaxed">"{t.quote}"</p>
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-bg-soft-white rounded-full flex items-center justify-center font-bold text-text-dark-gray group-hover:bg-accent-terracotta group-hover:text-white transition-all">{t.name[0]}</div>
                        <div>
                           <p className="text-sm font-bold uppercase tracking-widest text-text-rich-black group-hover:text-white transition-colors">{t.name}</p>
                           <p className="text-[10px] font-bold text-accent-terracotta uppercase tracking-[0.2em]">{t.city} • Verified Appraisal</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Contact / Submission Ticker */}
      <section className="market-section bg-text-rich-black py-32">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="section-heading text-white italic">Curate Your Sanctuary</h2>
            <p className="text-white/40 font-medium tracking-[0.3em] uppercase text-xs">Join our Privé List for priority architectural access</p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
               <input 
                 type="email" 
                 placeholder="architect@atelier.com" 
                 className="w-full sm:max-w-sm bg-transparent border-b border-white/20 pb-4 text-lg text-white outline-none focus:border-accent-terracotta transition-colors font-serif italic"
               />
               <button onClick={() => setShowSuccess(true)} className="btn-premium px-12 text-sm uppercase tracking-[0.2em]">Secure Access</button>
            </div>
         </div>
      </section>

      {showSuccess && <SubmitPopup onClose={() => setShowSuccess(false)} />}
    </main>
  );
}
