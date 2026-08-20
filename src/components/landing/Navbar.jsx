"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'how-it-works', label: 'How it works', href: '#how-it-works' },
    { id: 'science', label: 'The Science', href: '#science' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 px-6">
        <nav 
          className={cn(
            "max-w-4xl mx-auto rounded-full transition-all duration-300 border border-white/10 px-6 py-2 select-none",
            scrolled 
              ? "bg-black/95 backdrop-blur-md" 
              : "bg-black/40 backdrop-blur-sm"
          )}
        >
          <div className="hidden md:grid grid-cols-3 items-center w-full">
            <div className="flex items-center justify-start">
              <Link href="/" className="cursor-pointer flex items-center select-none">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={64} 
                  height={64} 
                  priority
                  style={{ width: "auto", height: "auto" }}
                  className="rounded-full object-cover shrink-0 filter brightness-110"
                />
              </Link>
            </div>
            
            <div 
              className="flex items-center justify-center gap-1 relative py-1"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  className="relative text-[10px] uppercase tracking-[0.15em] font-semibold px-2 py-2 text-white/75 hover:text-white transition-colors duration-300 rounded-full text-center"
                >
                  <span className="relative z-10">{link.label}</span>
                  {hoveredLink === link.id && (
                    <motion.div
                      key="nav-hover-pill"
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white/10 rounded-full z-0"
                      transition={{ 
                        type: "spring", 
                        stiffness: 380, 
                        damping: 30 
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-full border-transparent bg-transparent hover:bg-white/5 text-white/80 hover:text-white shadow-none text-[10px] uppercase tracking-[0.1em] px-4 py-1.5 transition-colors">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent px-4 py-1.5 text-[10px] uppercase tracking-[0.1em] font-semibold shadow-none transition-colors">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between w-full">
            <Link href="/" className="cursor-pointer flex items-center select-none">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={50} 
                height={32} 
                style={{ width: "auto", height: "auto" }}
                className="rounded-full object-cover shrink-0"
              />
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/signup">
                <Button size="sm" className="rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white border-transparent px-4 py-1.5 text-[10px] uppercase tracking-[0.1em] font-semibold shadow-none">
                  Get Started
                </Button>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full cursor-pointer transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-[#F97316]" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0A0A0F]/98 backdrop-blur-2xl flex flex-col justify-center px-8 py-20 md:hidden"
          >
            <div className="flex flex-col gap-7 text-center max-w-sm mx-auto w-full">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F97316] font-semibold">
                Menu
              </span>

              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-2xl font-light tracking-tight text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="h-px bg-white/10 my-2" />
              
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="lg" className="w-full rounded-full border border-white/10 text-white/80 hover:text-white shadow-none text-xs font-mono uppercase tracking-[0.15em] font-semibold">
                  Log in
                </Button>
              </Link>
              
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" className="w-full rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-mono uppercase tracking-[0.15em] font-bold shadow-none">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

