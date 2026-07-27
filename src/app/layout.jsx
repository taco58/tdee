import "./globals.css";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: "Adaptive TDEE | Smart Calorie & Metabolic Tracker",
  description: "Track your true calorie maintenance (TDEE) automatically using bodyweight trends and calorie logging. Stop guessing, follow the thermodynamics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased selection:bg-orange-500/30 selection:text-orange-200">{children}</body>
      <Analytics />
    </html>
  );
}