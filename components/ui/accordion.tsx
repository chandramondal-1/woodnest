"use client";

import { useState, createContext, useContext, ReactNode } from "react";

// ─── Context ──────────────────────────────────────────────────────────────────

type AccordionContextType = {
  value: string | null;
  onValueChange: (val: string) => void;
  type: "single" | "multiple";
  collapsible: boolean;
};

const AccordionContext = createContext<AccordionContextType>({
  value: null,
  onValueChange: () => {},
  type: "single",
  collapsible: true,
});

// ─── Accordion Root ───────────────────────────────────────────────────────────

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  className?: string;
  children: ReactNode;
};

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className = "",
  children,
}: AccordionProps) {
  const [value, setValue] = useState<string | null>(defaultValue ?? null);

  const onValueChange = (val: string) => {
    if (type === "single") {
      setValue(prev => (prev === val && collapsible ? null : val));
    }
  };

  return (
    <AccordionContext.Provider value={{ value, onValueChange, type, collapsible }}>
      <div className={`divide-y ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

// ─── Accordion Item ────────────────────────────────────────────────────────────

type AccordionItemProps = {
  value: string;
  className?: string;
  children: ReactNode;
};

type ItemContextType = { itemValue: string; isOpen: boolean; toggle: () => void };
const ItemContext = createContext<ItemContextType>({
  itemValue: "",
  isOpen: false,
  toggle: () => {},
});

export function AccordionItem({ value, className = "", children }: AccordionItemProps) {
  const { value: activeValue, onValueChange } = useContext(AccordionContext);
  const isOpen = activeValue === value;
  const toggle = () => onValueChange(value);

  return (
    <ItemContext.Provider value={{ itemValue: value, isOpen, toggle }}>
      <div className={`py-2 ${className}`}>{children}</div>
    </ItemContext.Provider>
  );
}

// ─── Accordion Trigger ─────────────────────────────────────────────────────────

type AccordionTriggerProps = {
  className?: string;
  children: ReactNode;
};

export function AccordionTrigger({ className = "", children }: AccordionTriggerProps) {
  const { isOpen, toggle } = useContext(ItemContext);

  return (
    <button
      onClick={toggle}
      className={`flex w-full items-center justify-between py-4 text-left transition-all ${className}`}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className={`flex-shrink-0 text-text-dark-gray/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

// ─── Accordion Content ─────────────────────────────────────────────────────────

type AccordionContentProps = {
  className?: string;
  children: ReactNode;
};

export function AccordionContent({ className = "", children }: AccordionContentProps) {
  const { isOpen } = useContext(ItemContext);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className={`pb-4 ${className}`}>{children}</div>
    </div>
  );
}
