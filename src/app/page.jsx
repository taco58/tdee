import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import {outfit} from "@/components/ui/Fonts";

export default function Home() {
  return (
    <main className={`min-h-screen bg-[#242424] text-white selection:bg-orange-500/30 ${outfit.className}`}>
      <Navbar />
      <Hero />
      <Features />
      {/* <Footer /> */}
    </main>
  );
}
