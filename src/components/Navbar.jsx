"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white italic">A</div>
          <span className="text-xl font-bold tracking-tight text-white">Adaptive TDEE</span>
        </div>
        
        {/* <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How it Works</a>
          <a href="#dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</a>
        </div> */}

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log In</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
