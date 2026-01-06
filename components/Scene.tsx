import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles, Stars, Environment } from '@react-three/drei';
import { HeroObject } from './HeroObject';

export const Scene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <color attach="background" args={['#050505']} />
      
      {/* Ambient and Point Lights for basic illumination */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffea" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0055" />

      {/* The Main Hero Object */}
      <HeroObject />

      {/* Environmental Particles */}
      <Sparkles 
        count={200} 
        scale={12} 
        size={3} 
        speed={0.4} 
        opacity={0.6}
        color="#00ffea"
      />
      <Sparkles 
        count={100} 
        scale={10} 
        size={2} 
        speed={0.2} 
        opacity={0.4}
        color="#ff0055"
      />
      
      {/* Deep Space Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={2 * Math.PI / 3}
      />
      
      {/* Post Processing could be added here, keeping it raw for performance as requested */}
    </Canvas>
  );
};