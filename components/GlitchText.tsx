import React from 'react';

interface GlitchTextProps {
  text: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
  return (
    <div className="glitch-wrapper">
      <h1 
        className="glitch text-4xl md:text-7xl font-bold tracking-widest text-white font-['Share_Tech_Mono']" 
        data-text={text}
      >
        {text}
      </h1>
      <div className="text-xs md:text-sm text-pink-500 font-mono tracking-[0.5em] mt-2 opacity-80">
        FULL STACK DEVELOPER // CREATIVE TECHNOLOGIST
      </div>
    </div>
  );
};