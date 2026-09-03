"use client";

import React from "react";

export default function AboutExpertise() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const featureCards = [
    {
      num: "01",
      title: "AI & Problem Solving",
      description: "I enjoy solving real-world problems through AI, computation, automation, and intelligent systems.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Full-Stack Development",
      description: "Experience building web applications and software using modern frontend, backend, and database technologies.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Creative Technology",
      description: "I combine technology with UI/UX design, graphic design, video editing, and 3D modeling to create engaging digital experiences.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Continuous Learning",
      description: "Always exploring new technologies, AI tools, frameworks, and development techniques to keep growing.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
  ];

  const expertiseCards = [
    {
      title: "Artificial Intelligence",
      description: "Exploring AI, machine learning, computer vision, and intelligent automation.",
      tag: "Core Focus",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path strokeLinecap="round" d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3" />
        </svg>
      ),
    },
    {
      title: "Full-Stack Development",
      description: "Building modern web applications with React, Node.js, PHP, and MySQL.",
      tag: "Development",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path strokeLinecap="round" d="m7 8-3 3 3 3m10-6 3 3-3 3" />
        </svg>
      ),
    },
    {
      title: "Computer Vision",
      description: "Working with image processing, computational techniques, and visual intelligence.",
      tag: "AI & Vision",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive, user-centered interfaces and digital experiences.",
      tag: "Design",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m18 2 4 4-12 12H6v-4L18 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m14 6 4 4" />
          <circle cx="6" cy="18" r="2" />
        </svg>
      ),
    },
    {
      title: "Creative Design",
      description: "Graphic design, branding, visual content, and digital media creation.",
      tag: "Branding",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
        </svg>
      ),
    },
    {
      title: "3D & Interactive",
      description: "Exploring Blender, Unity, and Godot for 3D and interactive experiences.",
      tag: "Interactive",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-12 md:gap-16 py-4">
      {/* Top Section: Portrait & About Me Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        {/* Left Column: Portrait with signature overlay */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#d97736]/30 shadow-[0_0_50px_rgba(217,119,54,0.18)] group">
            {/* Ambient Background Glow behind the portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />
            
            {/* Top Amber Edge Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-[#e28743]/20 rounded-full blur-2xl z-10 pointer-events-none" />

            {/* Portrait Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/about-portrait.jpg`}
              alt="Thatila"
              className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `${basePath}/profile-mockup.png`;
              }}
            />

            {/* Signature Overlay at bottom left */}
            <div className="absolute bottom-5 left-6 z-20 select-none">
              <span className="font-serif italic text-3xl sm:text-4xl text-[#e6a86c] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Thatila
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & 4 Feature Cards */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#f59e0b]">
                01 — ABOUT ME
              </span>
              <span className="text-[#f59e0b] text-xs">✦</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif tracking-tight text-white leading-[1.15] mb-4">
              From Code to Intelligent Systems.<br />
              I Build. I Create. <span className="text-[#f59e0b] font-serif italic">I Innovate.</span>
            </h2>

            {/* Tagline / Subtitle */}
            <div className="text-xs sm:text-sm font-semibold text-[#fcd34d] mb-4 tracking-wide">
              Computer Science Undergraduate &bull; AI &amp; Computer Vision Enthusiast &bull; Full-Stack Developer &bull; Creative Technologist
            </div>

            {/* Description */}
            <p className="text-sm md:text-[15px] text-white/90 leading-relaxed mb-8 max-w-3xl">
              I’m a Computer Science undergraduate at Eastern University, Sri Lanka, passionate about Artificial Intelligence, Computer Vision, and intelligent software solutions. I combine programming, problem-solving, and creative design to build technology that is practical, useful, and impactful.
            </p>
          </div>

          {/* 4 Feature mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
            {featureCards.map((card, idx) => (
              <div
                key={idx}
                className="relative p-5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#f59e0b]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)] flex flex-col"
              >
                {/* Subtle top amber glow */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header row with Icon and Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center text-[#f59e0b] group-hover:scale-110 group-hover:border-[#f59e0b]/60 transition-all duration-300">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-oswald font-bold text-[#f59e0b] tracking-wider">
                    {card.num}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2 group-hover:text-[#fcd34d] transition-colors">
                  {card.title}
                </h4>

                <p className="text-xs text-white/85 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section: Expertise That Powers My Work */}
      <div className="flex flex-col mt-4 md:mt-6">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#f59e0b] block mb-2">
            02 — CORE CAPABILITIES
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white">
            Expertise That <span className="text-[#f59e0b] italic font-serif">Powers</span> My Work
          </h3>
        </div>

        {/* 6 Expertise Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {expertiseCards.map((card, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#f59e0b]/50 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] overflow-hidden min-h-[220px]"
            >
              {/* Glow Accent */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#f59e0b]/15 rounded-full blur-xl pointer-events-none group-hover:bg-[#f59e0b]/30 transition-all duration-500" />
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Icon Container */}
                <div className="w-11 h-11 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center text-[#f59e0b] mb-4 group-hover:scale-110 group-hover:border-[#f59e0b]/60 transition-all duration-300 relative z-10">
                  {card.icon}
                </div>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#fcd34d] transition-colors relative z-10">
                  {card.title}
                </h4>

                <p className="text-xs text-white/85 leading-relaxed relative z-10">
                  {card.description}
                </p>
              </div>

              {/* Tag indicator */}
              <div className="mt-4 pt-3 border-t border-white/5 relative z-10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#f59e0b]">
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
