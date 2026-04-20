import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/context/store-context";
import { ToastProvider } from "@/components/ui/toaster";
import { ChatAssistant } from "@/components/chat-assistant";
import { ComparisonBar } from "@/components/comparison-bar";
import { LuxuryEffects } from "@/components/luxury-effects";
import { MiniCart } from "@/components/mini-cart";
import "./globals.css";


export const metadata: Metadata = {
  title: "WOODNEST | Premium Luxury Furniture",
  description:
    "Cinematic furniture experience with 100+ premium animations and luxury finishes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="lux-mesh antialiased">
        <ToastProvider>
          <StoreProvider>
            <LuxuryEffects />
            <SiteHeader />
            <MiniCart />
            {children}
            <ChatAssistant />
            <ComparisonBar />
            <SiteFooter />
          </StoreProvider>

        </ToastProvider>
      </body>
    </html>
  );
}
