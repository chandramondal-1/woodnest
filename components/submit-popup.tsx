"use client";

import { useEffect, useState } from "react";

export function SubmitPopup({ onClose }: { onClose: () => void }) {
  const [showRings, setShowRings] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTruck, setShowTruck] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: i % 2 === 0 ? "#A35D45" : "#d4af37",
    }))
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setShowRings(true), 100);
    const timer2 = setTimeout(() => setShowText(true), 1000);
    const timer3 = setTimeout(() => setShowTruck(true), 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <div className="fixed inset-0 z-[4000] flex flex-col items-center justify-center bg-white/95 backdrop-blur-2xl">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-3 rounded-sm ani-confetti"
            style={{
              left: `${p.left}%`,
              top: "-20px",
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Success Circle */}
      <div className="relative flex h-64 w-64 items-center justify-center">
        {showRings && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-accent-terracotta/20 animate-spin" style={{ animationDuration: "8s" }} />
            <div className="absolute inset-6 rounded-full border-2 border-accent-terracotta/10 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
          </>
        )}
        <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-accent-terracotta/10 border-2 border-accent-terracotta shadow-[0_20px_60px_rgba(163,93,69,0.25)]">
          <svg viewBox="0 0 52 52" className="h-14 w-14 text-accent-terracotta" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="26" cy="26" r="25" fill="none" className="ani-line" />
            <path d="M14.1 27.2l7.1 7.2 16.7-16.8" className="ani-line" />
          </svg>
        </div>
      </div>

      {/* Delivery Truck */}
      {showTruck && (
        <div className="absolute top-16 left-0 w-full overflow-hidden pointer-events-none">
          <div className="ani-truck flex items-center gap-3 text-accent-terracotta/50 italic font-black text-xs uppercase tracking-widest">
            <span>Commission Routing to Atelier</span>
            <span className="text-3xl">🚚</span>
          </div>
        </div>
      )}

      {/* Message */}
      <div className="mt-10 text-center space-y-6 max-w-sm px-8">
        {showText && (
          <>
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-terracotta ani-reveal opacity-0">
                Commission Secured
              </p>
              <h2 className="font-serif text-4xl font-bold italic text-text-rich-black ani-reveal opacity-0" style={{ animationDelay: "0.2s" }}>
                Your Masterpiece<br />Is in the Queue.
              </h2>
            </div>
            <p className="text-sm text-text-dark-gray/70 font-medium ani-reveal opacity-0" style={{ animationDelay: "0.4s" }}>
              Our curators are reviewing your configuration.
              Expect an appraisal in your secured channel shortly.
            </p>
            <button
              onClick={onClose}
              className="btn-premium ani-reveal opacity-0"
              style={{ animationDelay: "0.6s" }}
            >
              Return to Archive ❯
            </button>
          </>
        )}
      </div>
    </div>
  );
}
