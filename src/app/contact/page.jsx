"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/landing/Footer";
import { CheckCircle2, Send, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", 
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all fields (Name, Email, and Message).");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans flex flex-col justify-between selection:bg-[#F97316]/30">
      <header className="border-b border-white/5 py-4 px-6 md:px-12 backdrop-blur-md bg-black/40 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="AdapTDEE Logo"
              width={80}
              height={80}
              style={{ width: "auto", height: "auto" }}
              className="rounded-full object-cover"
            />
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-16 w-full flex-1">
        <div className="space-y-2 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-white">Contact Us</h1>
          <p className="text-sm text-zinc-400">Send us a message and we&apos;ll get back to you.</p>
        </div>

        {success ? (
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Message Sent!</h2>
            <p className="text-sm text-zinc-400">Thank you for reaching out. We will get back to you soon.</p>
            <button
              onClick={() => {
                setSuccess(false);
                setFormData({ name: "", email: "", message: "", website: "" });
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Honeypot — hidden from real users, bots auto-fill it */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs text-zinc-400">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={200}
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs text-zinc-400">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="block text-xs text-zinc-400">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                maxLength={5000}
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#F97316] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
