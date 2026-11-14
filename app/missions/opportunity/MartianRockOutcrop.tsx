"use client";

import React from "react";

interface MartianRockOutcropProps {
  activeHotspot: string | null;
  onSelectHotspot: (id: string) => void;
}

// Deterministic pseudo-random helper
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Static deterministic locations for the hematite spherules ("Martian blueberries")
const BLUEBERRY_POSITIONS: [number, number, number][] = [];
for (let i = 0; i < 35; i++) {
  const x = -0.55 + pseudoRandom(i * 3 + 1) * 1.1;
  const y = 0.08 + pseudoRandom(i * 3 + 2) * 0.22;
  const z = -0.35 + pseudoRandom(i * 3 + 3) * 0.7;
  BLUEBERRY_POSITIONS.push([x, y, z]);
}

export function MartianRockOutcrop({
  activeHotspot,
  onSelectHotspot,
}: MartianRockOutcropProps) {
  const isSelected = activeHotspot === "blueberries";

  return (
    <group position={[-2.5, 0, 1.8]}>
      {/* Layered Sedimentary Rock Outcrop (representing Eagle Crater sulfate rock) */}
      <mesh
        position={[0, 0.16, 0]}
        rotation={[0.08, 0.45, -0.05]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot("blueberries");
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[1.5, 0.32, 1.0]} />
        <meshStandardMaterial
          color="#9c4e2b"
          roughness={0.88}
          metalness={0.12}
        />
      </mesh>

      {/* Second fracture slab */}
      <mesh
        position={[0.2, 0.08, 0.3]}
        rotation={[-0.05, 0.2, 0.06]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.1, 0.16, 0.7]} />
        <meshStandardMaterial
          color="#853d1e"
          roughness={0.92}
          metalness={0.08}
        />
      </mesh>

      {/* Embedded Hematite Spherules ("Martian Blueberries") */}
      {BLUEBERRY_POSITIONS.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshStandardMaterial
            color="#2d3748"
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>
      ))}

      {/* Interactive 3D Beacon Hotspot */}
      <group position={[0, 0.45, 0]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelectHotspot("blueberries");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color={isSelected ? "#38bdf8" : "#fbbf24"}
            wireframe
          />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.3]} />
          <meshBasicMaterial color={isSelected ? "#38bdf8" : "#fbbf24"} />
        </mesh>
      </group>
    </group>
  );
}
