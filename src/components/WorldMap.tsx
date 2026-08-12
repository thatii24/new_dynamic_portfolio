"use client";

import { useState } from "react";

// Data for projects across different continents
const continents = [
  { 
    id: 'na', name: 'North America', top: '30%', left: '18%', 
    project: { title: 'Veloce Bikes', client: 'TechCorp USA', desc: 'A full-stack e-commerce solution built with Next.js.', img: '01' } 
  },
  { 
    id: 'sa', name: 'South America', top: '65%', left: '30%', 
    project: { title: 'EcoTrack', client: 'Green Rio', desc: 'Mobile app UI/UX for environmental tracking.', img: '02' } 
  },
  { 
    id: 'eu', name: 'Europe', top: '28%', left: '50%', 
    project: { title: 'Woodcraft', client: 'London Designs', desc: 'Premium furniture showcase and AR app.', img: '03' } 
  },
  { 
    id: 'af', name: 'Africa', top: '55%', left: '52%', 
    project: { title: 'Safar', client: 'Tourism Board', desc: 'Web platform connecting local guides with tourists.', img: '04' } 
  },
  { 
    id: 'as', name: 'Asia', top: '32%', left: '73%', 
    project: { title: 'Nexus', client: 'Tokyo Tech', desc: 'Modern fintech application dashboard.', img: '05' } 
  },
  { 
    id: 'oc', name: 'Oceania', top: '75%', left: '86%', 
    project: { title: 'Aero', client: 'Sydney Aviation', desc: 'Landing page design for private jet charters.', img: '06' } 
  },
];

// Extremely simplified world map SVG path for styling and performance
const WORLD_MAP_SVG_PATH = "M 13.9 14.6 L 15.3 15.6 L 15.3 16.5 L 14.3 17.5 L 12.8 17.5 L 12.3 16.5 Z M 21.6 15.6 L 24.5 15.6 L 25.5 14.6 L 25.5 13.6 L 24.5 12.7 L 23.6 12.7 L 22.6 13.6 L 21.6 13.6 Z M 48.7 13.6 L 49.7 12.7 L 51.6 12.7 L 53.6 14.6 L 54.5 14.6 L 54.5 16.5 L 53.6 17.5 L 51.6 17.5 L 50.7 18.5 L 49.7 18.5 L 48.7 17.5 Z M 72.9 14.6 L 73.9 13.6 L 75.8 13.6 L 76.8 14.6 L 76.8 16.5 L 75.8 17.5 L 74.9 17.5 L 73.9 16.5 Z M 16.7 19.5 L 17.7 18.5 L 19.6 18.5 L 20.6 19.5 L 20.6 22.4 L 21.6 23.3 L 21.6 24.3 L 20.6 25.3 L 19.6 25.3 L 18.7 26.3 L 17.7 26.3 L 16.7 25.3 Z M 25.5 19.5 L 27.5 17.5 L 29.4 17.5 L 30.4 18.5 L 30.4 20.4 L 29.4 21.4 L 28.5 21.4 L 27.5 22.4 L 25.5 22.4 Z M 50.7 20.4 L 51.6 19.5 L 53.6 19.5 L 54.5 20.4 L 54.5 22.4 L 53.6 23.3 L 52.6 23.3 L 51.6 24.3 L 50.7 24.3 Z M 75.8 20.4 L 77.8 18.5 L 79.8 18.5 L 80.7 19.5 L 80.7 21.4 L 79.8 22.4 L 78.8 22.4 L 77.8 23.3 L 75.8 23.3 Z M 19.6 28.2 L 20.6 27.2 L 22.6 27.2 L 24.5 29.2 L 24.5 32.1 L 23.6 33.1 L 21.6 33.1 L 20.6 34.0 L 19.6 34.0 Z M 28.5 25.3 L 29.4 24.3 L 31.4 24.3 L 32.4 25.3 L 32.4 28.2 L 31.4 29.2 L 29.4 29.2 L 28.5 28.2 Z M 52.6 26.3 L 53.6 25.3 L 55.6 25.3 L 56.5 26.3 L 56.5 29.2 L 55.6 30.1 L 53.6 30.1 L 52.6 29.2 Z M 78.8 25.3 L 80.7 23.3 L 82.7 23.3 L 83.7 24.3 L 83.7 26.3 L 82.7 27.2 L 80.7 27.2 L 78.8 25.3 Z M 22.6 35.0 L 23.6 34.0 L 25.5 34.0 L 27.5 36.0 L 27.5 38.9 L 26.5 39.9 L 24.5 39.9 L 23.6 40.8 L 22.6 40.8 Z M 32.4 30.1 L 34.4 28.2 L 36.3 28.2 L 37.3 29.2 L 37.3 32.1 L 36.3 33.1 L 34.4 33.1 L 32.4 31.1 Z M 56.5 31.1 L 57.5 30.1 L 59.5 30.1 L 61.4 32.1 L 61.4 35.0 L 60.5 36.0 L 58.5 36.0 L 57.5 35.0 L 56.5 34.0 Z M 83.7 29.2 L 85.6 27.2 L 87.6 27.2 L 88.6 28.2 L 88.6 30.1 L 87.6 31.1 L 85.6 31.1 L 83.7 29.2 Z";

export default function WorldMap() {
  const [activeContinent, setActiveContinent] = useState<string | null>(null);

  // Adjusted coordinates to precisely match the spherical layout of the generated map
  // The globe occupies the center 60% of the image, so we keep coordinates within that range
  const continents = [
    { 
      id: 'na', name: 'North America', top: '33%', left: '26%', 
      project: { title: 'Veloce Bikes', client: 'TechCorp USA', desc: 'A full-stack e-commerce solution built with Next.js.', img: '01' } 
    },
    { 
      id: 'sa', name: 'South America', top: '62%', left: '35%', 
      project: { title: 'EcoTrack', client: 'Green Rio', desc: 'Mobile app UI/UX for environmental tracking.', img: '02' } 
    },
    { 
      id: 'eu', name: 'Europe', top: '32%', left: '52%', 
      project: { title: 'Woodcraft', client: 'London Designs', desc: 'Premium furniture showcase and AR app.', img: '03' } 
    },
    { 
      id: 'af', name: 'Africa', top: '50%', left: '53%', 
      project: { title: 'Safar', client: 'Tourism Board', desc: 'Web platform connecting local guides with tourists.', img: '04' } 
    },
    { 
      id: 'as', name: 'Asia', top: '35%', left: '68%', 
      project: { title: 'Nexus', client: 'Tokyo Tech', desc: 'Modern fintech application dashboard.', img: '05' } 
    },
    { 
      id: 'oc', name: 'Oceania', top: '62%', left: '73%', 
      project: { title: 'Aero', client: 'Sydney Aviation', desc: 'Landing page design for private jet charters.', img: '06' } 
    }
  ];

  return (
    <div className="relative w-full h-[70vh] md:h-[90vh] flex flex-col items-center justify-center mt-12 md:mt-16">
      
      {/* Custom Keyframes for slow floating animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowFloat {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
          100% { transform: translateY(0px) scale(1); }
        }
        .animate-slow-float {
          animation: slowFloat 8s ease-in-out infinite;
        }
      `}} />

      {/* Decorative Title */}
      <div className="absolute top-0 text-center z-20">
        <h2 className="font-oswald text-4xl md:text-5xl uppercase tracking-widest text-white mb-2">Global Impact</h2>
        <p className="text-[#c22026] text-xs uppercase tracking-widest font-bold">Projects across the world</p>
      </div>

      {/* Map Container - changed to max-w-[900px] to make it larger, and added custom floating animation */}
      <div className="relative w-full max-w-[900px] aspect-square mt-20 md:mt-12 animate-slow-float">
        
        {/* Background Image (High-Tech Polygonal Map) */}
        {/* Added CSS filters to turn the blue image into a dark red theme to match the site */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-60"
          style={{ 
            backgroundImage: "url('/world-map-bg.png')",
            filter: "grayscale(100%) sepia(100%) hue-rotate(320deg) saturate(300%) brightness(80%) contrast(120%)"
          }}
        />

        {/* Location Markers */}
        {continents.map((continent) => {
          const isActive = activeContinent === continent.id;
          
          return (
            <div 
              key={continent.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ top: continent.top, left: continent.left }}
            >
              {/* The Pin */}
              <div 
                onClick={() => setActiveContinent(isActive ? null : continent.id)}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                {/* Glowing dot replacing the SVG pin for a sleek look */}
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-[#c22026] border-white shadow-[0_0_20px_#c22026]' : 'bg-black/50 backdrop-blur-sm border-white/70 group-hover:border-white group-hover:bg-[#c22026]/50'}`}>
                  <div className={`w-1.5 h-1.5 bg-white rounded-full transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
                
                {/* Pin label (shows on hover if not active) */}
                {!isActive && (
                  <span className="absolute top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-widest font-bold whitespace-nowrap text-white/90 bg-black/80 px-2 py-1 rounded backdrop-blur-md">
                    {continent.name}
                  </span>
                )}
              </div>

              {/* The Details Card (Shows when active) */}
              {isActive && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[280px] bg-black/90 backdrop-blur-xl border border-white/20 p-5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#c22026]">{continent.name}</h4>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveContinent(null); }}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="aspect-video bg-white/5 rounded-md mb-4 overflow-hidden relative flex items-center justify-center border border-white/5">
                     <span className="font-oswald text-4xl text-white/20">0{continent.project.img}</span>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  <h3 className="font-oswald text-2xl uppercase tracking-wider text-white mb-1">{continent.project.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 mb-3">Client: {continent.project.client}</p>
                  <p className="text-xs text-white/80 leading-relaxed">{continent.project.desc}</p>
                  
                  <button className="mt-4 w-full py-2 border border-[#c22026] text-[#c22026] text-[10px] font-bold uppercase tracking-widest hover:bg-[#c22026] hover:text-white transition-colors rounded-sm">
                    View Project Details
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
