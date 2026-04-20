"use client";

import type { ReactNode } from "react";
import { useMemo, useState, useEffect } from "react";
import { sofaBuilderBasePrice } from "@/data/products";
import { useStore } from "@/context/store-context";
import { useToast } from "@/components/ui/toaster";
import { useLetterReveal, useMagnetic, useTilt } from "@/hooks/use-luxury-effects";

const steps = {
  shape: ["Straight", "L Shape", "Recliner"],
  seats: ["1", "2", "3", "5", "7"],
  fabric: ["Velvet", "Linen", "Leather"],
  color: ["Sand", "Charcoal", "Forest", "Mocha"],
  finish: ["Oak", "Walnut", "Teak"]
};

export function SofaBuilder() {
  const { addToCart } = useStore();
  const { toast } = useToast();
  const { reveal } = useLetterReveal();
  const magneticRef = useMagnetic(0.2);

  const [shape, setShape] = useState("Straight");
  const [seats, setSeats] = useState("3");
  const [fabric, setFabric] = useState("Velvet");
  const [color, setColor] = useState("Sand");
  const [finish, setFinish] = useState("Walnut");
  const [size, setSize] = useState(96);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animatedQuote, setAnimatedQuote] = useState(0);

  const quote = useMemo(() => {
    const seatPrice = Number(seats) * 4200;
    const shapePrice = shape === "L Shape" ? 12000 : shape === "Recliner" ? 8000 : 0;
    const fabricPrice = fabric === "Leather" ? 9000 : fabric === "Velvet" ? 4500 : 2500;
    const finishPrice = finish === "Walnut" ? 2500 : finish === "Teak" ? 1800 : 1200;
    const sizePrice = Math.max(0, size - 72) * 180;

    return sofaBuilderBasePrice + seatPrice + shapePrice + fabricPrice + finishPrice + sizePrice;
  }, [fabric, finish, seats, shape, size]);

  // Live Price Ticker Animation
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedQuote(prev => {
        if (prev < quote) return Math.min(prev + 500, quote);
        if (prev > quote) return Math.max(prev - 500, quote);
        return prev;
      });
    }, 10);
    return () => clearInterval(timer);
  }, [quote]);

  const handleAddToCart = () => {
    setIsCompleted(true);
    setTimeout(() => {
        addToCart({
            slug: `custom-${shape.toLowerCase()}-${seats}`,
            name: `Custom ${shape} Sofa`,
            price: quote,
            category: "Custom",
            tagline: "Your personalized signature piece.",
            seats: Number(seats),
            originalPrice: quote + 5000,
            rating: 5,
            image: "/assets/products/oslo.png",
            specifications: { "Build": "Custom", "Fabric": fabric, "Base": finish },
        } as any, 1, { color, fabric, finish, size });

        toast("Custom architectural configuration secured.");
        setTimeout(() => setIsCompleted(false), 3000);
    }, 500);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] ani-page-reveal relative">
      {/* Confetti Burst on Success */}
      {isCompleted && (
         <div className="fixed inset-0 z-[5000] pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
               <div 
                 key={i} 
                 className="absolute w-2 h-2 rounded-sm ani-confetti" 
                 style={{ 
                   left: `${Math.random() * 100}%`,
                   backgroundColor: i % 2 === 0 ? '#0055ff' : '#fb641b',
                   animationDelay: `${Math.random()}s`
                 }} 
               />
            ))}
         </div>
      )}

      {/* Step Progress Bar (Animated) */}
      <div className="lg:col-span-2 flex items-center gap-4 mb-2">
         {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
               <div className={`h-full bg-market-blue transition-all duration-1000 ${i <= 3 ? 'w-full' : 'w-0'}`}></div>
            </div>
         ))}
      </div>

      <section className="bg-white rounded-3xl p-8 space-y-12 soft-shadow border border-black/5 ani-reveal">
        <div className="space-y-12">
          <BuilderGroup title="Configuration Shape">
            <ChoiceRow values={steps.shape} selected={shape} onChange={setShape} />
          </BuilderGroup>

          <BuilderGroup title="Seat Accommodation">
            <ChoiceRow values={steps.seats} selected={seats} onChange={setSeats} suffix=" Seater" />
          </BuilderGroup>

          <BuilderGroup title="Commission Fabric">
            <ChoiceRow values={steps.fabric} selected={fabric} onChange={setFabric} />
          </BuilderGroup>

          <BuilderGroup title="Atelier Color Palette">
            <ChoiceRow values={steps.color} selected={color} onChange={setColor} isColor />
          </BuilderGroup>

          <BuilderGroup title="Structural Finish">
            <ChoiceRow values={steps.finish} selected={finish} onChange={setFinish} isFinish />
          </BuilderGroup>

          <BuilderGroup title="Bespoke Dimensions">
            <div className="rounded-2xl bg-market-bg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Architectural Width</span>
                <span className="text-sm font-black text-market-blue">{size} in</span>
              </div>
              <input
                type="range"
                min={72}
                max={132}
                step={2}
                value={size}
                onChange={(event) => setSize(Number(event.target.value))}
                className="w-full appearance-none h-1 bg-slate-200 rounded-lg accent-market-blue cursor-pointer"
              />
            </div>
          </BuilderGroup>
        </div>
      </section>

      <section className="bg-slate-900 rounded-3xl p-8 text-white soft-shadow-lg flex flex-col justify-between ani-reveal h-full">
        {/* Live Configurator Preview with Shape Morph */}
        <div className="relative mb-12 aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/5 group">
            <div className="absolute top-6 left-6 flex flex-col">
               <p className="text-[10px] font-black text-market-yellow uppercase tracking-[0.4em] mb-1">Live Appraisal</p>
               <h2 className="text-2xl font-bold tracking-tight">{shape} {seats} Seater</h2>
            </div>

            {/* Shape Morph Simulation */}
            <div className={`transition-all duration-1000 transform ${shape === 'L Shape' ? 'scale-125' : shape === 'Recliner' ? 'scale-90 rotate-6' : 'scale-100'}`}>
               <img 
                 src={shape === 'L Shape' ? "/assets/products/aalto.png" : "/assets/products/oslo.png"} 
                 className="h-40 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
                 alt="preview" 
               />
            </div>

            <div className="absolute bottom-6 left-6 flex gap-3">
               <div className="h-6 w-12 rounded-full border border-white/20 bg-[#8f6549] ani-glow shadow-xl" title={finish} />
               <div className="h-6 w-12 rounded-full border border-white/20 bg-[#d4b08d] ani-glow shadow-xl" style={{ animationDelay: '0.5s' }} title={color} />
            </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <SummaryItem label="Fabric" value={fabric} />
            <SummaryItem label="Atelier Color" value={color} />
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
             <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Investment Ticker</p>
             <div className="flex items-center justify-between">
                <p className="text-4xl font-black text-market-yellow tracking-tighter">
                   {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(animatedQuote)}
                </p>
                <span className="text-[10px] font-bold text-white/20 border border-white/20 px-2 py-0.5 rounded">PRIVÉ VERIFIED</span>
             </div>
          </div>

          <div className="space-y-4">
             <button 
               ref={magneticRef as any}
               onClick={handleAddToCart}
               className="w-full btn-premium bg-market-blue hover:bg-white hover:text-market-blue"
             >
               SUBMIT BESPOKE COMMISSION ❯
             </button>
             <p className="text-[10px] text-center text-white/30 font-bold uppercase tracking-widest">
               Includes Bespoke logistics, onsite curation and lifetime structure warranty.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function BuilderGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-6">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-2">{title}</h3>
      {children}
    </div>
  );
}

function ChoiceRow({
  values,
  selected,
  onChange,
  suffix = "",
  isColor = false,
  isFinish = false
}: {
  values: string[];
  selected: string;
  onChange: (value: string) => void;
  suffix?: string;
  isColor?: boolean;
  isFinish?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {values.map((value) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`h-12 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 active:scale-95 group relative overflow-hidden ${
            selected === value
              ? "bg-market-blue text-white shadow-xl shadow-market-blue/20"
              : "bg-slate-50 border border-black/5 text-slate-500 hover:border-market-blue hover:bg-white"
          }`}
        >
          {isColor && (
            <span 
              className="h-4 w-4 rounded-full border border-black/10 group-hover:ani-heart" 
              style={{ backgroundColor: value === "Sand" ? "#d2b48c" : value === "Forest" ? "#228b22" : value.toLowerCase() }} 
            />
          )}
          {value}{suffix}
          {selected === value && <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20" />}
        </button>
      ))}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  const tiltRef = useTilt();

  return (
    <div ref={tiltRef as any} className="rounded-2xl border border-white/5 bg-white/5 p-4 group transition-all hover:bg-white/10">
      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-market-yellow transition-colors">{label}</p>
      <p className="mt-1 text-sm font-bold group-hover:translate-x-1 transition-transform">{value}</p>
    </div>
  );
}
