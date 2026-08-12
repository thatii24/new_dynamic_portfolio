"use client";

export default function AnimatedSkills() {
  // Using local SVG files downloaded to public/logos/
  const icons = [
    { name: "Photoshop", src: "/logos/photoshop.svg", top: "10%", left: "10%", delay: "0s", rotate: "-10deg", size: "w-12 h-12 md:w-16 md:h-16" },
    { name: "Illustrator", src: "/logos/illustrator.svg", top: "5%", left: "70%", delay: "0.5s", rotate: "15deg", size: "w-10 h-10 md:w-14 md:h-14" },
    { name: "Premiere Pro", src: "/logos/premierepro.svg", top: "70%", left: "15%", delay: "1s", rotate: "5deg", size: "w-14 h-14 md:w-20 md:h-20" },
    { name: "Figma", src: "/logos/figma.svg", top: "65%", left: "80%", delay: "1.5s", rotate: "-15deg", size: "w-12 h-12 md:w-16 md:h-16" },
    { name: "Canva", src: "/logos/canva.svg", top: "85%", left: "45%", delay: "0.2s", rotate: "10deg", size: "w-10 h-10 md:w-14 md:h-14" },
    { name: "Blender", src: "/logos/blender.svg", top: "20%", left: "85%", delay: "0.8s", rotate: "25deg", size: "w-12 h-12 md:w-16 md:h-16" },
  ];

  return (
    <div className="relative w-full h-[250px] flex items-center justify-center overflow-visible mt-4">
      <style>{`
        @keyframes float-icon {
          0% { transform: translateY(0px) rotate(var(--rotate-start)); }
          100% { transform: translateY(-20px) rotate(calc(var(--rotate-start) + 10deg)); }
        }
      `}</style>

      {/* Floating Icons */}
      {icons.map((icon, idx) => (
        <div
          key={idx}
          className="absolute flex items-center justify-center shadow-2xl drop-shadow-2xl"
          style={{
            top: icon.top,
            left: icon.left,
            '--rotate-start': icon.rotate,
            animation: 'float-icon 3s ease-in-out infinite alternate',
            animationDelay: icon.delay,
          } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={icon.src} 
            alt={icon.name} 
            className={`${icon.size} object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`} 
          />
        </div>
      ))}

      {/* Center Text */}
      <div className="flex items-center text-7xl md:text-8xl select-none z-10 drop-shadow-2xl">
        <span className="font-oswald font-bold text-white tracking-tighter">sk</span>
        <span className="font-serif italic text-[#c22026] -ml-2 text-8xl md:text-9xl leading-[0.5]">ills</span>
      </div>
    </div>
  );
}
