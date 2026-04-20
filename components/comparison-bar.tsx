"use client";

import { useStore } from "@/context/store-context";
import Link from "next/link";

export function ComparisonBar() {
  const { compareList, toggleCompare } = useStore();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-1/2 z-[1500] -translate-x-1/2 w-full max-w-[900px] bg-white border-t-4 border-[#2874f0] shadow-[0_-8px_32px_rgba(0,0,0,0.2)] rounded-t-lg ani-slide-up">
       <div className="flex items-center justify-between p-4 px-8">
          <div className="flex gap-6 items-center">
             {compareList.map(p => (
                <div key={p.slug} className="relative group ani-zoom">
                   <img src={p.image} className="h-12 w-12 object-contain" alt={p.name} />
                   <button 
                     onClick={() => toggleCompare(p)}
                     className="absolute -top-2 -right-2 h-5 w-5 bg-black text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                   >×</button>
                   <p className="text-[9px] font-bold text-center mt-1 truncate w-12">{p.name}</p>
                </div>
             ))}
             {compareList.length < 4 && (
                <div className="h-12 w-12 border-2 border-dashed border-[#e0e0e0] flex items-center justify-center text-[#c2c2c2] text-xs">
                   {4 - compareList.length} more
                </div>
             )}
          </div>

          <div className="flex gap-4">
             <button onClick={() => compareList.forEach(p => toggleCompare(p))} className="text-xs font-bold text-[#878787] hover:text-[#212121]">REMOVE ALL</button>
             <Link href="/compare" className="bg-[#2874f0] text-white px-8 py-2 text-xs font-bold rounded-sm shadow-md transition hover:scale-105 active:scale-95">COMPARE ({compareList.length})</Link>
          </div>
       </div>
    </div>
  );
}
