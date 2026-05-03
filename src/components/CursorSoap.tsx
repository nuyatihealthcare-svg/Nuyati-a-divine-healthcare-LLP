import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const FOAM_PARTICLE_COUNT = 40; // Reduced for performance and stability

interface FoamParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  scale: number;
  life: number;
  maxLife: number;
  active: boolean;
}

const FoamTrail = ({ targetX, targetY, velocity }: { targetX: number; targetY: number; velocity: { x: number, y: number } }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp: FoamParticle[] = [];
    for (let i = 0; i < FOAM_PARTICLE_COUNT; i++) {
      temp.push({
        pos: new THREE.Vector3(1000, 1000, 1000),
        vel: new THREE.Vector3(0, 0, 0),
        scale: 0.03 + Math.random() * 0.07,
        life: 0,
        maxLife: 0.5 + Math.random() * 1.0,
        active: false
      });
    }
    return temp;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const currentSoapPos = new THREE.Vector3(targetX, targetY, 0);
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    
    particles.forEach((p, i) => {
      if (!p.active) {
        // Chance to release foam based on speed
        if (Math.random() < speed * 0.08) {
          p.active = true;
          p.life = 0;
          p.pos.set(
            targetX + (Math.random() - 0.5) * 0.25, 
            targetY + (Math.random() - 0.5) * 0.2, 
            (Math.random() - 0.5) * 0.15
          );
          // Initial velocity inherits some soap motion but mostly drifts away
          p.vel.set(
            -velocity.x * 0.2 + (Math.random() - 0.5) * 0.4,
            -velocity.y * 0.2 + (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4
          );
        }
      }

      if (p.active) {
        p.life += delta;
        if (p.life > p.maxLife) {
          p.active = false;
          p.pos.set(1000, 1000, 1000);
        } else {
          // Dynamic drag: Particles near the soap are "dragged" by its movement
          const dist = p.pos.distanceTo(currentSoapPos);
          if (dist < 1.5) {
            const dragIntensity = (1 - dist / 1.5) * 0.2;
            p.pos.x += velocity.x * delta * dragIntensity;
            p.pos.y += velocity.y * delta * dragIntensity;
          }

          // Normal physics
          p.pos.add(p.vel.clone().multiplyScalar(delta));
          p.pos.y += delta * 0.15; // Gentle rise
          p.vel.multiplyScalar(0.97); // Air resistance

          const progress = p.life / p.maxLife;
          const s = p.scale * Math.sin(progress * Math.PI);
          dummy.position.copy(p.pos);
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          meshRef.current?.setMatrixAt(i, dummy.matrix);
        }
      }
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, FOAM_PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.4} 
        roughness={0.1} 
        emissive="#fffce0"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  );
};

const SoapContent = () => {
  const meshRef = useRef<THREE.Group>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    prevPos.current.x = currentPos.current.x;
    prevPos.current.y = currentPos.current.y;

    // Smooth movement
    currentPos.current.x += (targetPos.current.x * 5 - currentPos.current.x) * 0.1;
    currentPos.current.y += (targetPos.current.y * 3 - currentPos.current.y) * 0.1;

    // Calculate velocity for foam
    velocity.current.x = (currentPos.current.x - prevPos.current.x) / delta;
    velocity.current.y = (currentPos.current.y - prevPos.current.y) / delta;

    meshRef.current.position.set(currentPos.current.x, currentPos.current.y, 0);
    
    // Tilt
    meshRef.current.rotation.y = (targetPos.current.x - currentPos.current.x/5) * 4;
    meshRef.current.rotation.x = -(targetPos.current.y - currentPos.current.y/3) * 4;
    meshRef.current.rotation.z += delta * 0.5;
  });

  return (
    <>
      <group ref={meshRef}>
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
          <group>
            <RoundedBox args={[0.55, 0.35, 0.18]} radius={0.09} smoothness={8}>
              <meshPhysicalMaterial 
                color="#ffcc33" 
                roughness={0.4}
                metalness={0.05}
                clearcoat={0.9}
                clearcoatRoughness={0.1}
                sheen={1}
                sheenRoughness={0.5}
                sheenColor="#ffffff"
                emissive="#f8b400"
                emissiveIntensity={0.2}
              />
            </RoundedBox>
            <RoundedBox args={[0.25, 0.12, 0.03]} radius={0.03} position={[0, 0, 0.09]}>
              <meshStandardMaterial color="#e6b800" roughness={0.5} />
            </RoundedBox>
            <RoundedBox args={[0.25, 0.12, 0.03]} radius={0.03} position={[0, 0, -0.09]}>
              <meshStandardMaterial color="#e6b800" roughness={0.5} />
            </RoundedBox>
          </group>
        </Float>
      </group>
      <FoamTrail targetX={currentPos.current.x} targetY={currentPos.current.y} velocity={velocity.current} />
    </>
  );
};

export const CursorSoap = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-80 select-none overflow-hidden">
      <Canvas shadows dpr={[1, 1.5]} style={{ pointerEvents: 'none' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#fffcf0" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#ffd400" />
        <SoapContent />
      </Canvas>
    </div>
  );
};
