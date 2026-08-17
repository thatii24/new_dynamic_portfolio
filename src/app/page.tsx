"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import AnimatedSkills from "@/components/AnimatedSkills";
import WavingCharacter from "@/components/WavingCharacter";
import SkillShowcase from "@/components/SkillShowcase";

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

      {/* Waving Character Popup */}
      <WavingCharacter />

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
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col">

        {/* Section 1: Hero Section */}
        <section className="relative w-full min-h-screen py-32 md:py-0 md:h-screen flex flex-col justify-center px-6 md:px-12 snap-center">
          {/* Huge Background Text */}
          {/* <h1 className="absolute top-1/2 left-0 -translate-y-1/2 w-full text-center text-[12vw] font-oswald text-[#970D18]/80 leading-none select-none z-0 tracking-tighter">
            PORTFOLIO
          </h1> */}

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-12 mt-12">
            {/* Left Content */}
            <div className="flex flex-col max-w-md">
              <span className="font-serif italic text-3xl md:text-5xl text-white/90 mb-2">
                Hello, I&apos;m
              </span>
              <h2 className="font-oswald text-6xl md:text-[5rem] font-bold leading-[0.85] text-white tracking-tight uppercase">
                Thatila<br />Wijayathunga
              </h2>
              <div className="mt-8 text-[#c22026] font-bold text-xl md:text-2xl uppercase tracking-wide">
                Web Designer &<br />UI/UX Creator
              </div>
              <p className="mt-6 text-white/60 text-sm md:text-base leading-relaxed">
                I design and build stylish, user-focused web experiences that
                combine creativity with strategy. Passionate about clean design,
                smooth interactions, and details that make a difference.
              </p>
              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-white/70">
                <div className="w-8 h-8 rounded-full bg-[#c22026] flex items-center justify-center">
                  <span className="text-white text-lg leading-none">+</span>
                </div>
                Available Worldwide
              </div>
            </div>

            {/* Right Stats */}
            <div className="flex flex-col gap-12 text-right">
              <div className="flex items-center justify-end gap-4">
                <span className="text-5xl md:text-6xl font-oswald text-[#c22026]">3+</span>
                <span className="text-xs uppercase tracking-widest text-white/70 text-left w-24">Years<br />Experience</span>
              </div>
              <div className="flex items-center justify-end gap-4">
                <span className="text-5xl md:text-6xl font-oswald text-[#c22026]">40+</span>
                <span className="text-xs uppercase tracking-widest text-white/70 text-left w-24">Projects<br />Completed</span>
              </div>
              <div className="flex items-center justify-end gap-4">
                <span className="text-5xl md:text-6xl font-oswald text-[#c22026]">20+</span>
                <span className="text-xs uppercase tracking-widest text-white/70 text-left w-24">Happy<br />Clients</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Selected Projects */}
        <section className="w-full min-h-screen py-32 md:py-0 md:h-screen flex flex-col justify-center px-6 md:px-12 snap-center">
          <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-12">
            <h3 className="text-2xl font-bold uppercase tracking-wider">Selected Projects</h3>
            <Link href="/global" className="text-xs uppercase tracking-widest text-white/50 cursor-pointer hover:text-[#c22026] transition-colors">
              View Global Map &rarr;
            </Link>
          </div>

          <ProjectCarousel />
        </section>

        {/* Section 3: Education, Skills & Process */}
        <section className="w-full min-h-screen py-32 md:py-0 md:h-screen flex flex-col justify-center px-6 md:px-12 snap-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Education & Skills */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-8">Education & Skills</h3>

              <h4 className="text-[#c22026] text-xs font-bold uppercase tracking-widest mb-4">Education</h4>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-sm mb-1">B.Sc. in Computer Science</div>
                  <div className="text-xs text-white/50">Trincomalee Campus, Eastern University, Sri Lanka</div>
                </div>
                <div className="text-xs text-[#c22026]">2023 - 2027</div>
              </div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-bold text-sm mb-1">UI/UX Design Certification</div>
                  <div className="text-xs text-white/50">Google Career Certificates</div>
                </div>
                <div className="text-xs text-[#c22026]">2023</div>
              </div>

              <h4 className="text-[#c22026] text-xs font-bold uppercase tracking-widest mb-4">Skills</h4>
              <AnimatedSkills />
            </div>

            {/* Work Process */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-8">Work Process</h3>

              <div className="flex flex-col gap-6 relative">
                <div className="absolute left-[39px] top-4 bottom-4 w-px bg-white/10 z-0" />

                {[
                  { num: '01', title: 'Discover', desc: 'Understanding goals and requirements.', icon: '🔍' },
                  { num: '02', title: 'Ideate', desc: 'Planning and creating the right concept.', icon: '💡' },
                  { num: '03', title: 'Design', desc: 'Crafting visual design with focus on UX.', icon: '✏️' },
                  { num: '04', title: 'Develop', desc: 'Building high-performing websites.', icon: '</>' },
                  { num: '05', title: 'Deliver', desc: 'Testing, optimizing, and launching.', icon: '🚀' },
                ].map(step => (
                  <div key={step.num} className="flex gap-4 items-start relative z-10">
                    <span className="text-[#c22026] font-oswald text-xl mt-1">{step.num}</span>
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-[#c22026] font-bold text-xs uppercase tracking-widest mb-1 mt-1">{step.title}</h4>
                      <p className="text-[11px] text-white/60 leading-relaxed max-w-[200px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Box */}
            <div className="bg-[#970D18] p-10 flex flex-col justify-between rounded-sm h-full">
              <div>
                <div className="text-4xl font-serif italic text-white/30 mb-4">&quot;</div>
                <p className="text-lg leading-relaxed font-medium">
                  Good design is not just how it looks, but how it works.
                </p>
                <div className="mt-6 font-serif italic text-2xl">Thatila</div>
              </div>
              <div className="mt-12">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Let&apos;s Create</div>
                <div className="text-[10px] font-bold uppercase tracking-widest">Something Great Together</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Skill Showcase */}
        <section className="w-full h-screen flex flex-col justify-center px-6 md:px-12 snap-center">
          <SkillShowcase />
        </section>

        {/* Section 5: Footer */}
        <section className="w-full h-[50vh] flex flex-col justify-center px-6 md:px-12 snap-center">
          <footer className="w-full flex flex-col md:flex-row justify-between items-center bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-sm gap-12">
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-1">Let&apos;s Work</h2>
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-6">Together <span className="text-[#c22026]">+</span></h2>
              <p className="text-xs text-white/50 max-w-xs leading-relaxed mb-8">
                I&apos;m currently open for new projects and collaborations. Let&apos;s create something amazing that drives results.
              </p>
              <Link href="/contact" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#c22026] cursor-pointer hover:text-white transition-colors w-fit">
                <div className="w-8 h-8 rounded-full border border-[#c22026] flex items-center justify-center group-hover:border-white transition-colors">&rarr;</div>
                Available For Freelance
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">✉</div>
                <span className="text-[11px] text-white/70">thatilawijayathunga@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">🌐</div>
                <span className="text-[11px] text-white/70">www.thatilawije.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">📞</div>
                <span className="text-[11px] text-white/70">+94 78 1263 743</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">📍</div>
                <span className="text-[11px] text-white/70">Kandy,Sri Lanka</span>
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
