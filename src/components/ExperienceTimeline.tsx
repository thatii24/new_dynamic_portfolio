"use client";

import React, { useState } from "react";

interface Milestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "academic" | "career" | "project";
  description: string;
  keyAchievements: string[];
  skills: string[];
}

const milestones: Milestone[] = [
  {
    period: "2023 — Present",
    role: "B.Sc. in Computer Science (Undergraduate)",
    organization: "Eastern University, Sri Lanka",
    location: "Batticaloa / Kandy, Sri Lanka",
    type: "academic",
    description: "Specializing in Computer Science, Artificial Intelligence, algorithms, and full-stack software development architectures.",
    keyAchievements: [
      "In-depth research on Computer Vision & deep learning models",
      "Building scalable web systems with React, Node.js & databases",
      "Collaborative software engineering projects and hackathons"
    ],
    skills: ["AI / Computer Vision", "Data Structures", "Full-Stack Dev", "Python", "Software Engineering"]
  },
  {
    period: "2022 — Present",
    role: "Lead UI/UX Designer & Frontend Creator",
    organization: "Freelance & Global Digital Clients",
    location: "Worldwide (Remote)",
    type: "career",
    description: "Designed and delivered custom web platforms, e-commerce storefronts, and brand identities for 40+ global clients across Fiverr, direct contracts, and startups.",
    keyAchievements: [
      "Maintained 100% 5-star client satisfaction rating",
      "Delivered high-converting modern responsive web interfaces",
      "Created design systems, component libraries, and interactive 3D assets"
    ],
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "UI/UX Architecture"]
  },
  {
    period: "2024 — Present",
    role: "AI & Computer Vision Innovator",
    organization: "Personal & Open Source Research",
    location: "Sri Lanka",
    type: "project",
    description: "Developing intelligent image processing pipelines, automation bots, and interactive AI web applications using Python, OpenCV, and modern LLM APIs.",
    keyAchievements: [
      "Implemented real-time visual recognition & object detection scripts",
      "Integrated machine learning models with web-based dashboards",
      "Automated design & developer workflows using agentic AI"
    ],
    skills: ["OpenCV", "Python", "LLMs", "Model Deployment", "Image Processing"]
  },
  {
    period: "2021 — 2023",
    role: "Digital Media & Brand Strategist",
    organization: "Creative Media Studio",
    location: "Sri Lanka",
    type: "career",
    description: "Produced high-impact digital graphics, motion graphics, video content, and 3D mockups for brand marketing campaigns.",
    keyAchievements: [
      "Created corporate identity assets and promotional video reels",
      "Standardized visual typography and layout design guidelines",
      "Produced 3D product visualizations using Blender"
    ],
    skills: ["Blender 3D", "Photoshop", "Premiere Pro", "Motion Graphics", "Branding"]
  }
];

export default function ExperienceTimeline() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredMilestones = milestones.filter(m => activeFilter === "all" || m.type === activeFilter);

  return (
    <div className="w-full flex flex-col gap-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#f59e0b]">
              04 — JOURNEY & MILESTONES
            </span>
            <span className="text-[#f59e0b] text-xs">✦</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white">
            Experience & <span className="text-[#f59e0b] italic font-serif">Education</span>
          </h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-full border border-white/10 self-start md:self-auto">
          {[
            { id: "all", label: "All Milestones" },
            { id: "academic", label: "Education" },
            { id: "career", label: "Work & Freelance" },
            { id: "project", label: "AI Projects" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-[#f59e0b] text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative flex flex-col gap-6 before:absolute before:top-4 before:bottom-4 before:left-[19px] md:before:left-[23px] before:w-0.5 before:bg-gradient-to-b before:from-[#f59e0b] before:via-[#c22026] before:to-transparent">
        {filteredMilestones.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className="relative flex items-start gap-4 md:gap-6 group"
            >
              {/* Timeline Glowing Node */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#f59e0b] bg-[#0c0c0e] flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all duration-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              </div>

              {/* Milestone Card */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="flex-grow p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#f59e0b]/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.12)] flex flex-col"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#f59e0b]">
                      {item.period}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#fcd34d] transition-colors">
                      {item.role}
                    </h4>
                  </div>
                  <div className="text-xs text-white/60 font-medium">
                    {item.organization} &bull; <span className="text-white/40">{item.location}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/85 leading-relaxed mt-2 mb-4">
                  {item.description}
                </p>

                {/* Key Achievements (Collapsible/Interactive) */}
                {isExpanded && (
                  <div className="mt-2 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-2">
                      Key Highlights & Impact:
                    </h5>
                    <ul className="flex flex-col gap-1.5 text-xs text-white/80 list-disc list-inside">
                      {item.keyAchievements.map((ach, aIdx) => (
                        <li key={aIdx} className="leading-relaxed">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="ml-auto text-[10px] text-white/40 group-hover:text-white/70 transition-colors">
                    {isExpanded ? "Click to collapse ▲" : "Click to view highlights ▼"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
