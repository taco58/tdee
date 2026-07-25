import { Geist, Outfit, Jost, DM_Sans} from "next/font/google";

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

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
});