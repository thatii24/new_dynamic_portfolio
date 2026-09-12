"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LiveStatusConnect() {
  const [copied, setCopied] = useState(false);
  const email = "thatilawijayathunga@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#c22026]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Live Status & Fast Pitch */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available For Worldwide Contracts • 2026</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight mb-3">
              Have an Idea? Let&apos;s Build <span className="text-[#ff3b47] italic font-serif">Something Iconic.</span>
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg">
              Whether you need an intelligent AI web application, an ultra-modern design system, or a high-converting web presence, I&apos;m ready to bring your vision to reality.
            </p>

            {/* Fast Stats Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 pt-4 border-t border-white/10 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="text-[#f59e0b]">⚡</span>
                <span>Response in &lt; 24 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#ff3b47]">🌍</span>
                <span>GMT+5:30 (Sri Lanka)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>100% Milestone Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fast Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto shrink-0">
            {/* Direct Contact Button */}
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-[#c22026] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#ff3b47] transition-all duration-300 text-center shadow-[0_0_25px_rgba(194,32,38,0.45)] hover:scale-105 flex items-center justify-center gap-3"
            >
              <span>Book Discovery Chat</span>
              <span className="text-base leading-none">&rarr;</span>
            </Link>

            {/* Quick Copy Email Button */}
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white/90 hover:text-white hover:bg-white/10 hover:border-white/30 text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <svg className="w-4 h-4 text-white/60 group-hover:text-[#ff3b47] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>{copied ? "Email Copied to Clipboard!" : "Copy Direct Email"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
