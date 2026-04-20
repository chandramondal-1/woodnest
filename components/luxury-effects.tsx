"use client";

import { useCursorSpotlight } from "@/hooks/use-luxury-effects";

export function LuxuryEffects() {
  useCursorSpotlight();

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* 1. Global Mesh Gradient (Animated) */}
      <div className="absolute inset-0 ani-mesh opacity-40 mix-blend-soft-light" />

      {/* 2. Floating Dust Particles (Simulated with SVG to stay lightweight) */}
      <div className="absolute inset-0 ani-dust opacity-30">
        <svg width="100%" height="100%">
          {[...Array(20)].map((_, i) => (
            <circle 
              key={i}
              cx={`${Math.random() * 100}%`} 
              cy={`${Math.random() * 100}%`} 
              r={Math.random() * 2} 
              fill="white"
              className="ani-dust"
              style={{ animationDelay: `${Math.random() * 5}s`, opacity: Math.random() }}
            />
          ))}
        </svg>
      </div>

      {/* 3. Cinematic Light Rays (Shifting) */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[10%] w-[20%] h-[200%] bg-white/5 blur-[120px] ani-light-ray" />
        <div className="absolute top-0 left-[60%] w-[15%] h-[200%] bg-white/5 blur-[100px] ani-light-ray" style={{ animationDelay: '4s' }} />
      </div>

      {/* 4. Global Grain Texture */}
      <div className="ani-grain fixed inset-0 pointer-events-none mix-blend-overlay opacity-30" />

      {/* 5. Spotlight Cursor Mask (Defined in CSS but active here) */}
      <div className="cursor-spotlight" />
    </div>
  );
}
