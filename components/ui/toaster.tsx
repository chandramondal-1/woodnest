"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type Toast = {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
};

type ToastContextType = {
  toast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex min-w-[280px] items-center justify-between gap-4 rounded-2xl p-4 shadow-luxe animate-in slide-in-from-right-10 fade-in duration-300 ${
              t.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-white text-ink border border-black/5"
            }`}
          >
            <p className="text-sm font-medium">{t.message}</p>
            <button 
                onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))}
                className="text-black/20 hover:text-black"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
