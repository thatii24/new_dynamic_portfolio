"use client";

import React from "react";
import Link from "next/link";

interface Service {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  badge?: string;
  accentColor: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    num: "01",
    title: "Full-Stack Web Engineering",
    subtitle: "High-Performance Modern Web Apps",
    description: "End-to-end development of bespoke web platforms, SaaS applications, and interactive portals with Next.js, React 19, TypeScript, and robust database architectures.",
    deliverables: [
      "Custom responsive architecture with Next.js & Tailwind",
      "API integrations & serverless backend logic",
      "SEO optimization, fast TTFB & lighthouse 95+ score",
      "Database schema & authentication integration"
    ],
    timeline: "2 — 4 Weeks",
    badge: "Most Requested",
    accentColor: "#ff3b47",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    num: "02",
    title: "UI/UX & Design Systems",
    subtitle: "User-Centered Digital Experiences",
    description: "Transforming complex product ideas into sleek, intuitive interfaces with Figma design tokens, interactive micro-animations, and complete component documentation.",
    deliverables: [
      "Figma interactive wireframes & high-fidelity prototypes",
      "Scalable Design System with reusable UI tokens",
      "User research, UX journey mapping & usability audits",
      "Pixel-perfect developer handoff assets"
    ],
    timeline: "1 — 3 Weeks",
    accentColor: "#f59e0b",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    num: "03",
    title: "AI & Computer Vision Integration",
    subtitle: "Intelligent Automation & Vision Pipelines",
    description: "Integrating intelligent machine learning models, OpenCV image processing, and LLM automation into modern applications for smart data processing and visual tools.",
    deliverables: [
      "Custom Python & OpenCV visual recognition pipelines",
      "AI API & Agentic workflow integration",
      "Real-time image classification & enhancement",
      "Interactive AI dashboard interfaces"
    ],
    timeline: "2 — 5 Weeks",
    accentColor: "#38bdf8",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    num: "04",
    title: "Creative 3D & Brand Identity",
    subtitle: "Immersive Visuals & Brand Assets",
    description: "Crafting bold brand identities, 3D product visualizations with Blender, motion graphics reels, and captivating promotional creative media.",
    deliverables: [
      "3D product modeling & web-ready GLTF/renders",
      "Brand logo suite, color palette & typography guide",
      "Motion graphics & promotional video reels",
      "Digital advertising & social campaign assets"
    ],
    timeline: "1 — 2 Weeks",
    accentColor: "#ec4899",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

export default function ServiceOfferings() {
  return (
    <div className="w-full flex flex-col gap-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#ff3b47]">
              05 — SERVICE CAPABILITIES
            </span>
            <span className="text-[#ff3b47] text-xs">✦</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white">
            How We Can <span className="text-[#ff3b47] italic font-serif">Collaborate</span>
          </h3>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c22026] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff3b47] transition-all duration-300 shadow-[0_0_20px_rgba(194,32,38,0.4)] hover:scale-105 self-start md:self-auto"
        >
          <span>Start a Project</span>
          <span className="text-sm leading-none">&rarr;</span>
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="relative p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 group flex flex-col justify-between shadow-2xl hover:-translate-y-1.5"
          >
            {/* Top Accent Line */}
            <div
              className="absolute top-0 left-8 right-8 h-1 rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: service.accentColor }}
            />

            <div>
              {/* Header inside Card */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.accentColor }}
                >
                  {service.icon}
                </div>
                <div className="flex items-center gap-3">
                  {service.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#ff3b47]/20 border border-[#ff3b47]/40 text-[#ff4d5a]">
                      {service.badge}
                    </span>
                  )}
                  <span className="font-oswald text-2xl font-bold text-white/40 group-hover:text-white/80 transition-colors">
                    {service.num}
                  </span>
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                {service.title}
              </h4>
              <p className="text-xs uppercase tracking-wider font-semibold mb-4" style={{ color: service.accentColor }}>
                {service.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-white/10 mb-6">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-3">
                  Scope & Key Deliverables:
                </h5>
                <ul className="flex flex-col gap-2">
                  {service.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-white/80">
                      <span className="text-sm leading-none shrink-0" style={{ color: service.accentColor }}>
                        ✓
                      </span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer: Timeline & Inquire Link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/40">Estimated Turnaround</span>
                <span className="text-xs font-bold text-white">{service.timeline}</span>
              </div>
              <Link
                href="/contact"
                className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white flex items-center gap-1.5 transition-colors group/link"
              >
                <span>Request Scope</span>
                <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
