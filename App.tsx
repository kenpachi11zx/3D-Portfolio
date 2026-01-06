import React, { Suspense } from 'react';
import { Scene } from './components/Scene';
import { HUD } from './components/HUD';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden text-[#e2e8f0]">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-cyan-400 font-mono">INITIALIZING NEURAL LINK...</div>}>
          <Scene />
        </Suspense>
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <HUD />
      </div>

      {/* CRT Scanline Effect */}
      <div className="scanline"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] z-20"></div>
    </div>
  );
};

export default App;