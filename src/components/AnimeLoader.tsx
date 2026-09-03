"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface AnimeLoaderProps {
  onComplete?: () => void;
  frameCount?: number;
}

export default function AnimeLoader({
  onComplete,
  frameCount = 240,
}: AnimeLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING NEURAL INTERFACE...");
  const [isDone, setIsDone] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGSVGElement>(null);
  const ring2Ref = useRef<SVGSVGElement>(null);
  const slashLineRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    // Lock scroll during loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Anime HUD continuous rotations with GSAP
    if (ring1Ref.current) {
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    }

    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 8,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    }

    if (coreRef.current) {
      gsap.to(coreRef.current, {
        scale: 1.08,
        opacity: 0.95,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Asset preloader
    let loadedImages = 0;
    const criticalFrames = Math.min(60, frameCount); // High-priority batch
    let targetProgress = 0;

    const currentFrameUrl = (index: number) =>
      `${basePath}/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const statusMessages = [
      { threshold: 10, text: "CONNECTING NEURAL INTERFACE... // 接続中" },
      { threshold: 30, text: "BUFFERING 240 ANIMATION FRAMES... // 展開" },
      { threshold: 55, text: "CALIBRATING 3D SHADERS & HUD... // 同期" },
      { threshold: 80, text: "LIMIT BREAK INITIALIZED... // 限界突破" },
      { threshold: 98, text: "SYSTEM READY // ACCESS GRANTED" },
    ];

    const updateStatus = (current: number) => {
      for (let i = statusMessages.length - 1; i >= 0; i--) {
        if (current >= statusMessages[i].threshold) {
          setStatusText(statusMessages[i].text);
          break;
        }
      }
    };

    // Preload frames in background
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrameUrl(i);
      const onAssetLoad = () => {
        loadedImages++;
        // Calculate progress biased towards critical first frames + total frames
        const rawProgress = Math.min(
          100,
          Math.floor(
            ((Math.min(loadedImages, criticalFrames) / criticalFrames) * 0.7 +
              (loadedImages / frameCount) * 0.3) *
              100
          )
        );
        targetProgress = Math.max(targetProgress, rawProgress);
      };
      img.onload = onAssetLoad;
      img.onerror = onAssetLoad;
    }

    // Minimum cinematic duration ticker (ensures beautiful smooth anime reveal)
    const startTime = Date.now();
    const minDuration = 2200; // 2.2s minimum duration for anime style intro

    let currentVal = 0;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      const combined = Math.min(100, Math.max(timeProgress, targetProgress));

      if (currentVal < combined) {
        currentVal += Math.max(1, Math.floor((combined - currentVal) * 0.25));
        if (currentVal > 100) currentVal = 100;
        setProgress(currentVal);
        updateStatus(currentVal);
      }

      // When fully loaded and minimum duration elapsed
      if (currentVal >= 100 && elapsed >= minDuration) {
        clearInterval(interval);
        setProgress(100);
        setStatusText("SYSTEM READY // ACCESS GRANTED");

        // Trigger anime cut / slash exit animation
        setTimeout(() => {
          playExitAnimation();
        }, 300);
      }
    }, 30);

    const playExitAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // 1. Slash line flare across center
      if (slashLineRef.current) {
        tl.set(slashLineRef.current, { scaleX: 0, opacity: 1 });
        tl.to(slashLineRef.current, {
          scaleX: 1,
          duration: 0.35,
          ease: "expo.out",
        });
        tl.to(slashLineRef.current, {
          scaleY: 8,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }

      // 2. Center HUD collapse and flash
      if (coreRef.current) {
        tl.to(
          coreRef.current,
          {
            scale: 1.4,
            opacity: 0,
            filter: "brightness(2.5)",
            duration: 0.4,
            ease: "power3.in",
          },
          "-=0.4"
        );
      }

      // 3. Horizontal split curtains slide away
      if (topCurtainRef.current && bottomCurtainRef.current) {
        tl.to(
          topCurtainRef.current,
          {
            yPercent: -100,
            duration: 0.7,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
        tl.to(
          bottomCurtainRef.current,
          {
            yPercent: 100,
            duration: 0.7,
            ease: "power4.inOut",
          },
          "<"
        );
      }

      // 4. Container fadeout
      if (containerRef.current) {
        tl.to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.2,
          },
          "-=0.2"
        );
      }
    };

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, [frameCount, basePath, onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Top Split Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#080808] border-b border-[#c22026]/40 z-10 flex flex-col justify-end items-center"
      >
        {/* Subtle Cyber Grid Texture */}
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Bottom Split Curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#080808] border-t border-[#c22026]/40 z-10 flex flex-col justify-start items-center"
      >
        {/* Subtle Cyber Grid Texture */}
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Anime Energy Slash Line */}
      <div
        ref={slashLineRef}
        className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff2a3b] to-transparent z-40 opacity-0 shadow-[0_0_20px_#ff2a3b,0_0_40px_#ff2a3b] pointer-events-none"
        style={{ transform: "translateY(-50%)" }}
      />

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.8)_2px,rgba(0,0,0,0.8)_4px)]" />

      {/* Decorative Anime HUD Corner Brackets */}
      <div className="absolute top-6 left-6 z-30 pointer-events-none hidden sm:flex flex-col gap-1 text-[10px] font-mono text-white/90 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff3b47] shadow-[0_0_8px_#ff3b47]" />
          <span className="text-white font-semibold">PORTFOLIO_SYSTEM // 覚醒</span>
        </div>
        <span className="text-[#ff4d5a] font-bold text-[11px] pl-3 drop-shadow-[0_0_8px_rgba(255,77,90,0.5)]">THATILA WIJAYATHUNGA</span>
      </div>

      <div className="absolute top-6 right-6 z-30 pointer-events-none hidden sm:flex flex-col items-end gap-1 text-[10px] font-mono text-white/90 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">SEC_PROTOCOL // 限界突破</span>
          <span className="w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff3b47] shadow-[0_0_8px_#ff3b47]" />
        </div>
        <span className="text-white font-bold pr-3">MODE: ACTIVE DESIGNER</span>
      </div>

      <div className="absolute bottom-6 left-6 z-30 pointer-events-none hidden sm:flex flex-col gap-1 text-[10px] font-mono text-white/90 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff3b47] shadow-[0_0_8px_#ff3b47]" />
          <span className="text-white font-semibold">LOC: 7.2906° N, 80.6337° E</span>
        </div>
        <span className="text-white/80 font-medium pl-3">DIGITAL EXPERIENCE v2.4</span>
      </div>

      <div className="absolute bottom-6 right-6 z-30 pointer-events-none hidden sm:flex flex-col items-end gap-1 text-[10px] font-mono text-white/90 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">STATUS: INITIALIZING</span>
          <span className="w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff3b47] shadow-[0_0_8px_#ff3b47]" />
        </div>
        <span className="text-[#ff3b47] font-bold pr-3 drop-shadow-[0_0_8px_#ff3b47]">CANVAS 240 FPS</span>
      </div>

      {/* Central Anime Core Loader Content */}
      <div
        ref={coreRef}
        className="relative z-30 flex flex-col items-center justify-center px-6 max-w-lg w-full text-center"
      >
        {/* Japanese Top Kanji Tag */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff3b47]/60 bg-[#ff3b47]/15 backdrop-blur-md shadow-[0_0_15px_rgba(255,59,71,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#ff3b47] animate-pulse shadow-[0_0_10px_#ff3b47]" />
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest text-white uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
            システム起動中 // SYSTEM INITIALIZING
          </span>
        </div>

        {/* Central Anime HUD Cyber Rings */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8">
          {/* Outer Rotating Cyber Ring */}
          <svg
            ref={ring1Ref}
            className="absolute inset-0 w-full h-full text-[#ff3b47]/70"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="16 8 4 8"
            />
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
            <path
              d="M 100 6 A 94 94 0 0 1 194 100"
              fill="none"
              stroke="#ff3b47"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_12px_#ff3b47]"
            />
          </svg>

          {/* Inner Counter-Rotating Reticle Ring */}
          <svg
            ref={ring2Ref}
            className="absolute w-32 h-32 sm:w-40 sm:h-40 text-white/60"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            <line x1="80" y1="0" x2="80" y2="15" stroke="#ff3b47" strokeWidth="2.5" />
            <line x1="80" y1="145" x2="80" y2="160" stroke="#ff3b47" strokeWidth="2.5" />
            <line x1="0" y1="80" x2="15" y2="80" stroke="#ff3b47" strokeWidth="2.5" />
            <line x1="145" y1="80" x2="160" y2="80" stroke="#ff3b47" strokeWidth="2.5" />
          </svg>

          {/* Center Glow Aura Pulse */}
          <div className="absolute w-24 h-24 rounded-full bg-[#ff3b47]/25 blur-xl animate-pulse" />

          {/* Core Percentage Display */}
          <div className="relative flex flex-col items-center justify-center">
            <span className="font-oswald text-5xl sm:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">
              {progress.toString().padStart(2, "0")}
              <span className="text-2xl sm:text-3xl text-[#ff3b47] ml-1 drop-shadow-[0_0_12px_#ff3b47]">%</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white uppercase tracking-widest mt-0.5 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              同期率 // SYNC
            </span>
          </div>
        </div>

        {/* Dynamic Glowing Anime Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2.5">
          <div className="relative w-full h-2.5 bg-white/15 rounded-full overflow-hidden p-[1px] border border-white/30">
            <div
              className="h-full bg-gradient-to-r from-[#b3121b] via-[#ff3b47] to-[#ffffff] rounded-full transition-all duration-150 ease-out shadow-[0_0_16px_#ff3b47]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* HUD Status Text Feed */}
          <div className="flex justify-between items-center text-xs font-mono tracking-wider">
            <span className="text-white font-semibold truncate pr-2 flex items-center gap-1.5">
              <span className="text-[#ff3b47] font-bold">&gt;</span>
              <span className="text-[#ff4d5a] font-bold drop-shadow-[0_0_6px_rgba(255,77,90,0.5)]">{statusText}</span>
            </span>
            <span className="text-white font-bold shrink-0 bg-white/10 px-1.5 py-0.5 rounded text-[10px]">
              [{progress}/100]
            </span>
          </div>
        </div>

        {/* Bottom Anime Subtitle */}
        <div className="mt-8 text-xs font-mono font-semibold tracking-widest text-white/90 uppercase flex items-center gap-3">
          <span className="h-[1px] w-6 bg-[#ff3b47]/60" />
          <span className="drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">CREATIVE DEVELOPER PORTFOLIO</span>
          <span className="h-[1px] w-6 bg-[#ff3b47]/60" />
        </div>
      </div>
    </div>
  );
}
