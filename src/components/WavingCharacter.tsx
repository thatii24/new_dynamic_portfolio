"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WavingCharacter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hasShown = useRef(false);
  const hasDismissed = useRef(false);
  const floatTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Set initial hidden state
    gsap.set(wrap, {
      opacity: 0,
      scale: 0.85,
      y: 40,
      visibility: "hidden",
    });

    const showPopup = () => {
      gsap.set(wrap, { visibility: "visible" });

      // Entrance animation — fade + scale + slide up
      gsap.to(wrap, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          // Start subtle floating idle after entrance finishes
          floatTween.current = gsap.to(wrap, {
            y: "+=12",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      });
    };

    const hidePopup = () => {
      // Kill floating animation
      if (floatTween.current) {
        floatTween.current.kill();
        floatTween.current = null;
      }

      // Smooth exit — fade + scale down + slide down
      gsap.to(wrap, {
        opacity: 0,
        scale: 0.85,
        y: 60,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(wrap, { visibility: "hidden" });
        },
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show when user starts scrolling (past 80px)
      if (scrollY > 80 && !hasShown.current) {
        hasShown.current = true;
        showPopup();
      }

      // Smoothly dismiss after enough scrolling
      if (scrollY >= 1000 && hasShown.current && !hasDismissed.current) {
        hasDismissed.current = true;
        hidePopup();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (floatTween.current) floatTween.current.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed z-[100] pointer-events-none"
      style={{
        top: "50%",
        right: "1.5rem",
        width: "clamp(140px, 18vw, 220px)",
        transform: "translateY(-50%)",
      }}
    >
      <video
        src="/video/Character_waving_and_saying_hi_202608171513_1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "auto",
          mixBlendMode: "screen",
          background: "transparent",
        }}
      />
    </div>
  );
}
