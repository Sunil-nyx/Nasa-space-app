"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

export function LunarTerrain() {
  // Generate procedural lunar heightmap terrain with craters
  const { geometry, rockData, trackPoints } = useMemo(() => {
    const size = 160;
    const segments = 120;
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const v = new THREE.Vector3();

    // Procedural crater definitions (x, z, radius, depth)
    const craters = [
      { x: -18, z: 12, r: 14, depth: 2.2 },
      { x: 26, z: -20, r: 18, depth: 2.8 },
      { x: 38, z: 32, r: 24, depth: 3.5 },
      { x: -35, z: -30, r: 20, depth: 3.0 },
      { x: -6, z: -22, r: 8, depth: 1.4 },
      { x: 14, z: 22, r: 10, depth: 1.6 },
      { x: -45, z: 25, r: 28, depth: 4.2 },
      { x: 50, z: -45, r: 30, depth: 4.5 },
    ];

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);

      // Subtle undulating valley floor noise
      let height =
        Math.sin(v.x * 0.05) * Math.cos(v.z * 0.05) * 0.8 +
        Math.sin(v.x * 0.12 + 1.2) * Math.cos(v.z * 0.12 + 0.8) * 0.35 +
        Math.sin(v.x * 0.28) * Math.cos(v.z * 0.28) * 0.12;

      // Keep center landing pad smooth and flat for the Lunar Module
      const distFromCenter = Math.sqrt(v.x * v.x + v.z * v.z);
      if (distFromCenter < 12) {
        height *= Math.max(0, (distFromCenter - 4) / 8);
      }

      // Mountain walls at valley perimeter
      if (distFromCenter > 45) {
        const perimeterFactor = Math.min(1, (distFromCenter - 45) / 35);
        height +=
          perimeterFactor *
          (14 +
            Math.sin(v.x * 0.08) * 6 +
            Math.cos(v.z * 0.08) * 5 +
            Math.sin(v.x * 0.15) * 3);
      }

      // Carve out craters
      for (const c of craters) {
        const dx = v.x - c.x;
        const dz = v.z - c.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < c.r * 1.5) {
          const normDist = dist / c.r;
          if (normDist < 1.0) {
            // Inside crater: bowl depression
            const bowl = Math.cos(normDist * (Math.PI / 2));
            height -= bowl * c.depth;
          } else if (normDist < 1.4) {
            // Raised rim of crater
            const rim = Math.sin((normDist - 1.0) * (Math.PI / 0.4));
            height += rim * (c.depth * 0.35);
          }
        }
      }

      pos.setY(i, height);
    }

    geom.computeVertexNormals();

    // Procedural rock positions
    const rocks: { pos: [number, number, number]; scale: [number, number, number]; rot: [number, number, number] }[] = [];
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 90; i++) {
      const angle = seededRandom(i * 13) * Math.PI * 2;
      const radius = 6 + seededRandom(i * 17) * 60;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Skip landing zone
      if (Math.abs(x) < 4 && Math.abs(z) < 4) continue;

      const scaleVal = 0.15 + seededRandom(i * 23) * 0.65;
      rocks.push({
        pos: [x, 0, z],
        scale: [scaleVal * (0.8 + seededRandom(i * 31) * 0.4), scaleVal * (0.6 + seededRandom(i * 37) * 0.4), scaleVal * (0.8 + seededRandom(i * 41) * 0.4)],
        rot: [seededRandom(i * 43) * Math.PI, seededRandom(i * 47) * Math.PI, seededRandom(i * 53) * Math.PI],
      });
    }

    // Rover wheel tracks leading towards Shorty Crater
    const tracks: THREE.Vector3[] = [];
    for (let t = 0; t <= 40; t++) {
      const p = t / 40;
      const x = 2 - p * 38 + Math.sin(p * 6) * 3;
      const z = 3 + p * 32 + Math.cos(p * 5) * 2;
      tracks.push(new THREE.Vector3(x, 0.05, z));
    }

    return { geometry: geom, rockData: rocks, trackPoints: tracks };
  }, []);

  return (
    <group>
      {/* Main Lunar Regolith Terrain */}
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          color="#1e2025"
          roughness={0.94}
          metalness={0.06}
          flatShading={false}
        />
      </mesh>

      {/* Surrounding Mountain Rings (Taurus-Littrow Massifs) */}
      <mesh position={[0, -2, 0]}>
        <ringGeometry args={[78, 140, 64]} />
        <meshStandardMaterial
          color="#131418"
          roughness={0.96}
          metalness={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Scattered Lunar Boulders & Rocks */}
      {rockData.map((r, idx) => (
        <mesh
          key={idx}
          position={r.pos}
          scale={r.scale}
          rotation={r.rot}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#2a2d34"
            roughness={0.9}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* Lunar Rover Dual Tire Tracks */}
      <group position={[0, 0.02, 0]}>
        {trackPoints.map((pt, i) => {
          if (i === trackPoints.length - 1) return null;
          const next = trackPoints[i + 1];
          const midX = (pt.x + next.x) / 2;
          const midZ = (pt.z + next.z) / 2;
          const angle = Math.atan2(next.x - pt.x, next.z - pt.z);
          return (
            <group key={i} position={[midX, 0.03, midZ]} rotation={[0, angle, 0]}>
              {/* Left track */}
              <mesh position={[-0.7, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[0.22, 1.2]} />
                <meshStandardMaterial color="#101114" roughness={0.98} />
              </mesh>
              {/* Right track */}
              <mesh position={[0.7, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[0.22, 1.2]} />
                <meshStandardMaterial color="#101114" roughness={0.98} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
