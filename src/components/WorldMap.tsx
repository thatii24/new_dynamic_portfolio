"use client";

import { useState, useEffect, useId } from "react";
import Link from "next/link";

interface LocationData {
  id: string;
  name: string;
  region: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  lat: string;
  lng: string;
  project: {
    num: string;
    title: string;
    client: string;
    category: string;
    desc: string;
    tech: string[];
    year: string;
    highlight: string;
  };
}

const locations: LocationData[] = [
  {
    id: "na",
    name: "North America",
    region: "San Francisco / New York",
    x: 22,
    y: 32,
    lat: "37.77° N",
    lng: "122.41° W",
    project: {
      num: "01",
      title: "Veloce Bikes",
      client: "TechCorp USA",
      category: "E-Commerce Website",
      desc: "High-performance digital storefront with real-time 3D bike customization, custom geometry calculators, and frictionless checkout.",
      tech: ["Next.js", "Three.js", "TailwindCSS", "Stripe"],
      year: "2024",
      highlight: "+140% Conversion Rate",
    },
  },
  {
    id: "sa",
    name: "South America",
    region: "São Paulo, Brazil",
    x: 33,
    y: 68,
    lat: "23.55° S",
    lng: "46.63° W",
    project: {
      num: "02",
      title: "EcoTrack",
      client: "Green Rio Innovations",
      category: "Mobile App UX",
      desc: "Ecological monitoring platform providing real-time carbon telemetry, deforestation heatmaps, and carbon offset rewards.",
      tech: ["React Native", "TypeScript", "GraphQL", "Figma"],
      year: "2024",
      highlight: "50k+ Active Users",
    },
  },
  {
    id: "eu",
    name: "Europe",
    region: "London / Berlin",
    x: 50,
    y: 28,
    lat: "51.50° N",
    lng: "0.12° W",
    project: {
      num: "03",
      title: "Woodcraft",
      client: "London Design Studio",
      category: "UI/UX & AR Experience",
      desc: "Bespoke architectural furniture showcase combining Scandinavian minimalism with interactive WebXR virtual room placement.",
      tech: ["Next.js", "WebXR", "GLSL Shaders", "Tailwind"],
      year: "2023",
      highlight: "Awwwards Nominee",
    },
  },
  {
    id: "af",
    name: "Africa",
    region: "Nairobi, Kenya",
    x: 55,
    y: 56,
    lat: "1.29° S",
    lng: "36.82° E",
    project: {
      num: "04",
      title: "Safar Network",
      client: "East Africa Tourism",
      category: "Web Platform",
      desc: "Community-driven eco-tourism gateway connecting international travelers with vetted indigenous wilderness guides and wildlife lodges.",
      tech: ["React", "Node.js", "Mapbox GL", "PostgreSQL"],
      year: "2023",
      highlight: "4.9/5 Rating",
    },
  },
  {
    id: "as",
    name: "Asia",
    region: "Tokyo / Singapore",
    x: 77,
    y: 34,
    lat: "35.67° N",
    lng: "139.65° E",
    project: {
      num: "05",
      title: "Nexus",
      client: "Tokyo Fintech Labs",
      category: "Fintech Platform",
      desc: "Ultra-low latency cryptocurrency algorithmic dashboard featuring real-time depth charts, multi-tier security, and automated hedging.",
      tech: ["Next.js", "WebSockets", "D3.js", "TailwindCSS"],
      year: "2024",
      highlight: "$12M+ Volume Handled",
    },
  },
  {
    id: "oc",
    name: "Oceania",
    region: "Sydney, Australia",
    x: 84,
    y: 72,
    lat: "33.86° S",
    lng: "151.20° E",
    project: {
      num: "06",
      title: "Aero Charters",
      client: "Sydney Aviation Group",
      category: "SaaS & Landing Page",
      desc: "Luxury private aviation booking engine with instant aircraft availability matching, dynamic route pricing, and VIP concierge integration.",
      tech: ["Next.js", "Framer Motion", "Tailwind", "REST API"],
      year: "2024",
      highlight: "99.9% Uptime",
    },
  },
  {
    id: "hq",
    name: "Studio HQ",
    region: "Kandy, Sri Lanka",
    x: 68,
    y: 53,
    lat: "7.29° N",
    lng: "80.63° E",
    project: {
      num: "HQ",
      title: "Design & Engineering Studio",
      client: "Thatila Wijayathunga",
      category: "Creative Headquarters",
      desc: "The central nexus where concepts are researched, prototyped, engineered, and shipped to clients and partners worldwide.",
      tech: ["UI/UX", "Full-Stack Dev", "3D Web", "Brand Strategy"],
      year: "Present",
      highlight: "Available for Hire",
    },
  },
];

// Connection flight arcs between locations
const connectionArcs = [
  { from: "na", to: "eu" },
  { from: "eu", to: "hq" },
  { from: "hq", to: "as" },
  { from: "as", to: "oc" },
  { from: "eu", to: "af" },
  { from: "na", to: "sa" },
];

export default function WorldMap() {
  const [activeId, setActiveId] = useState<string>("na");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");
  const dotPatternId = useId();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toUTCString().split(" ").slice(4, 5)[0] + " UTC"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeLoc = locations.find((l) => l.id === activeId) || locations[0];

  return (
    <div className="relative w-full max-w-[1300px] mx-auto flex flex-col items-center select-none py-6">
      {/* Component Styles for Animated Cyber Arcs and Pulses */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pulseArc {
          0% { stroke-dashoffset: 600; opacity: 0.2; }
          40% { opacity: 0.9; }
          80% { stroke-dashoffset: 0; opacity: 0.9; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        .animate-pulse-arc {
          stroke-dasharray: 80, 250;
          animation: pulseArc 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar {
          transform-origin: 50% 50%;
          animation: radarSweep 14s linear infinite;
        }
      `}} />

      {/* Top Header HUD Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#c22026] animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c22026]">
              Global Telemetry & Nodes
            </span>
          </div>
          <h2 className="font-oswald text-3xl sm:text-4xl uppercase tracking-wider text-white">
            Worldwide Operations
          </h2>
        </div>

        {/* Live HUD Status Counters */}
        <div className="flex items-center gap-3 sm:gap-6 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-[11px] uppercase tracking-wider text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Nodes: <strong className="text-white">6 Active</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-4">
            <span>Ping: <strong className="text-emerald-400">18ms</strong></span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <span className="text-[#c22026]">{time || "LIVE"}</span>
          </div>
        </div>
      </div>

      {/* Region Selector Filter Pills */}
      <div className="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {locations.map((loc) => {
          const isSelected = activeId === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setActiveId(loc.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
                isSelected
                  ? "bg-[#c22026] text-white border-[#c22026] shadow-[0_0_20px_rgba(194,32,38,0.5)] scale-105"
                  : "bg-white/[0.03] text-white/60 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {loc.name}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Vector Map Stage */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[480px] md:min-h-[580px] bg-[#070709] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* Background Digital Grid Matrix */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient Gradient Center Glow */}
        <div className="absolute w-[600px] h-[350px] bg-[#c22026]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Vector SVG World Map + Dynamic Arc Layer */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        >
          <defs>
            {/* Dot Matrix Pattern for Continents */}
            <pattern
              id={dotPatternId}
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.2" fill="#ffffff" fillOpacity="0.12" />
            </pattern>

            {/* Glowing Linear Gradients for Arcs */}
            <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c22026" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c22026" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="gridGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#c22026" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Latitude & Longitude Graticule Rings */}
          <g stroke="url(#gridGlow)" strokeWidth="0.8" strokeDasharray="3 4" fill="none" opacity="0.6">
            <line x1="50" y1="125" x2="950" y2="125" />
            <line x1="50" y1="250" x2="950" y2="250" />
            <line x1="50" y1="375" x2="950" y2="375" />
            <line x1="200" y1="50" x2="200" y2="450" />
            <line x1="500" y1="50" x2="500" y2="450" />
            <line x1="800" y1="50" x2="800" y2="450" />
            <circle cx="500" cy="250" r="220" />
            <ellipse cx="500" cy="250" rx="420" ry="210" />
          </g>

          {/* High-Tech Vector Continents (Crafted Polygonal SVG paths) */}
          <g className="transition-all duration-500">
            {/* North America */}
            <path
              d="M120 70 L220 60 L280 80 L310 110 L290 140 L260 170 L250 210 L210 240 L190 260 L180 230 L160 220 L130 190 L110 140 L100 100 Z M190 40 L250 30 L270 50 L230 60 Z"
              fill="#121216"
              stroke="#26262e"
              strokeWidth="1.2"
              className="hover:fill-[#1b1b22] transition-colors cursor-pointer"
              onClick={() => setActiveId("na")}
            />
            {/* North America Dot Fill Overlay */}
            <path
              d="M120 70 L220 60 L280 80 L310 110 L290 140 L260 170 L250 210 L210 240 L190 260 L180 230 L160 220 L130 190 L110 140 L100 100 Z"
              fill={`url(#${dotPatternId})`}
              pointerEvents="none"
            />

            {/* South America */}
            <path
              d="M260 280 L320 270 L380 310 L390 350 L360 410 L330 460 L290 470 L270 410 L250 340 L240 300 Z"
              fill="#121216"
              stroke="#26262e"
              strokeWidth="1.2"
              className="hover:fill-[#1b1b22] transition-colors cursor-pointer"
              onClick={() => setActiveId("sa")}
            />
            <path
              d="M260 280 L320 270 L380 310 L390 350 L360 410 L330 460 L290 470 L270 410 L250 340 L240 300 Z"
              fill={`url(#${dotPatternId})`}
              pointerEvents="none"
            />

            {/* Europe */}
            <path
              d="M460 110 L540 100 L560 130 L550 160 L510 180 L480 180 L450 160 L440 130 Z M440 90 L470 70 L480 100 L450 100 Z M430 110 L450 120 L440 140 Z"
              fill="#121216"
              stroke="#26262e"
              strokeWidth="1.2"
              className="hover:fill-[#1b1b22] transition-colors cursor-pointer"
              onClick={() => setActiveId("eu")}
            />
            <path
              d="M460 110 L540 100 L560 130 L550 160 L510 180 L480 180 L450 160 L440 130 Z"
              fill={`url(#${dotPatternId})`}
              pointerEvents="none"
            />

            {/* Africa */}
            <path
              d="M460 200 L560 190 L610 240 L620 290 L590 350 L560 410 L510 420 L480 370 L460 300 L440 240 Z M630 330 L650 340 L640 380 L620 370 Z"
              fill="#121216"
              stroke="#26262e"
              strokeWidth="1.2"
              className="hover:fill-[#1b1b22] transition-colors cursor-pointer"
              onClick={() => setActiveId("af")}
            />
            <path
              d="M460 200 L560 190 L610 240 L620 290 L590 350 L560 410 L510 420 L480 370 L460 300 L440 240 Z"
              fill={`url(#${dotPatternId})`}
              pointerEvents="none"
            />

            {/* Asia */}
            <path
              d="M570 100 L730 80 L860 100 L900 160 L870 230 L800 240 L760 280 L710 290 L680 270 L640 240 L620 180 L580 160 Z M860 170 L890 180 L870 220 Z M770 290 L810 300 L790 330 Z"
              fill="#121216"
              stroke="#26262e"
              strokeWidth="1.2"
              className="hover:fill-[#1b1b22] transition-colors cursor-pointer"
              onClick={() => setActiveId("as")}
            />
            <path
              d="M570 100 L730 80 L860 100 L900 160 L870 230 L800 240 L760 280 L710 290 L680 270 L640 240 L620 180 L580 160 Z"
              fill={`url(#${dotPatternId})`}
              pointerEvents="none"
            />

            {/* Australia / Oceania */}
            <path
              d="M780 330 L880 320 L910 370 L890 420 L830 430 L780 390 Z M890 430 L920 440 L900 460 Z"
              fill="#121216"
              stroke="#26262e"
              strokeWidth="1.2"
              className="hover:fill-[#1b1b22] transition-colors cursor-pointer"
              onClick={() => setActiveId("oc")}
            />
            <path
              d="M780 330 L880 320 L910 370 L890 420 L830 430 L780 390 Z"
              fill={`url(#${dotPatternId})`}
              pointerEvents="none"
            />
          </g>

          {/* Animated Connecting Data Arcs */}
          {connectionArcs.map((arc, index) => {
            const fromLoc = locations.find((l) => l.id === arc.from);
            const toLoc = locations.find((l) => l.id === arc.to);
            if (!fromLoc || !toLoc) return null;

            const x1 = fromLoc.x * 10;
            const y1 = fromLoc.y * 5;
            const x2 = toLoc.x * 10;
            const y2 = toLoc.y * 5;

            // Curve control point
            const midX = (x1 + x2) / 2;
            const midY = Math.min(y1, y2) - 40 - Math.abs(x1 - x2) * 0.1;
            const pathData = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;

            const isHighlighted =
              activeId === arc.from || activeId === arc.to;

            return (
              <g key={index}>
                {/* Static faint arc track */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isHighlighted ? "#c22026" : "#ffffff"}
                  strokeOpacity={isHighlighted ? 0.4 : 0.1}
                  strokeWidth={isHighlighted ? 1.5 : 1}
                  strokeDasharray="4 6"
                />
                {/* Animated light pulse running along arc */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="url(#arcGlow)"
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  className="animate-pulse-arc"
                  style={{ animationDelay: `${index * 0.8}s` }}
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Interactive HTML Overlay Pins */}
        {locations.map((loc) => {
          const isActive = activeId === loc.id;
          const isHovered = hoveredId === loc.id;

          return (
            <div
              key={loc.id}
              style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
              onClick={() => setActiveId(loc.id)}
              onMouseEnter={() => setHoveredId(loc.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Outer Sonar Ping Rings on Active */}
              {isActive && (
                <>
                  <span className="absolute -inset-3 rounded-full bg-[#c22026]/40 animate-ping pointer-events-none" />
                  <span className="absolute -inset-6 rounded-full border border-[#c22026]/30 animate-pulse pointer-events-none" />
                </>
              )}

              {/* Pin Core */}
              <div
                className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-[#c22026] text-white shadow-[0_0_25px_#c22026] scale-125 ring-2 ring-white/60"
                    : isHovered
                    ? "bg-white text-black scale-115 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    : "bg-black/90 border border-white/50 text-white/80 hover:border-white"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? "bg-white" : isHovered ? "bg-[#c22026]" : "bg-white/80"
                  }`}
                />
              </div>

              {/* Pin Hover Name Label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-7 px-2.5 py-1 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold tracking-widest whitespace-nowrap pointer-events-none transition-all duration-200 ${
                  isActive
                    ? "text-[#c22026] border-[#c22026]/60 shadow-[0_0_10px_rgba(194,32,38,0.4)] opacity-100"
                    : isHovered
                    ? "text-white opacity-100 scale-105"
                    : "text-white/60 opacity-0 group-hover:opacity-100"
                }`}
              >
                {loc.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Location / Project HUD Detail Drawer */}
      <div className="w-full mt-6 bg-black/60 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#c22026]/20 border border-[#c22026]/40 text-[#c22026]">
              {activeLoc.region}
            </span>
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
              LAT: {activeLoc.lat} | LNG: {activeLoc.lng}
            </span>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              ● {activeLoc.project.highlight}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-oswald text-[#c22026]">
              {activeLoc.project.num}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
              {activeLoc.project.title}
            </h3>
          </div>

          <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
            Client: {activeLoc.project.client} &bull; {activeLoc.project.category} ({activeLoc.project.year})
          </p>

          <p className="text-sm text-white/70 leading-relaxed max-w-xl">
            {activeLoc.project.desc}
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {activeLoc.project.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Action Callout */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
          <Link
            href="/contact"
            className="px-6 py-3.5 bg-[#c22026] hover:bg-[#a5191e] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(194,32,38,0.4)] flex items-center justify-center gap-2 group"
          >
            <span>Initiate Project in {activeLoc.name}</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>

          <Link
            href="/"
            className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
