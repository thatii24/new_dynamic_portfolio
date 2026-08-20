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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP FLOATING PILL NAVIGATION (Visible on md screens and up)
         ========================================================================= */}
      <nav
        aria-label="Section Navigation"
        className="hidden md:flex fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-50 flex-col items-center select-none"
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

      {/* =========================================================================
          RESPONSIVE / MOBILE HIDDEN MENU (Visible on screens < md)
         ========================================================================= */}
      {/* Mobile Floating Menu Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-black/80 text-white backdrop-blur-xl border border-white/25 shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 group hover:border-[#c22026]/60"
        >
          {/* Subtle glowing ring */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c22026]/30 to-amber-500/20 blur-sm pointer-events-none" />

          {/* Animated Hamburger / Close Icon */}
          <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Backdrop Overlay when Mobile Menu is Open */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 md:hidden animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* Mobile Hidden Menu Popup / Sheet */}
      <aside
        aria-label="Mobile Navigation"
        className={`fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-3xl bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/20 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Mobile Header / Profile preview */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#c22026] to-amber-500 shadow-md flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={`${basePath}/profile-mockup.png`}
                alt="Thatila Wijayathunga"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <span className="text-xs font-bold text-white font-oswald uppercase">TW</span>
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <span className="text-sm font-bold text-white tracking-wide font-oswald uppercase">
              Thatila Wijayathunga
            </span>
            <span className="text-[11px] text-white/60 tracking-wider">
              Web Designer & Creator
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Section Navigation Items */}
        <div className="flex flex-col gap-1.5 py-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-2xl transition-all duration-200 text-left ${
                  isActive
                    ? "bg-[#c22026] text-white font-semibold shadow-md shadow-[#c22026]/30"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? "text-white" : "text-white/70"}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Quick Links & Actions */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-2">
            {bottomItems.map((item) => {
              const isActive = activeSection === item.id;
              if (item.isExternalLink) {
                return (
                  <Link
                    key={item.id}
                    href={item.href || "#"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-all"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition-all text-xs font-medium ${
                    isActive
                      ? "bg-white text-slate-900 border-white font-semibold shadow-sm"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center gap-2 w-full py-2 mt-1 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
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
            <span>Back to top</span>
          </button>
        </div>
      </aside>
    </>
  );
}
