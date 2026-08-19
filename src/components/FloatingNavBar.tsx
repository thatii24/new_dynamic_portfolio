"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isExternalLink?: boolean;
  href?: string;
}

export default function FloatingNavBar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const navItems: NavItem[] = [
    {
      id: "hero",
      label: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: "process",
      label: "Experience & Process",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "skills",
      label: "Skills Showcase",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  const bottomItems: NavItem[] = [
    {
      id: "contact",
      label: "Contact & Info",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      id: "global-map",
      label: "Global Clients",
      isExternalLink: true,
      href: "/global",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  // Observe active section on scroll
  useEffect(() => {
    const sectionIds = ["hero", "projects", "process", "skills", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Section Navigation"
      className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center select-none"
    >
      {/* Main Glass Pill Navigation Bar */}
      <div className="relative flex flex-col items-center p-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-white/40 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 gap-2">
        {/* Top Navigation Items */}
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div
              key={item.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-md scale-105 font-bold"
                    : "text-slate-800 dark:text-white/80 hover:bg-white/40 dark:hover:bg-white/20 hover:text-white hover:scale-105"
                }`}
              >
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#c22026]" />
                )}
              </button>

              {/* Floating Tooltip */}
              {hoveredItem === item.id && (
                <div className="absolute right-14 px-3 py-1.5 bg-black/85 text-white text-xs font-medium tracking-wide rounded-full whitespace-nowrap backdrop-blur-md border border-white/20 shadow-lg pointer-events-none transition-all duration-200 animate-in fade-in slide-in-from-right-2 z-50">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Profile Avatar Separator */}
        <div
          className="relative my-1 flex items-center justify-center"
          onMouseEnter={() => setHoveredItem("profile")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            onClick={() => scrollToSection("hero")}
            className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#c22026] to-amber-500 shadow-md hover:scale-110 transition-transform duration-300 overflow-hidden"
            aria-label="Thatila Wijayathunga Profile"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={`${basePath}/profile-mockup.png`}
                alt="Thatila"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to stylized monogram if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <span className="text-xs font-bold text-white font-oswald uppercase">TW</span>
            </div>
          </button>

          {hoveredItem === "profile" && (
            <div className="absolute right-14 px-3 py-1.5 bg-black/85 text-white text-xs font-medium tracking-wide rounded-full whitespace-nowrap backdrop-blur-md border border-white/20 shadow-lg pointer-events-none transition-all duration-200 animate-in fade-in slide-in-from-right-2 z-50">
              Thatila Wijayathunga
            </div>
          )}
        </div>

        {/* Bottom Sub-Pill section */}
        <div className="w-8 h-px bg-white/20 my-0.5" />

        {bottomItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div
              key={item.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.isExternalLink ? (
                <Link
                  href={item.href || "#"}
                  aria-label={item.label}
                  className="relative flex items-center justify-center w-9 h-9 rounded-full text-slate-800 dark:text-white/70 hover:bg-white/40 dark:hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  {item.icon}
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-white text-slate-900 shadow-md font-bold"
                      : "text-slate-800 dark:text-white/70 hover:bg-white/40 dark:hover:bg-white/20 hover:text-white hover:scale-105"
                  }`}
                >
                  {item.icon}
                </button>
              )}

              {/* Tooltip */}
              {hoveredItem === item.id && (
                <div className="absolute right-14 px-3 py-1.5 bg-black/85 text-white text-xs font-medium tracking-wide rounded-full whitespace-nowrap backdrop-blur-md border border-white/20 shadow-lg pointer-events-none transition-all duration-200 animate-in fade-in slide-in-from-right-2 z-50">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Scroll To Top Quick Button */}
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredItem("top")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-700 dark:text-white/50 hover:bg-white/30 dark:hover:bg-white/20 hover:text-[#c22026] hover:scale-110 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>

          {hoveredItem === "top" && (
            <div className="absolute right-14 px-3 py-1.5 bg-black/85 text-white text-xs font-medium tracking-wide rounded-full whitespace-nowrap backdrop-blur-md border border-white/20 shadow-lg pointer-events-none transition-all duration-200 animate-in fade-in slide-in-from-right-2 z-50">
              Back to Top
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
