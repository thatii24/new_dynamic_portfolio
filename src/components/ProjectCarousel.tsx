"use client";

import { useState } from "react";

const projects = [
  { num: '01', title: 'Veloce Bikes', desc: 'E-Commerce Website' },
  { num: '02', title: 'Woodcraft', desc: 'Furniture Website' },
  { num: '03', title: 'Ursanic', desc: 'Fashion Magazine' },
  { num: '04', title: 'Aero', desc: 'Landing Page Design' },
  { num: '05', title: 'Nexus', desc: 'Mobile App UX' },
];

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <div 
      className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {projects.map((proj, idx) => {
        const distance = idx - activeIndex;
        
        // Calculate transforms based on distance from active card
        let translateX = 0;
        let translateZ = 0;
        let rotateY = 0;
        let opacity = 1;
        let zIndex = 50;

        if (distance === 0) {
          translateX = 0;
          translateZ = 0;
          rotateY = 0;
          opacity = 1;
          zIndex = 50;
        } else if (distance < 0) {
          translateX = -60 * Math.abs(distance);
          translateZ = -250 * Math.abs(distance);
          rotateY = 35;
          opacity = 1 - (Math.abs(distance) * 0.2);
          zIndex = 50 - Math.abs(distance);
        } else {
          translateX = 60 * Math.abs(distance);
          translateZ = -250 * Math.abs(distance);
          rotateY = -35;
          opacity = 1 - (Math.abs(distance) * 0.2);
          zIndex = 50 - Math.abs(distance);
        }

        // Hide cards that are too far away
        if (Math.abs(distance) > 2) {
          opacity = 0;
          zIndex = 0;
        }

        return (
          <div
            key={proj.num}
            onClick={() => setActiveIndex(idx)}
            className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none"
            style={{
              transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
              zIndex,
              opacity,
              // Pointer events only on visible cards
              pointerEvents: Math.abs(distance) > 2 ? 'none' : 'auto',
            }}
          >
            <div className="w-[280px] md:w-[380px] aspect-[3/4] bg-black/60 rounded-3xl overflow-hidden relative backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-end p-8 group hover:border-[#c22026]/50 transition-colors">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center font-oswald text-7xl text-white/5 z-0 group-hover:text-white/10 transition-colors">
                IMG
              </div>
              
              <div className="relative z-20 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <span className="text-6xl font-oswald text-[#c22026] mb-2 block leading-none">{proj.num}</span>
                <h4 className="text-2xl font-bold uppercase tracking-wider mb-2 text-white">{proj.title}</h4>
                <p className="text-xs uppercase tracking-widest text-white/50">{proj.desc}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "bg-[#c22026] w-8" : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
