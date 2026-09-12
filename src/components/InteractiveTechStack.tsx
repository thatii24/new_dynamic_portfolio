"use client";

import React, { useState } from "react";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "ai" | "creative" | "tools";
  level: number; // 0 to 100
  experience: string;
  highlight: string;
  badge?: string;
}

const techItems: TechItem[] = [
  // Frontend
  { name: "Next.js & React 19", category: "frontend", level: 95, experience: "3+ Years", highlight: "App Router, SSR, Server Actions", badge: "Primary" },
  { name: "TypeScript", category: "frontend", level: 90, experience: "3+ Years", highlight: "Type Safety, Generics & Strict Typing" },
  { name: "Tailwind CSS v4", category: "frontend", level: 95, experience: "3+ Years", highlight: "Modern Responsive Design Systems" },
  { name: "GSAP & Web Animations", category: "frontend", level: 88, experience: "2+ Years", highlight: "Interactive Scroll, 3D Transforms" },
  
  // Backend & DB
  { name: "Node.js & Express", category: "backend", level: 85, experience: "2+ Years", highlight: "RESTful APIs, Microservices" },
  { name: "PHP & Laravel", category: "backend", level: 82, experience: "2+ Years", highlight: "MVC Architecture & CMS Solutions" },
  { name: "PostgreSQL & MySQL", category: "backend", level: 86, experience: "2+ Years", highlight: "Relational Queries, Schema Design" },
  { name: "REST & GraphQL APIs", category: "backend", level: 85, experience: "2+ Years", highlight: "API Contract & Integration" },

  // AI & Vision
  { name: "Python", category: "ai", level: 90, experience: "3+ Years", highlight: "Data Science, Scripting & Automation", badge: "Core AI" },
  { name: "OpenCV", category: "ai", level: 85, experience: "2+ Years", highlight: "Computer Vision & Image Processing" },
  { name: "TensorFlow / PyTorch", category: "ai", level: 80, experience: "1.5+ Years", highlight: "Model Inference & Classification" },
  { name: "LLMs & Agentic AI", category: "ai", level: 88, experience: "1.5+ Years", highlight: "Prompt Engineering & API Automation" },

  // Creative & 3D
  { name: "Figma & UI Systems", category: "creative", level: 95, experience: "3+ Years", highlight: "Wireframing, Prototyping & Tokens", badge: "Expert" },
  { name: "Blender 3D", category: "creative", level: 82, experience: "2+ Years", highlight: "3D Asset Modeling & Rendering" },
  { name: "Adobe Photoshop", category: "creative", level: 90, experience: "4+ Years", highlight: "Digital Compositing & UI Assets" },
  { name: "Adobe Premiere Pro", category: "creative", level: 86, experience: "3+ Years", highlight: "Video Editing & Motion Design" },

  // Tools & DevOps
  { name: "Git & GitHub", category: "tools", level: 92, experience: "3+ Years", highlight: "Version Control & CI/CD Workflows" },
  { name: "Docker & Containers", category: "tools", level: 78, experience: "1+ Year", highlight: "Environment Containerization" },
  { name: "Linux & Bash", category: "tools", level: 84, experience: "2+ Years", highlight: "Server Admin & Automation" },
  { name: "Vercel & Cloud Deploy", category: "tools", level: 92, experience: "3+ Years", highlight: "Serverless Deployment & Edge" },
];

const categories = [
  { id: "all", label: "All Skills", count: techItems.length },
  { id: "frontend", label: "Frontend", count: techItems.filter(t => t.category === "frontend").length },
  { id: "backend", label: "Backend & DB", count: techItems.filter(t => t.category === "backend").length },
  { id: "ai", label: "AI & Vision", count: techItems.filter(t => t.category === "ai").length },
  { id: "creative", label: "Creative & 3D", count: techItems.filter(t => t.category === "creative").length },
  { id: "tools", label: "DevOps & Tools", count: techItems.filter(t => t.category === "tools").length },
] as const;

export default function InteractiveTechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = techItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#ff3b47]">
              03 — TECHNICAL RADAR
            </span>
            <span className="text-[#ff3b47] text-xs">✦</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white">
            Architecture & <span className="text-[#ff3b47] italic font-serif">Tech Stack</span>
          </h3>
        </div>

        {/* Search Filter Input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search technology or tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#ff3b47] focus:outline-none transition-all pl-9"
            aria-label="Filter technologies"
          />
          <svg
            className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-[#c22026] text-white shadow-[0_0_15px_rgba(194,32,38,0.4)] scale-105"
                  : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-black/40 text-white" : "bg-white/10 text-white/60"}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((tech, idx) => (
          <div
            key={idx}
            className="relative p-5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#ff3b47]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_25px_rgba(255,59,71,0.15)] flex flex-col justify-between min-h-[170px]"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#ff3b47]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-white text-base tracking-wide group-hover:text-[#ff3b47] transition-colors">
                  {tech.name}
                </h4>
                {tech.badge && (
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#ff3b47]/20 border border-[#ff3b47]/40 text-[#ff4d5a] shrink-0">
                    {tech.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                {tech.highlight}
              </p>
            </div>

            {/* Proficiency Level Bar */}
            <div className="pt-3 border-t border-white/5 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] uppercase font-semibold text-white/50 tracking-wider">
                <span>{tech.experience}</span>
                <span className="text-white/80 font-mono">{tech.level}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c22026] to-[#ff3b47] transition-all duration-1000 ease-out"
                  style={{ width: `${tech.level}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="w-full py-12 text-center text-white/50 text-sm">
          No technologies matched your search query. Try another term.
        </div>
      )}
    </div>
  );
}
