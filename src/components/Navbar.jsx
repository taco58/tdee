"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-black/60 backdrop-blur-md border-b border-black/10 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick = {() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer flex items-center gap-2">
          <Image src = "/logo.png" alt = "logo" width={100} height={100} className="rounded-full width-auto"/>
        </button>
        
        {/* <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How it Works</a>
          <a href="#dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</a>
        </div> */}

        <div className="flex items-center gap-4">
          <Link href = "/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href = "/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
