import { Geist, Outfit, Jost} from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-outfit",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-jost",
});