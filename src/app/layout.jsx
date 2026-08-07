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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://adaptdee.xyz"),
  title: {
    default: "TDEE Calculator | Adaptive Maintenance Calorie & Metabolic Tracker",
    template: "%s | AdapTDEE",
  },
  description:
    "Calculate your Total Daily Energy Expenditure (TDEE) and track your true maintenance calories using daily weight trend smoothing and calorie logging.",
  keywords: [
    "TDEE calculator",
    "adaptive TDEE",
    "maintenance calorie calculator",
    "metabolic rate tracker",
    "macrofactor alternative",
    "weight trend smoothing",
    "calculate TDEE",
  ],
  authors: [{ name: "AdapTDEE Team" }],
  openGraph: {
    title: "TDEE Calculator | Adaptive Maintenance Calorie & Metabolic Tracker",
    description:
      "Stop guessing your maintenance calories. Calculate baseline TDEE and track your real adaptive expenditure over time.",
    url: "https://adaptdee.xyz",
    siteName: "AdapTDEE",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AdapTDEE Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TDEE Calculator | Adaptive Maintenance Calorie Tracker",
    description: "Calculate baseline TDEE and track your real adaptive expenditure dynamically.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased selection:bg-orange-500/30 selection:text-orange-200" suppressHydrationWarning>{children}</body>
      <Analytics />
    </html>
  );
}