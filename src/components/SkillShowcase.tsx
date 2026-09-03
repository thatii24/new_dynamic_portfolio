"use client";

import { useState } from "react";

const skillsData = [
  {
    id: 1,
    title: "Web Design",
    description: "Creating visually stunning and user-friendly web interfaces focused on clean aesthetics and modern layouts.",
    certificate: "Google UX Design Professional Certificate",
    year: "2023",
    color: "#c22026",
    icon: "🎨"
  },
  {
    id: 2,
    title: "UI/UX Development",
    description: "Translating wireframes and designs into high-quality code. Bridging the gap between graphical design and technical implementation.",
    certificate: "Frontend Web Development Bootcamp",
    year: "2024",
    color: "#970D18",
    icon: "💻"
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "Designing compelling visuals, logos, and brand identities that communicate the right message to the audience.",
    certificate: "Advanced Graphic Design Specialization",
    year: "2022",
    color: "#ff4d4d",
    icon: "✨"
  },
  {
    id: 4,
    title: "Motion Graphics",
    description: "Bringing static designs to life through animation and video editing, enhancing user engagement and experience.",
    certificate: "Motion Design Fundamentals",
    year: "2023",
    color: "#ff7043",
    icon: "🎬"
  },
  {
    id: 5,
    title: "3D Modeling",
    description: "Creating 3D models and rendering scenes for product showcases and immersive web experiences.",
    certificate: "Blender 3D Masterclass",
    year: "2024",
    color: "#d84315",
    icon: "🧊"
  }
];

export default function SkillShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Settings for the circular menu
  const radius = 800; // Radius of the circle
  const startAngle = -20; // Angle for the first item
  const angleStep = 10; // Angle difference between items

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center py-12 overflow-hidden">
      
      {/* Left side: Circular Mission Selection Menu */}
      <div className="relative w-full md:w-1/2 h-[60vh] md:h-[70vh] flex items-center justify-start hidden md:flex">
        
        {/* Background Decorative Rings */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-[1400px] w-[1600px] h-[1600px] rounded-full border border-white/10 z-0 shadow-[0_0_50px_rgba(0,0,0,0.5)_inset]"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -left-[1420px] w-[1640px] h-[1640px] rounded-full border border-white/5 z-0"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -left-[1380px] w-[1560px] h-[1560px] rounded-full border border-white/5 z-0"></div>

        {/* The Menu Items Container positioned at the center of the ring */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-[1400px] w-[1600px] h-[1600px] z-10 pointer-events-none">
          {skillsData.map((skill, index) => {
            const angle = startAngle + index * angleStep;
            return (
              <div
                key={skill.id}
                onClick={() => setActiveIndex(index)}
                className="absolute left-1/2 top-1/2 flex items-center gap-4 cursor-pointer group pointer-events-auto transition-all duration-300"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                }}
              >
                {/* Active Indicator Line connecting to center (optional, hidden by default but adds to the game UI feel) */}
                <div 
                  className={`absolute right-full top-1/2 -translate-y-1/2 h-px transition-all duration-500 bg-gradient-to-r from-transparent ${activeIndex === index ? 'to-[#c22026] w-12 opacity-100' : 'to-white/20 w-8 opacity-0 group-hover:opacity-100'}`} 
                  style={{ marginRight: '8px' }}
                />

                {/* Icon Circle */}
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-500 relative z-10
                    ${activeIndex === index 
                      ? 'bg-black scale-110 shadow-[0_0_20px_rgba(194,32,38,0.4)]' 
                      : 'bg-black/60 hover:bg-black/80'
                    }`}
                  style={{ border: `2px solid ${activeIndex === index ? skill.color : 'rgba(255,255,255,0.2)'}` }}
                >
                  {skill.icon}
                  {/* Subtle pulsing background for active item */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: skill.color }}></div>
                  )}
                </div>

                {/* Text Details */}
                <div className={`whitespace-nowrap transition-all duration-500 transform ${activeIndex === index ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1'}`}>
                  <h4 className="text-lg font-bold uppercase tracking-widest" style={{ color: activeIndex === index ? skill.color : '#ffffff' }}>
                    {skill.title}
                  </h4>
                  {activeIndex === index && (
                    <span className="text-[10px] text-white/50 uppercase tracking-widest block mt-1">
                      Selected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile view for left side (standard list since circle is hard on small screens) */}
      <div className="w-full h-auto flex gap-4 overflow-x-auto pb-4 px-6 md:hidden snap-x">
        {skillsData.map((skill, index) => (
          <div
            key={skill.id}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 snap-center flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              activeIndex === index ? 'bg-white/10 border-[#c22026]' : 'bg-black/40 border-white/10'
            }`}
          >
            <div className="text-2xl">{skill.icon}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-center max-w-[80px] break-words">
              {skill.title}
            </div>
          </div>
        ))}
      </div>

      {/* Right side: Details Panel */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] flex items-center justify-center relative px-6 md:px-0">
        <div className="w-full max-w-lg h-full max-h-[500px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-center overflow-hidden relative group shadow-2xl">
          {/* Background Accent */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-colors duration-1000 -z-10"
            style={{ backgroundColor: skillsData[activeIndex].color }}
          />

          {/* Glitchy/Game UI decorative corner elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 m-4 rounded-tl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 m-4 rounded-br"></div>

          <div className="relative z-10 transition-all duration-500 transform animate-in fade-in slide-in-from-right-8" key={activeIndex}>
            <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-xl border border-white/10" style={{ backgroundColor: skillsData[activeIndex].color + '33' }}>
              {skillsData[activeIndex].icon}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-oswald font-bold uppercase tracking-tight text-white mb-6">
              {skillsData[activeIndex].title}
            </h2>
            
            <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 md:mb-10 font-normal">
              {skillsData[activeIndex].description}
            </p>

            <div className="border-t border-white/10 pt-6 md:pt-8">
              <h4 className="text-[#ff3b47] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4 drop-shadow-[0_0_8px_rgba(255,59,71,0.4)]">Mission Objective / Certificate</h4>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <div className="font-bold text-sm md:text-lg mb-1 text-white">{skillsData[activeIndex].certificate}</div>
                  <div className="text-xs text-white/80 font-medium">Verified Credential</div>
                </div>
                <div className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full border border-white/20 whitespace-nowrap self-start">
                  Year {skillsData[activeIndex].year}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
