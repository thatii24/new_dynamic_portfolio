import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative w-full min-h-screen font-sans bg-black text-white selection:bg-[#c22026] selection:text-white flex flex-col">
      {/* Dynamic grain/noise texture overlay to match dark aesthetic */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>
      
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center text-xs uppercase tracking-widest text-white/70 font-semibold">
        <Link href="/" className="flex items-center gap-2 group hover:text-white transition-colors">
          <span className="text-[#c22026] text-xl leading-none group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
          <span>Back to Portfolio</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col md:flex-row items-stretch w-full max-w-[1400px] mx-auto mt-24 md:mt-0">
        
        {/* Left Side: Typography & Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-12">
          <span className="font-serif italic text-3xl md:text-5xl text-white/80 mb-4">Let&apos;s create</span>
          <h1 className="font-oswald text-6xl md:text-[7rem] font-bold leading-[0.85] text-white tracking-tight uppercase mb-8">
            Something<br />
            <span className="text-[#c22026]">Incredible.</span>
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-md leading-relaxed mb-12">
            I&apos;m currently available for freelance projects. Whether you have a specific idea in mind or need help conceptualizing a new digital experience, let&apos;s talk about it.
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-[#c22026] text-xs font-bold uppercase tracking-widest mb-2">Email</h4>
              <a href="mailto:hello@example.com" className="text-lg hover:text-[#c22026] transition-colors border-b border-transparent hover:border-[#c22026]">hello@example.com</a>
            </div>
            <div>
              <h4 className="text-[#c22026] text-xs font-bold uppercase tracking-widest mb-2">Socials</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#c22026] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#c22026] transition-colors">Twitter</a>
                <a href="#" className="hover:text-[#c22026] transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-12">
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl">
            <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 font-oswald text-white">Project Inquiry</h3>
            
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Your Name</label>
                  <input type="text" id="name" className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#c22026] transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Email Address</label>
                  <input type="email" id="email" className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#c22026] transition-colors" placeholder="john@company.com" />
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="service" className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Service Needed</label>
                <select id="service" className="bg-black/50 border border-white/20 rounded-md p-3 text-white focus:outline-none focus:border-[#c22026] transition-colors appearance-none">
                  <option value="uiux">UI/UX Design</option>
                  <option value="webdev">Web Development</option>
                  <option value="branding">Branding</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Project Details</label>
                <textarea id="message" rows={4} className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-[#c22026] transition-colors resize-none" placeholder="Tell me about your project, timeline, and goals..."></textarea>
              </div>

              <button type="submit" className="mt-6 bg-[#c22026] text-white font-bold uppercase tracking-widest text-sm py-4 px-8 rounded-sm hover:bg-white hover:text-[#c22026] transition-colors duration-300 w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}
