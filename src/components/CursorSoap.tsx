import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const SoapBar = () => {
  const meshRef = useRef<THREE.Group>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetPos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetPos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Faster follow logic for "snappy" feel but still smooth
    currentPos.current.x += (targetPos.current.x * 5 - currentPos.current.x) * 0.08;
    currentPos.current.y += (targetPos.current.y * 3 - currentPos.current.y) * 0.08;

    meshRef.current.position.set(currentPos.current.x, currentPos.current.y, 0);
    
    // Dramatic tilt based on movement direction
    meshRef.current.rotation.y = (targetPos.current.x - currentPos.current.x/5) * 5;
    meshRef.current.rotation.x = -(targetPos.current.y - currentPos.current.y/3) * 5;
    // Base spin
    meshRef.current.rotation.z += delta * 0.5;
  });

  return (
    <>
      <group ref={meshRef}>
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
          <RoundedBox args={[0.8, 0.5, 0.25]} radius={0.12} smoothness={4}>
            <meshStandardMaterial 
              color="#ffda79" // Deep Mango Gold
              roughness={0.1}
              metalness={0.3}
              emissive="#f8b400"
              emissiveIntensity={0.4}
            />
          </RoundedBox>
        </Float>
      </group>
    </>
  );
};

export const CursorSoap = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-80 select-none">
      <Canvas shadows dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <SoapBar />
      </Canvas>
    </div>
  );
};
