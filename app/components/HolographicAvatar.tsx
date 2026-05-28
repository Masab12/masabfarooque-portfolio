'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Icosahedron, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Head() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const eyeGlowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.22;
      outerRef.current.rotation.z = Math.sin(t * 0.4) * 0.06;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.35;
      innerRef.current.rotation.y = -t * 0.28;
    }
    if (eyeGlowRef.current) {
      eyeGlowRef.current.intensity = 1.4 + Math.sin(t * 2.2) * 0.4;
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      {/* Core glow */}
      <pointLight ref={eyeGlowRef} position={[0, 0, 0]} color="#00f0ff" intensity={1.8} distance={3.5} />

      {/* Outer wireframe icosahedron */}
      <Icosahedron ref={outerRef} args={[1.15, 1]}>
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.22} />
      </Icosahedron>

      {/* Second icosahedron rotated for complexity */}
      <Icosahedron args={[1.35, 1]} rotation={[0.8, 0.5, 0.2]}>
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.11} />
      </Icosahedron>

      {/* Inner distorted core */}
      <Sphere ref={innerRef} args={[0.72, 32, 32]}>
        <MeshDistortMaterial
          color="#00f0ff"
          distort={0.38}
          speed={2.4}
          roughness={0.08}
          metalness={0.95}
          transparent
          opacity={0.82}
        />
      </Sphere>

      {/* Glowing eyes */}
      <mesh position={[-0.28, 0.18, 0.62]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={3.5} />
      </mesh>
      <mesh position={[0.28, 0.18, 0.62]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={3.5} />
      </mesh>

      {/* Eye glow halos */}
      <pointLight position={[-0.28, 0.18, 0.7]} color="#00f0ff" intensity={0.8} distance={1.2} />
      <pointLight position={[0.28, 0.18, 0.7]} color="#00f0ff" intensity={0.8} distance={1.2} />
    </group>
  );
}

function OrbitRing({ radius, color, speed, tilt }: { radius: number; color: string; speed: number; tilt: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.018, 16, 120]} rotation={tilt}>
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </Torus>
  );
}

function DataOrbs() {
  const count = 14;
  const orbs = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.0 + (i % 3) * 0.3;
      const tilt = (i / count) * Math.PI;
      return { angle, r, tilt, color: i % 2 === 0 ? '#00f0ff' : '#8b5cf6', size: 0.045 + (i % 3) * 0.02 };
    }),
  []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.18;
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={[Math.cos(orb.angle) * orb.r, Math.sin(orb.tilt) * 0.8, Math.sin(orb.angle) * orb.r]}>
          <sphereGeometry args={[orb.size, 8, 8]} />
          <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={2.5} />
        </mesh>
      ))}
    </group>
  );
}

function ScanPlane() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.9) * 1.5;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.9) * 0.03;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ParticleField() {
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.4 + Math.random() * 1.4;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00f0ff" size={0.032} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export default function HolographicAvatar() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.8]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#8b5cf6" />

      <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.55}>
        <group>
          <Head />
          <OrbitRing radius={1.85} color="#00f0ff" speed={0.6}  tilt={[0.3, 0, 0]} />
          <OrbitRing radius={2.15} color="#8b5cf6" speed={-0.4} tilt={[1.1, 0.2, 0]} />
          <OrbitRing radius={1.6}  color="#00f0ff" speed={0.9}  tilt={[Math.PI / 2, 0.4, 0]} />
          <DataOrbs />
          <ScanPlane />
          <ParticleField />
        </group>
      </Float>
    </Canvas>
  );
}
