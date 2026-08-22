"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import AboutExpertise from "@/components/AboutExpertise";
import SkillShowcase from "@/components/SkillShowcase";
import FloatingNavBar from "@/components/FloatingNavBar";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const currentFrame = (index: number) =>
    `${basePath}/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new globalThis.Image();
        img.src = currentFrame(i);
      }
    };

    const img = new globalThis.Image();
    img.src = currentFrame(0);

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
    };

    const updateImage = (index: number) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    };

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex));
    };

    window.addEventListener("scroll", handleScroll);
    preloadImages();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full font-sans bg-transparent">
      {/* Background Canvas Animation */}
      <canvas
        ref={canvasRef}
        id="scroll-animation"
        className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
      />

      {/* Floating Pill Navigation Dock */}
      <FloatingNavBar />

      {/* Top Navbar - Fixed so it stays on all screens */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-xs uppercase tracking-widest text-white/70 font-semibold pointer-events-none">
        <div className="flex flex-col pointer-events-auto">
          <span>Web Designer</span>
          <span>Digital Creator</span>
        </div>
        <Link href="/contact" className="flex items-center gap-2 pointer-events-auto cursor-pointer group">
          <span className="hidden md:block group-hover:text-white transition-colors">Available for Freelance</span>
          <span className="text-[#c22026] text-xl leading-none group-hover:rotate-90 transition-transform duration-300">+</span>
        </Link>
      </header>

      {/* UI Overlay Wrapper */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col gap-12 sm:gap-16 md:gap-24 lg:gap-28">

        {/* Section 1: Hero Section */}
        <section id="hero" className="relative w-full min-h-screen py-24 sm:py-28 md:py-32 flex flex-col justify-center px-6 md:px-12 snap-center">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-10 md:gap-12 mt-8 md:mt-12">
            {/* Left Content */}
            <div className="flex flex-col max-w-md">
              <span className="font-serif italic text-3xl md:text-5xl text-white/90 mb-2">
                Hello, I&apos;m
              </span>
              <h2 className="font-oswald text-5xl sm:text-6xl md:text-[5rem] font-bold leading-[0.88] text-white tracking-tight uppercase">
                Thatila<br />Wijayathunga
              </h2>
              <div className="mt-6 md:mt-8 text-[#c22026] font-bold text-xl md:text-2xl uppercase tracking-wide">
                Web Designer &<br />UI/UX Creator
              </div>
              <p className="mt-5 md:mt-6 text-white/60 text-sm md:text-base leading-relaxed">
                I design and build stylish, user-focused web experiences that
                combine creativity with strategy. Passionate about clean design,
                smooth interactions, and details that make a difference.
              </p>
              <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/70">
                  <div className="w-8 h-8 rounded-full bg-[#c22026] flex items-center justify-center">
                    <span className="text-white text-lg leading-none">+</span>
                  </div>
                  Available Worldwide
                </div>

                {/* Horizontal Social and Platform Links (Clean, unboxed & larger) */}
                <div className="flex items-center gap-3.5 sm:gap-4.5 text-white/70">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white/70 hover:text-[#c22026] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(194,32,38,0.8)]"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white/70 hover:text-[#c22026] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(194,32,38,0.8)]"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  <a
                    href="https://threads.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Threads"
                    className="text-white/70 hover:text-[#c22026] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(194,32,38,0.8)]"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12.186 24C5.54 24 0 18.618 0 12.001 0 5.485 5.54 0 12.186 0c3.708 0 6.946 1.733 9.07 4.542l-2.478 2.052C17.155 4.502 14.814 3.2 12.186 3.2c-4.898 0-8.87 3.947-8.87 8.801 0 4.855 3.972 8.802 8.87 8.802 3.655 0 6.452-1.92 7.026-5.067H12.186v-3.2h10.457c.22 1.09.357 2.27.357 3.52 0 5.44-3.86 8.744-10.814 8.744z" />
                    </svg>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-white/70 hover:text-[#c22026] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(194,32,38,0.8)]"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  <a
                    href="https://fiverr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fiverr"
                    className="text-white/70 hover:text-[#c22026] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(194,32,38,0.8)]"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M23.003 14.805a4.025 4.025 0 0 1-1.442.236c-1.392 0-1.898-.591-2.253-1.774l-.456-1.554h3.766V9.077h-4.56l-.085-.388c-.371-1.723-1.047-3.666-3.8-3.666-2.903 0-4.49 2.061-4.727 4.054H7.834V6.982H4.405v2.095H1.997v2.636h2.408v7.054h3.429v-7.054h1.637c.22 1.638 1.453 3.514 3.75 3.514a4.935 4.935 0 0 0 2.203-.49l.642 2.112c.574 1.892 1.824 2.898 4.223 2.898a8.318 8.318 0 0 0 3.318-.675l-.604-2.568zM14.28 9.077c.186-.963.845-1.723 1.79-1.723.963 0 1.503.743 1.639 1.723H14.28z" />
                    </svg>
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-white/70 hover:text-[#c22026] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(194,32,38,0.8)]"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Stats - Horizontal on mobile, vertical column on desktop */}
            <div className="flex flex-row md:flex-col items-center justify-between sm:justify-around md:justify-end gap-3 sm:gap-6 md:gap-12 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-white/10 text-left md:text-right">
              <div className="flex flex-col sm:flex-row md:flex-row items-center justify-center md:justify-end gap-1 sm:gap-3 md:gap-4 text-center sm:text-left">
                <span className="text-4xl sm:text-5xl md:text-6xl font-oswald text-[#c22026] leading-none">3+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-white/70 text-center sm:text-left leading-tight sm:w-24">
                  Years<br className="hidden sm:block" /> Experience
                </span>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-row items-center justify-center md:justify-end gap-1 sm:gap-3 md:gap-4 text-center sm:text-left">
                <span className="text-4xl sm:text-5xl md:text-6xl font-oswald text-[#c22026] leading-none">40+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-white/70 text-center sm:text-left leading-tight sm:w-24">
                  Projects<br className="hidden sm:block" /> Completed
                </span>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-row items-center justify-center md:justify-end gap-1 sm:gap-3 md:gap-4 text-center sm:text-left">
                <span className="text-4xl sm:text-5xl md:text-6xl font-oswald text-[#c22026] leading-none">20+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-white/70 text-center sm:text-left leading-tight sm:w-24">
                  Happy<br className="hidden sm:block" /> Clients
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Selected Projects */}
        <section id="projects" className="w-full min-h-screen py-20 sm:py-24 md:py-28 flex flex-col justify-center px-4 sm:px-6 md:px-12 snap-center">
          <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider">Selected Projects</h3>
            <Link href="/global" className="text-xs uppercase tracking-widest text-white/50 cursor-pointer hover:text-[#c22026] transition-colors">
              View Global Map &rarr;
            </Link>
          </div>

          <ProjectCarousel />
        </section>

        {/* Section 3: About & Expertise */}
        <section id="process" className="w-full min-h-screen py-20 sm:py-24 md:py-28 flex flex-col justify-center px-6 md:px-12 snap-center">
          <AboutExpertise />
        </section>

        {/* Section 4: Skill Showcase */}
        <section id="skills" className="w-full min-h-screen py-20 sm:py-24 md:py-28 flex flex-col justify-center px-6 md:px-12 snap-center">
          <SkillShowcase />
        </section>

        {/* Section 5: Footer */}
        <section id="contact" className="w-full min-h-[70vh] py-20 sm:py-24 md:py-28 flex flex-col justify-center px-6 md:px-12 snap-center">
          <footer className="w-full flex flex-col md:flex-row justify-between items-center bg-black/40 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl md:rounded-sm gap-8 sm:gap-12">
            <div className="flex flex-col w-full md:w-auto">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-1">Let&apos;s Work</h2>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-4 sm:mb-6">Together <span className="text-[#c22026]">+</span></h2>
              <p className="text-xs text-white/50 max-w-xs leading-relaxed mb-6 sm:mb-8">
                I&apos;m currently open for new projects and collaborations. Let&apos;s create something amazing that drives results.
              </p>
              <Link href="/contact" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#c22026] cursor-pointer hover:text-white transition-colors w-fit">
                <div className="w-8 h-8 rounded-full border border-[#c22026] flex items-center justify-center group-hover:border-white transition-colors">&rarr;</div>
                Available For Freelance
              </Link>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs shrink-0">✉</div>
                <span className="text-[11px] text-white/70 break-all">thatilawijayathunga@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs shrink-0">🌐</div>
                <span className="text-[11px] text-white/70">www.thatilawije.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs shrink-0">📞</div>
                <span className="text-[11px] text-white/70">+94 78 1263 743</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs shrink-0">📍</div>
                <span className="text-[11px] text-white/70">Kandy, Sri Lanka</span>
              </div>
            </div>

            <div className="hidden lg:flex w-[350px] h-[350px] bg-white/5 rounded-sm border border-white/10 items-center justify-center overflow-hidden relative shadow-xl shadow-black/50">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/profile-mockup.png`}
                alt="Workspace"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-sm"></div>
            </div>
          </footer>
        </section>

      </div>
    </div>
  );
}
