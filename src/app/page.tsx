"use client";

import { useEffect, useRef } from "react";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;

  const currentFrame = (index: number) =>
    `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

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

      {/* Top Navbar - Fixed so it stays on all screens */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center text-xs uppercase tracking-widest text-white/70 font-semibold pointer-events-none">
        <div className="flex flex-col pointer-events-auto">
          <span>Web Designer</span>
          <span>Digital Creator</span>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          <span>Available for Freelance</span>
          <span className="text-[#c22026] text-xl leading-none">+</span>
        </div>
      </header>

      {/* UI Overlay Wrapper */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col">

        {/* Section 1: Hero Section */}
        <section className="relative w-full h-screen flex flex-col justify-center px-6 md:px-12 snap-center">
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
        <section className="w-full h-screen flex flex-col justify-center px-6 md:px-12 snap-center">
          <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-12">
            <h3 className="text-2xl font-bold uppercase tracking-wider">Selected Projects</h3>
            <span className="text-xs uppercase tracking-widest text-white/50 cursor-pointer hover:text-white transition-colors">View All Projects &rarr;</span>
          </div>

          <ProjectCarousel />
        </section>

        {/* Section 3: Education, Skills & Process */}
        <section className="w-full h-screen flex flex-col justify-center px-6 md:px-12 snap-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Education & Skills */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-8">Education & Skills</h3>

              <h4 className="text-[#c22026] text-xs font-bold uppercase tracking-widest mb-4">Education</h4>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-sm mb-1">B.Sc. in Visual Communication Design</div>
                  <div className="text-xs text-white/50">Binus University</div>
                </div>
                <div className="text-xs text-[#c22026]">2018 - 2022</div>
              </div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-bold text-sm mb-1">UI/UX Design Certification</div>
                  <div className="text-xs text-white/50">Google Career Certificates</div>
                </div>
                <div className="text-xs text-[#c22026]">2023</div>
              </div>

              <h4 className="text-[#c22026] text-xs font-bold uppercase tracking-widest mb-4">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['Web Design', 'UI/UX Design', 'Figma', 'Framer', 'Adobe XD', 'Photoshop', 'Webflow', 'HTML / CSS', 'Javascript'].map(skill => (
                  <div key={skill} className="text-[10px] font-semibold uppercase tracking-widest border border-white/20 px-3 py-1.5 rounded-sm text-white/70 hover:border-[#c22026] hover:text-[#c22026] transition-colors cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
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
                <div className="text-4xl font-serif italic text-white/30 mb-4">"</div>
                <p className="text-lg leading-relaxed font-medium">
                  Good design is not just how it looks, but how it works.
                </p>
                <div className="mt-6 font-serif italic text-2xl">Rayhan</div>
              </div>
              <div className="mt-12">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Let's Create</div>
                <div className="text-[10px] font-bold uppercase tracking-widest">Something Great Together</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Footer */}
        <section className="w-full h-[50vh] flex flex-col justify-center px-6 md:px-12 snap-center">
          <footer className="w-full flex flex-col md:flex-row justify-between items-center bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-sm gap-12">
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-1">Let's Work</h2>
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-6">Together <span className="text-[#c22026]">+</span></h2>
              <p className="text-xs text-white/50 max-w-xs leading-relaxed mb-8">
                I'm currently open for new projects and collaborations. Let's create something amazing that drives results.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#c22026] cursor-pointer hover:text-white transition-colors w-fit">
                <div className="w-8 h-8 rounded-full border border-[#c22026] flex items-center justify-center">&rarr;</div>
                Available For Freelance
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">✉</div>
                <span className="text-[11px] text-white/70">hello@rayhanaditya.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">🌐</div>
                <span className="text-[11px] text-white/70">www.rayhanaditya.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">📞</div>
                <span className="text-[11px] text-white/70">+62 812 3456 7890</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs">📍</div>
                <span className="text-[11px] text-white/70">Jakarta, Indonesia</span>
              </div>
            </div>

            <div className="hidden lg:flex w-[250px] h-[150px] bg-white/5 rounded-sm border border-white/10 items-center justify-center text-white/20 text-xs">
              LAPTOP MOCKUP
            </div>
          </footer>
        </section>

      </div>
    </div>
  );
}
