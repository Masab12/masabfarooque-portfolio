'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.18;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.24;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#00f0ff"
        distort={0.42}
        speed={1.8}
        roughness={0.12}
        metalness={0.85}
        opacity={0.85}
        transparent
      />
    </Sphere>
  );
}

export default function FloatingOrb3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color="#8b5cf6" />
      <OrbMesh />
    </Canvas>
  );
}
