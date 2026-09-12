"use client";

import React, { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  country: string;
  rating: number;
  review: string;
  projectTag: string;
  avatarInitials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alexandre Mercier",
    role: "Co-Founder & CTO",
    company: "Veloce Mobility",
    country: "France",
    rating: 5,
    review: "Thatila delivered an exceptional UI and web experience for our brand. The attention to interactive micro-details and performance was phenomenal. Our conversion jumped significantly.",
    projectTag: "E-Commerce Web Architecture",
    avatarInitials: "AM"
  },
  {
    name: "David Sterling",
    role: "Product Director",
    company: "Woodcraft Living",
    country: "United Kingdom",
    rating: 5,
    review: "Working with Thatila was seamless from start to finish. He translated our design vision into pixel-perfect Next.js code with zero friction. Truly top-tier engineering talent.",
    projectTag: "Design System & Frontend",
    avatarInitials: "DS"
  },
  {
    name: "Elena Rostova",
    role: "Creative Director",
    company: "Ursanic Digital",
    country: "Germany",
    rating: 5,
    review: "The creative sensibility Thatila brings to web design is rare. The smooth 3D interactions and typography choices elevated our editorial magazine to international standards.",
    projectTag: "Editorial & 3D Interactive",
    avatarInitials: "ER"
  },
  {
    name: "Marcus Vance",
    role: "Lead Strategist",
    company: "Aero Platforms",
    country: "United States",
    rating: 5,
    review: "A versatile full-stack creator. From complex frontend logic to Python automation scripts, he executed every requirement ahead of schedule with immaculate code quality.",
    projectTag: "SaaS Platform & AI Tooling",
    avatarInitials: "MV"
  },
  {
    name: "Kavindu Perera",
    role: "Managing Director",
    company: "Apex Innovations",
    country: "Sri Lanka",
    rating: 5,
    review: "One of the most promising young developers and designers. Highly proactive, dedicated, and capable of executing both AI pipelines and sleek web interfaces effortlessly.",
    projectTag: "Full-Stack System",
    avatarInitials: "KP"
  }
];

export default function TestimonialMarquee() {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#ff3b47]">
              06 — CLIENT ENDORSEMENTS
            </span>
            <span className="text-[#ff3b47] text-xs">✦</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white">
            Trusted by <span className="text-[#ff3b47] italic font-serif">Worldwide Clients</span>
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#ff3b47]">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="text-base drop-shadow-[0_0_8px_rgba(255,59,71,0.6)]">{star}</span>
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-white/80">
            5.0 / 5.0 Average Rating
          </span>
        </div>
      </div>

      {/* Featured Spotlight Card */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff3b47]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Client Avatar Monogram */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#c22026] to-amber-500 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-white font-oswald text-lg">
                  {testimonials[activeTestimonial].avatarInitials}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-xs text-white/60">
                  {testimonials[activeTestimonial].role} &bull; <span className="text-[#ff3b47] font-semibold">{testimonials[activeTestimonial].company}</span> ({testimonials[activeTestimonial].country})
                </p>
              </div>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/80">
              {testimonials[activeTestimonial].projectTag}
            </span>
          </div>

          <p className="text-sm sm:text-base md:text-lg font-serif italic text-white/95 leading-relaxed">
            &ldquo;{testimonials[activeTestimonial].review}&rdquo;
          </p>

          {/* Testimonial Selectors */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`View review from ${testimonials[idx].name}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeTestimonial
                      ? "bg-[#ff3b47] w-8 shadow-[0_0_10px_#ff3b47]"
                      : "bg-white/20 hover:bg-white/50 w-2.5"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTestimonial(prev => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-white/30 flex items-center justify-center transition-all cursor-pointer"
              >
                &larr;
              </button>
              <button
                onClick={() => setActiveTestimonial(prev => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-white/30 flex items-center justify-center transition-all cursor-pointer"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of all mini review snippets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTestimonial(idx)}
            className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              activeTestimonial === idx
                ? "bg-white/10 border-[#ff3b47]/60 shadow-[0_0_20px_rgba(255,59,71,0.2)]"
                : "bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/50"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{item.name}</span>
                <span className="text-[10px] text-white/50">{item.country}</span>
              </div>
              <p className="text-xs text-white/70 line-clamp-2 italic mb-3">
                &ldquo;{item.review}&rdquo;
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3b47]">
              {item.projectTag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
