import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Providers from "@/components/Providers";
import HeaderData from "@/components/HeaderData";
import Footer from "@/components/Footer";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bn",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazar">
      <body className={`${hind.variable} min-h-screen flex flex-col bg-base-200`}>
        <Providers>
          <Suspense
            fallback={<div className="h-24 bg-base-100 border-b border-base-300 animate-pulse" />}
          >
            <HeaderData />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
