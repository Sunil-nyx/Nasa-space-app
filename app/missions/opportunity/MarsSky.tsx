"use client";

import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface MarsSkyProps {
  currentScene: number;
}

// Deterministic pseudo-random helper for pure component renders
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Generate static dust particle positions once
const DUST_PARTICLE_COUNT = 450;
const DUST_POSITIONS = new Float32Array(DUST_PARTICLE_COUNT * 3);
for (let i = 0; i < DUST_PARTICLE_COUNT; i++) {
  const radius = 6 + pseudoRandom(i * 3 + 1) * 24;
  const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2;
  const y = 0.2 + pseudoRandom(i * 3 + 3) * 8;
  DUST_POSITIONS[i * 3] = radius * Math.cos(theta);
  DUST_POSITIONS[i * 3 + 1] = y;
  DUST_POSITIONS[i * 3 + 2] = radius * Math.sin(theta);
}

export function MarsSky({ currentScene }: MarsSkyProps) {
  const isDustStorm = currentScene === 4;
  const pointsRef = React.useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      // Dust swirl speed increases during storm
      const speed = isDustStorm ? 0.35 : 0.08;
      pointsRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group>
      {/* Distant Atmospheric Dome */}
      <mesh position={[0, -5, 0]}>
        <sphereGeometry args={[140, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshBasicMaterial
          side={THREE.BackSide}
          color={isDustStorm ? "#160704" : "#943e26"}
        />
      </mesh>

      {/* Atmospheric Horizon Gradient Band */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[90, 138, 48]} />
        <meshBasicMaterial
          color={isDustStorm ? "#240d07" : "#c45b37"}
          transparent
          opacity={isDustStorm ? 0.95 : 0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Distant Martian Sun with bluish forward-scattering halo */}
      <group position={[40, 24, -50]}>
        {/* Core small Sun disk (smaller than on Earth: ~0.35 deg vs 0.5 deg) */}
        <mesh>
          <sphereGeometry args={[isDustStorm ? 1.0 : 1.6, 16, 16]} />
          <meshBasicMaterial color={isDustStorm ? "#d97706" : "#ffffff"} />
        </mesh>
        {/* Bluish atmospheric twilight glow unique to Mars */}
        <mesh>
          <sphereGeometry args={[isDustStorm ? 2.5 : 4.2, 16, 16]} />
          <meshBasicMaterial
            color={isDustStorm ? "#78350f" : "#93c5fd"}
            transparent
            opacity={isDustStorm ? 0.25 : 0.5}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[isDustStorm ? 5.0 : 9.5, 16, 16]} />
          <meshBasicMaterial
            color={isDustStorm ? "#451a03" : "#38bdf8"}
            transparent
            opacity={isDustStorm ? 0.1 : 0.2}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Atmospheric Suspended Dust Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[DUST_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isDustStorm ? 0.25 : 0.12}
          color={isDustStorm ? "#d97706" : "#f59e0b"}
          transparent
          opacity={isDustStorm ? 0.75 : 0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
