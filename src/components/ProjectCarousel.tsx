"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Project {
  num: string;
  title: string;
  desc: string;
  tag?: string;
}

const projects: Project[] = [
  { num: "01", title: "Veloce Bikes", desc: "E-Commerce Website", tag: "Web Design" },
  { num: "02", title: "Woodcraft", desc: "Furniture Website", tag: "UI/UX Design" },
  { num: "03", title: "Ursanic", desc: "Fashion Magazine", tag: "Editorial" },
  { num: "04", title: "Aero", desc: "Landing Page Design", tag: "SaaS Platform" },
  { num: "05", title: "Nexus", desc: "Mobile App UX", tag: "Mobile Design" },
];

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen for optimal 3D perspective & translations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch handlers for mobile swipe
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse drag handlers for desktop / tablet trackpads
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    setDragOffset(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStart === null) return;
    setTouchEnd(e.clientX);
    setDragOffset(e.clientX - touchStart);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      if (distance > minSwipeDistance) {
        handleNext();
      } else if (distance < -minSwipeDistance) {
        handlePrev();
      }
    }
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
    setDragOffset(0);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Carousel Stage */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="relative w-full h-[460px] sm:h-[500px] md:h-[580px] flex items-center justify-center overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
        style={{ perspective: isMobile ? "900px" : "1200px" }}
      >
        {projects.map((proj, idx) => {
          const distance = idx - activeIndex;

          // Responsive transform calculations
          let translateX = 0;
          let translateZ = 0;
          let rotateY = 0;
          let opacity = 1;
          let zIndex = 50;
          let scale = 1;

          if (distance === 0) {
            translateX = isDragging ? dragOffset * 0.15 : 0;
            translateZ = 0;
            rotateY = 0;
            opacity = 1;
            zIndex = 50;
            scale = 1;
          } else if (distance < 0) {
            // Cards to the left
            translateX = isMobile ? -58 * Math.abs(distance) : -65 * Math.abs(distance);
            translateZ = isMobile ? -140 * Math.abs(distance) : -240 * Math.abs(distance);
            rotateY = isMobile ? 22 : 35;
            opacity = Math.max(0, 1 - Math.abs(distance) * 0.35);
            zIndex = 50 - Math.abs(distance);
            scale = Math.max(0.7, 1 - Math.abs(distance) * 0.12);
          } else {
            // Cards to the right
            translateX = isMobile ? 58 * Math.abs(distance) : 65 * Math.abs(distance);
            translateZ = isMobile ? -140 * Math.abs(distance) : -240 * Math.abs(distance);
            rotateY = isMobile ? -22 : -35;
            opacity = Math.max(0, 1 - Math.abs(distance) * 0.35);
            zIndex = 50 - Math.abs(distance);
            scale = Math.max(0.7, 1 - Math.abs(distance) * 0.12);
          }

          // Hide cards that are too far away
          if (Math.abs(distance) > 2) {
            opacity = 0;
            zIndex = 0;
          }

          const isActive = distance === 0;

          return (
            <div
              key={proj.num}
              onClick={() => setActiveIndex(idx)}
              className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: Math.abs(distance) > 2 ? "none" : "auto",
              }}
            >
              <div
                className={`w-[78vw] max-w-[300px] sm:w-[330px] md:w-[380px] aspect-[3/4] bg-black/70 rounded-3xl overflow-hidden relative backdrop-blur-2xl border transition-all duration-300 shadow-2xl flex flex-col justify-end p-6 sm:p-8 group ${
                  isActive
                    ? "border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] ring-1 ring-[#c22026]/40"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

                {/* Subtle top ambient glow on active */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#c22026]/20 to-transparent pointer-events-none z-10" />
                )}

                {/* Center Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center font-oswald text-6xl sm:text-7xl text-white/5 z-0 group-hover:text-white/10 transition-colors">
                  {proj.num}
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 transform transition-transform duration-500 group-hover:translate-y-[-6px]">
                  {proj.tag && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#c22026]/20 border border-[#c22026]/40 text-[#c22026] mb-3">
                      {proj.tag}
                    </span>
                  )}
                  <span className="text-5xl sm:text-6xl font-oswald text-[#c22026] mb-1.5 block leading-none">
                    {proj.num}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-wider mb-1.5 text-white">
                    {proj.title}
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-white/60">
                    {proj.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Prev / Next Touch Navigation Overlay Buttons (Especially helpful on mobile & tablets) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={activeIndex === 0}
          aria-label="Previous project"
          className={`absolute left-2 sm:left-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
            activeIndex === 0
              ? "opacity-20 cursor-not-allowed"
              : "opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 hover:bg-black/90 hover:border-[#c22026]/50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={activeIndex === projects.length - 1}
          aria-label="Next project"
          className={`absolute right-2 sm:right-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
            activeIndex === projects.length - 1
              ? "opacity-20 cursor-not-allowed"
              : "opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 hover:bg-black/90 hover:border-[#c22026]/50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Swipe Hint on Mobile & Dot Indicators */}
      <div className="flex flex-col items-center gap-2 mt-4 z-30">
        <span className="text-[11px] uppercase tracking-widest text-white/40 md:hidden flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Swipe left or right
        </span>

        {/* Navigation Indicators */}
        <div className="flex items-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-[#c22026] w-8 shadow-sm shadow-[#c22026]/50"
                  : "bg-white/30 hover:bg-white/60 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
