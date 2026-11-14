"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

// Deterministic pseudo-random helper for pure component renders
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function MarsTerrain() {
  // Generate procedural Martian surface with sand dunes and ripples
  const { geometry, rockPositions, trackPoints } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(160, 160, 80, 80);
    const pos = geo.attributes.position;

    // Modulate terrain height: undulating dunes and soft craters
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Distant crater rim rise at the edges
      const distFromCenter = Math.sqrt(x * x + y * y);
      let height = 0;

      // Gentle rolling dunes
      height += Math.sin(x * 0.08) * Math.cos(y * 0.08) * 0.8;
      height += Math.sin(x * 0.2 + y * 0.15) * 0.3;

      // Endeavour Crater rim in distance
      if (distFromCenter > 45) {
        const rimFactor = (distFromCenter - 45) / 35;
        height += Math.pow(rimFactor, 1.8) * 8.5;
      }

      // Small crater depression nearby (Eagle Crater replica)
      const craterDx = x - 8;
      const craterDy = y - 12;
      const craterDist = Math.sqrt(craterDx * craterDx + craterDy * craterDy);
      if (craterDist < 14) {
        const craterDepth = Math.cos((craterDist / 14) * Math.PI) * 1.4;
        height -= craterDepth;
      }

      // Flatten immediate area under the rover
      if (distFromCenter < 5.0) {
        height *= distFromCenter / 5.0;
      }

      pos.setZ(i, height);
    }

    geo.computeVertexNormals();

    // Generate deterministic basalt rock locations on Mars
    const rocks: { position: [number, number, number]; scale: [number, number, number]; rotation: [number, number, number] }[] = [];
    for (let i = 0; i < 70; i++) {
      const angle = pseudoRandom(i * 6 + 1) * Math.PI * 2;
      const radius = 3.5 + pseudoRandom(i * 6 + 2) * 55;
      const rx = Math.cos(angle) * radius;
      const rz = Math.sin(angle) * radius;
      const s = 0.15 + pseudoRandom(i * 6 + 3) * 0.65;

      rocks.push({
        position: [rx, s * 0.35, rz],
        scale: [s, s * 0.6, s * (0.8 + pseudoRandom(i * 6 + 4) * 0.4)],
        rotation: [pseudoRandom(i * 6 + 5) * 0.5, pseudoRandom(i * 6 + 6) * Math.PI, pseudoRandom(i * 6 + 7) * 0.3],
      });
    }

    // Opportunity rover wheel tracks (dual winding paths)
    const tracks: [number, number, number][] = [];
    const steps = 60;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      // Curves away towards the south-west
      const tx = -t * 28 + Math.sin(t * 4) * 2.5;
      const tz = -t * 32 + Math.cos(t * 3) * 2.0;
      tracks.push([tx, 0.015, tz]);
    }

    return { geometry: geo, rockPositions: rocks, trackPoints: tracks };
  }, []);

  return (
    <group>
      {/* Main Martian Surface */}
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#9e3b22"
          roughness={0.92}
          metalness={0.08}
          flatShading={false}
        />
      </mesh>

      {/* Scattered Martian Basalt Rocks */}
      {rockPositions.map((r, i) => (
        <mesh
          key={i}
          position={r.position}
          scale={r.scale}
          rotation={r.rotation}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#421a12"
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Opportunity Dual Wheel Tracks */}
      <group>
        {trackPoints.map((pt, i) => {
          if (i === 0) return null;
          const prev = trackPoints[i - 1];
          const midX = (pt[0] + prev[0]) / 2;
          const midZ = (pt[2] + prev[2]) / 2;
          const angle = Math.atan2(pt[2] - prev[2], pt[0] - prev[0]);

          return (
            <group key={i} position={[midX, 0.02, midZ]} rotation={[0, -angle, 0]}>
              {/* Left track */}
              <mesh position={[0, 0, -0.75]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.9, 0.22]} />
                <meshBasicMaterial color="#541b0f" transparent opacity={0.65} />
              </mesh>
              {/* Right track */}
              <mesh position={[0, 0, 0.75]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.9, 0.22]} />
                <meshBasicMaterial color="#541b0f" transparent opacity={0.65} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
