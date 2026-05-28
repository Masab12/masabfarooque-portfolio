'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface AIDataCoreProps {
  isVisible: boolean;
}

function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1000;
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      colors[i3] = 0.0;
      colors[i3 + 1] = 0.9;
      colors[i3 + 2] = 1.0;
    }
    
    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function AIDataCore({ isVisible }: AIDataCoreProps) {
  if (!isVisible) return null;
  
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <ParticleSystem />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}