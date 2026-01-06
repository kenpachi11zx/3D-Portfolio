import React, { useState, useEffect } from 'react';
import { GlitchText } from './GlitchText';
import { Terminal } from './Terminal';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'projects', label: 'PROJECTS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
];

export const HUD: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [activeNav, setActiveNav] = useState<string | null>(null);

  // Clock Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: HH:MM:SS:MS
      const t = now.toISOString().split('T')[1].slice(0, 12).replace('.', ':');
      setTime(t);
    };
    
    const interval = setInterval(updateTime, 50);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-8 font-['Rajdhani']">
      
      {/* Top Bar */}
      <div className="flex justify-between items-start w-full">
        {/* Top Left: System Status */}
        <div className="flex flex-col gap-1 border-l-2 border-cyan-400 pl-4 bg-gradient-to-r from-[rgba(0,255,234,0.1)] to-transparent pr-8 py-2">
           <div className="text-xs text-cyan-400 tracking-widest font-bold font-mono">SYSTEM_STATUS</div>
           <div className="text-2xl font-bold tracking-widest text-white drop-shadow-[0_0_5px_rgba(0,255,234,0.8)]">ONLINE</div>
           <div className="text-[10px] text-gray-400 font-mono tracking-wider">NET_VER: 4.2.0 // SECURE</div>
        </div>

        {/* Top Right: Clock & Coordinates */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-500 animate-pulse rounded-full"></div>
            <div className="text-xl font-mono text-cyan-400 font-bold tracking-widest">{time}</div>
          </div>
          <div className="text-[10px] text-pink-500 font-mono text-right">
            LOC: 34.0522° N, 118.2437° W<br/>
            ORBIT_STABLE
          </div>
        </div>
      </div>

      {/* Center: Main Title & Navigation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-8 w-full max-w-2xl pointer-events-auto">
        <GlitchText text="THE NEURAL VOID" />
        
        <div className="flex gap-4 md:gap-12 mt-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onMouseEnter={() => setActiveNav(item.id)}
              onMouseLeave={() => setActiveNav(null)}
              className={`
                relative px-6 py-2 text-lg md:text-xl font-bold tracking-[0.2em] transition-all duration-300
                border border-transparent hover:border-cyan-400 hover:bg-[rgba(0,255,234,0.1)]
                group overflow-hidden
              `}
              style={{
                color: activeNav === item.id ? '#00ffea' : '#94a3b8',
                textShadow: activeNav === item.id ? '0 0 10px rgba(0,255,234,0.8)' : 'none'
              }}
            >
               {/* Corner Brackets */}
               <span className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400 transition-all duration-300 ${activeNav === item.id ? 'opacity-100' : 'opacity-0'}`}></span>
               <span className={`absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400 transition-all duration-300 ${activeNav === item.id ? 'opacity-100' : 'opacity-0'}`}></span>
               <span className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400 transition-all duration-300 ${activeNav === item.id ? 'opacity-100' : 'opacity-0'}`}></span>
               <span className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400 transition-all duration-300 ${activeNav === item.id ? 'opacity-100' : 'opacity-0'}`}></span>
               
               {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Terminal */}
      <div className="flex justify-between items-end w-full">
         <Terminal />
         
         <div className="hidden md:block text-right">
            <div className="text-[10px] text-gray-500 font-mono mb-1">MEMORY USAGE</div>
            <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-400 w-[60%] animate-pulse"></div>
            </div>
            <div className="text-[10px] text-cyan-400 font-mono mt-1">64% / 128TB</div>
         </div>
      </div>

      {/* Decorative Crosshairs */}
      <div className="absolute top-1/2 left-8 w-4 h-4 border border-gray-700 hidden md:block opacity-50"></div>
      <div className="absolute top-1/2 right-8 w-4 h-4 border border-gray-700 hidden md:block opacity-50"></div>
      <div className="absolute bottom-16 left-1/2 w-px h-8 bg-gray-700 hidden md:block opacity-50"></div>
      
    </div>
  );
};