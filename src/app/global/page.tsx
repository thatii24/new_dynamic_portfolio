import Link from "next/link";
import WorldMap from "@/components/WorldMap";

export default function GlobalProjectsPage() {
  return (
    <div className="relative w-full min-h-screen font-sans bg-black text-white selection:bg-[#c22026] selection:text-white flex flex-col">
      {/* Dynamic grain/noise texture overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>
      
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center text-xs uppercase tracking-widest text-white/70 font-semibold">
        <Link href="/" className="flex items-center gap-2 group hover:text-white transition-colors">
          <span className="text-[#c22026] text-xl leading-none group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
          <span>Back to Portfolio</span>
        </Link>
        <Link href="/contact" className="flex items-center gap-2 group hover:text-white transition-colors">
          <span>Available for Freelance</span>
          <span className="text-[#c22026] text-xl leading-none group-hover:rotate-90 transition-transform duration-300">+</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center w-full max-w-[1400px] mx-auto px-6 py-24">
        <WorldMap />
      </main>
    </div>
  );
}
