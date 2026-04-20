import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Legacy
        ink: "#111111",
        walnut: "#8A5A3B",
        "walnut-deep": "#5C3924",
        parchment: "#F7F2EC",
        mist: "#E9E3DC",
        stone: "#CBB8A6",
        // Terracotta & Obsidian System
        "accent-terracotta":      "#A35D45",
        "accent-terracotta-dark": "#8A4D38",
        "bg-soft-white":          "#F5F3F1",
        "text-rich-black":        "#111111",
        "text-dark-gray":         "#444444",
        "border-light-gray":      "#E5E5E5",
        // Market palette (legacy compat)
        "market-blue":            "#A35D45",
        "market-bg":              "#F5F3F1",
        "market-text":            "#111111",
      },
      boxShadow: {
        luxe: "0 24px 60px rgba(17, 17, 17, 0.12)",
        float: "0 14px 30px rgba(17, 17, 17, 0.10)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at top, rgba(255,255,255,0.65), transparent 35%), linear-gradient(135deg, rgba(138,90,59,0.08), rgba(17,17,17,0.04))"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.04)", opacity: "0.8" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
        "pulse-soft": "pulseSoft 2.2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
