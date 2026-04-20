"use client";

import { useRef, useEffect, useState, JSX } from "react";

export function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      const tiltX = (y - 0.5) * 15;
      const tiltY = (x - 0.5) * -15;
      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = "transform 0.1s ease-out";
    };

    const handleLeave = () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
}

export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      el.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
      el.style.transition = "transform 0.1s ease-out";
    };

    const handleLeave = () => {
      el.style.transform = `translate(0px, 0px)`;
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}

export function useParallax(strength: number = 20) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return offset * (strength / 100);
}

export function useLetterReveal() {
  const reveal = (text: string, baseDelay: number = 0): JSX.Element[] => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block ani-reveal opacity-0"
        style={{ animationDelay: `${baseDelay + i * 0.03}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };
  return { reveal };
}

export function useCursorSpotlight() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
}
