import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

export const HeroObject: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate the object
  useFrame((state) => {
    if (meshRef.current) {
      // Basic rotation addition
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1} 
      floatIntensity={2} 
    >
      <Icosahedron
        ref={meshRef}
        args={[1.5, 0]} // radius, detail
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#ff0055" : "#00ffea"}
          attach="material"
          distort={hovered ? 0.8 : 0.4} // Distort more when hovered
          speed={hovered ? 5 : 2} // Move faster when hovered
          roughness={0.2}
          metalness={0.8}
          wireframe={true} // Wireframe aesthetic
          emissive={hovered ? "#550022" : "#004444"}
          emissiveIntensity={0.5}
        />
      </Icosahedron>
      
      {/* Inner solid core for contrast */}
      <Icosahedron args={[0.8, 0]}>
         <meshBasicMaterial color="#000000" wireframe={false} transparent opacity={0.9} />
      </Icosahedron>
    </Float>
  );
};