"use client";

import { useState, useRef, useEffect } from "react";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Woodie, your AI shopping assistant. How can I help you furnish your home today?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let botResp = "I'm looking into that for you. Our 3-seater sofas seem to be a great match for your interest!";
      if (input.toLowerCase().includes("l shape")) botResp = "Our Aalto L-Shape is currently trending! Would you like to see customization options?";
      if (input.toLowerCase().includes("delivery")) botResp = "We offer free delivery on orders above ₹49,999. Can I check your pincode?";
      
      setMessages(prev => [...prev, { role: "bot", text: botResp }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[2000]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-[#2874f0] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition active:scale-95 ani-float"
        >
           <span className="text-2xl">🤖</span>
           <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white ani-pulse"></span>
        </button>
      ) : (
        <div className="w-80 h-[450px] bg-white border border-[#f0f0f0] rounded-lg shadow-2xl flex flex-col ani-slide-up overflow-hidden">
           <div className="bg-[#2874f0] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <span className="text-xl">🤖</span>
                 <div>
                    <p className="text-sm font-bold">Woodie</p>
                    <p className="text-[10px] opacity-80">AI Shopping Assistant</p>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-xl">×</button>
           </div>
           
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f1f3f6]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} ani-fade`}>
                   <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-[#2874f0] text-white rounded-tr-none' : 'bg-white text-[#212121] shadow-sm rounded-tl-none border border-[#e0e0e0]'}`}>
                      {m.text}
                   </div>
                </div>
              ))}
           </div>

           <div className="p-3 border-t border-[#f0f0f0] bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="Ask Woodie anything..."
                className="flex-1 bg-[#f1f3f6] rounded-full px-4 py-2 text-sm outline-none focus:bg-white focus:border-[#2874f0] border border-transparent transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="text-[#2874f0] font-bold">Send</button>
           </div>
        </div>
      )}
    </div>
  );
}
