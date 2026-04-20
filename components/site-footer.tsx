"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteFooter() {
  const [isLaunching, setIsLaunching] = useState(false);

  const scrollToTop = () => {
    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsLaunching(false), 800);
  };

  return (
    <footer className="relative bg-text-rich-black pt-32 pb-12 text-bg-soft-white overflow-hidden">
      {/* Cinematic Wave Divider (Soft White) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-24 w-[200%] fill-bg-soft-white ani-wave">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="mx-auto max-w-[var(--max-width)] px-6 md:px-10">
        <div className="grid gap-20 md:grid-cols-4 ani-reveal">
          <div className="col-span-2 space-y-10">
            <Link href="/" className="flex flex-col group">
              <span className="font-serif text-3xl font-bold tracking-tight text-white transition group-hover:text-accent-terracotta italic">WOODNEST</span>
              <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent-terracotta/60">Privé Boutique</span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-bg-soft-white/40 uppercase tracking-[0.2em] font-bold">
              Defining the frontier of modern luxury through uncompromising craftsmanship and artisanal design since 1994.
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-terracotta">Catalog Archive</p>
            <nav className="flex flex-col gap-5 text-xs font-bold uppercase tracking-[0.2em] text-bg-soft-white/40">
               <Link href="/shop" className="hover:text-white transition-colors">Digital Collections</Link>
               <Link href="/shop" className="hover:text-white transition-colors">Atelier Gallery</Link>
               <Link href="/shop" className="hover:text-white transition-colors">Materials & Care</Link>
               <Link href="/shop" className="hover:text-white transition-colors">Artisan Stories</Link>
            </nav>
          </div>

          <div className="space-y-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-terracotta">Sanctuary List</p>
            <div className="space-y-6">
               <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="architect@atelier.com" 
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-xs outline-none focus:border-accent-terracotta transition-all text-white placeholder:text-white/20 font-serif italic"
                  />
                  <button className="absolute right-0 bottom-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent-terracotta hover:text-white transition-colors">
                     Submit
                  </button>
               </div>
               <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Join for priority architectural access.</p>
            </div>
          </div>
        </div>

        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[9px] font-bold uppercase tracking-[0.5em] text-white/20">
           <p className="hover:text-white transition-all cursor-default">© 2026 WOODNEST ARCHIVE. DESIGNED FOR COZY LIVING.</p>
           
           {/* Terracotta Rocket Scroll (Zenith) */}
           <button 
             onClick={scrollToTop}
             className={`flex flex-col items-center gap-5 transition-all duration-700 group ${isLaunching ? 'ani-rocket text-accent-terracotta' : 'hover:scale-110'}`}
           >
              <span className="group-hover:text-accent-terracotta transition-colors">Launch to Zenith</span>
              <span className="text-2xl group-hover:ani-bounce">🟤</span>
           </button>

           <div className="flex gap-10">
              <Link href="#" className="hover:text-accent-terracotta transition-all hover:-translate-y-1">Instagram</Link>
              <Link href="#" className="hover:text-accent-terracotta transition-all hover:-translate-y-1">Behance</Link>
              <Link href="#" className="hover:text-accent-terracotta transition-all hover:-translate-y-1">Pinterest</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
