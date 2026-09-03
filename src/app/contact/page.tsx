"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
  website: string; // Honeypot trap
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
    website: "", // Honeypot field (must stay blank for humans)
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setSuccessMessage("");

    // Quick client-side check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send inquiry. Please try again.");
      }

      setStatus("success");
      setSuccessMessage(data.message || "Thank you! Your project inquiry has been sent directly to Thatila.");
      setFormData({
        name: "",
        email: "",
        service: "Web Development",
        message: "",
        website: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while transmitting your message."
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen font-sans bg-black text-white selection:bg-[#c22026] selection:text-white flex flex-col justify-between">
      {/* Dynamic grain/noise texture overlay to match dark aesthetic */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-xs uppercase tracking-widest text-white/70 font-semibold backdrop-blur-sm bg-black/20">
        <Link href="/" className="flex items-center gap-2 group hover:text-white transition-colors">
          <span className="text-[#c22026] text-xl leading-none group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-400 text-[10px] md:text-xs">Available for Hire</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col md:flex-row items-center justify-center w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16">
        
        {/* Left Side: Typography & Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:pr-12">
          <span className="font-serif italic text-3xl md:text-5xl text-white/80 mb-3">Let&apos;s create</span>
          <h1 className="font-oswald text-5xl sm:text-6xl md:text-[6.5rem] font-bold leading-[0.88] text-white tracking-tight uppercase mb-8">
            Something<br />
            <span className="text-[#c22026]">Incredible.</span>
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-lg leading-relaxed mb-10">
            I&apos;m currently available for freelance projects worldwide. Whether you have a clear vision or need end-to-end design &amp; development expertise, let&apos;s build an extraordinary digital product.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <h4 className="text-[#c22026] text-[10px] font-bold uppercase tracking-widest mb-1.5">Direct Inbox</h4>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "thatilawijayathunga@gmail.com"}`}
                className="text-sm sm:text-base font-medium text-white/90 hover:text-[#c22026] transition-colors break-all"
              >
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "thatilawijayathunga@gmail.com"}
              </a>
            </div>
            <div>
              <h4 className="text-[#c22026] text-[10px] font-bold uppercase tracking-widest mb-1.5">Phone / WhatsApp</h4>
              <a
                href={`tel:${(process.env.NEXT_PUBLIC_CONTACT_PHONE || "+94781263743").replace(/\s+/g, "")}`}
                className="text-sm sm:text-base font-medium text-white/90 hover:text-[#c22026] transition-colors"
              >
                {process.env.NEXT_PUBLIC_CONTACT_PHONE || "+94 78 1263 743"}
              </a>
            </div>
            <div>
              <h4 className="text-[#c22026] text-[10px] font-bold uppercase tracking-widest mb-1.5">Location</h4>
              <span className="text-sm text-white/80">Kandy, Sri Lanka &bull; Remote Worldwide</span>
            </div>
            <div>
              <h4 className="text-[#c22026] text-[10px] font-bold uppercase tracking-widest mb-1.5">Socials</h4>
              <div className="flex gap-4 text-sm text-white/80">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c22026] transition-colors">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c22026] transition-colors">GitHub</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c22026] transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-8">
          <div className="bg-white/[0.04] border border-white/15 p-8 sm:p-10 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            {/* Corner ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c22026]/10 blur-3xl pointer-events-none rounded-full" />
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h3 className="text-2xl font-bold uppercase tracking-wider font-oswald text-white flex items-center gap-2">
                <span>Project Inquiry</span>
                <span className="text-[#c22026] text-xl">&bull;</span>
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-white/40">Secure Submission</span>
            </div>

            {/* Success Banner */}
            {status === "success" && (
              <div className="mb-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3.5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                  &#10003;
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white mb-1">Message Dispatched!</span>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">{successMessage}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-3 text-[11px] font-semibold text-emerald-400 hover:text-white underline text-left cursor-pointer transition-colors"
                  >
                    Send another inquiry &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3 animate-in fade-in duration-300">
                <span className="text-red-400 text-lg leading-none">&#9888;</span>
                <span className="text-xs leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              {/* Anti-Spam Honeypot Field (Hidden from real users, caught by bots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website Address</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-semibold">
                    Your Name <span className="text-[#c22026]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c22026] transition-colors disabled:opacity-50 text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-semibold">
                    Email Address <span className="text-[#c22026]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c22026] transition-colors disabled:opacity-50 text-sm"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="service" className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-semibold">
                  Service Needed
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full bg-black/60 border border-white/20 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#c22026] transition-colors appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="Web Development" className="bg-[#121216] text-white">Full-Stack Web Development</option>
                    <option value="UI/UX Design" className="bg-[#121216] text-white">UI/UX Design &amp; Prototyping</option>
                    <option value="Interactive Experiences" className="bg-[#121216] text-white">Interactive 3D / WebGL Animation</option>
                    <option value="Brand Identity" className="bg-[#121216] text-white">Brand Identity &amp; Strategy</option>
                    <option value="Consultation / Other" className="bg-[#121216] text-white">Consultation / Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-white/60 mb-2 font-semibold">
                  Project Details &amp; Timeline <span className="text-[#c22026]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c22026] transition-colors resize-none disabled:opacity-50 text-sm"
                  placeholder="Tell me about your project, goals, and estimated timeframe..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 bg-[#c22026] text-white font-bold uppercase tracking-widest text-xs sm:text-sm py-4 px-8 rounded-xl hover:bg-white hover:text-[#c22026] active:scale-[0.99] transition-all duration-300 w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_25px_rgba(194,32,38,0.4)]"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Send Project Inquiry</span>
                    <span className="text-lg leading-none">&rarr;</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 text-center mt-1">
                <svg className="w-3.5 h-3.5 text-emerald-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Direct encrypted delivery to Thatila&apos;s personal inbox</span>
              </div>
            </form>
          </div>
        </div>

      </main>

      {/* Subtle Footer Note */}
      <footer className="relative z-10 w-full py-6 text-center text-[11px] uppercase tracking-widest text-white/30 border-t border-white/5">
        &copy; {new Date().getFullYear()} Thatila Wijayathunga &bull; All Rights Reserved
      </footer>
    </div>
  );
}
