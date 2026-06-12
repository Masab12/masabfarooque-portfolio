'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 38;
const CONNECT_THRESHOLD = 1.72;

function Network() {
  const groupRef = useRef<THREE.Group>(null);

  // Fibonacci sphere — evenly-spaced nodes across a sphere surface
  const nodes = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      pts.push([Math.cos(theta) * r * 2.6, y * 2.6, Math.sin(theta) * r * 2.6]);
    }
    return pts;
  }, []);

  // Build a single LineSegments geometry for all edges
  const edgeGeo = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(
          nodes[i][0] - nodes[j][0],
          nodes[i][1] - nodes[j][1],
          nodes[i][2] - nodes[j][2],
        );
        if (d < CONNECT_THRESHOLD) {
          pts.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [nodes]);

  // Two interleaved node groups — cyan + violet
  const [cyanNodes, violetNodes] = useMemo(() => {
    const cyan: [number, number, number][] = [];
    const violet: [number, number, number][] = [];
    nodes.forEach((p, i) => (i % 3 === 0 ? violet : cyan).push(p));
    return [cyan, violet];
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.065) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.12} />
      </lineSegments>

      {/* Cyan nodes */}
      {cyanNodes.map((pos, i) => (
        <mesh key={`c${i}`} position={pos}>
          <sphereGeometry args={[0.048, 8, 8]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
        </mesh>
      ))}

      {/* Violet nodes */}
      {violetNodes.map((pos, i) => (
        <mesh key={`v${i}`} position={pos}>
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralMesh3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 3, 4]} color="#00f0ff" intensity={1.4} distance={10} />
      <pointLight position={[-4, -2, -3]} color="#8b5cf6" intensity={0.9} distance={8} />
      <Network />
    </Canvas>
  );
}
