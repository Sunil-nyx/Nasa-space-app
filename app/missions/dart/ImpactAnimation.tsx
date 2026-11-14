"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ImpactAnimationProps {
  progress: number; // 0 to 1
  isPlaying: boolean;
  onProgressUpdate?: (p: number) => void;
  targetPosition?: [number, number, number]; // Dimorphos impact position (default: [0, 0, -4.5])
}

// Deterministic random helper
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ImpactAnimation({
  progress,
  isPlaying,
  onProgressUpdate,
  targetPosition = [0, 0, -4.5],
}: ImpactAnimationProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Impact point is on the front surface of Dimorphos
  const impactPoint = useMemo(
    () =>
      new THREE.Vector3(
        targetPosition[0],
        targetPosition[1] + 0.1,
        targetPosition[2] + 1.25
      ),
    [targetPosition]
  );

  // 1. Generate Ejecta Plume Particles (Vacuum kinetic spray - no fire, pure rock dust & regolith)
  const particleCount = 450;
  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color("#e2e8f0");
    const dustColor = new THREE.Color("#94a3b8");
    const warmSparkColor = new THREE.Color("#38bdf8");

    for (let i = 0; i < particleCount; i++) {
      // Cone spray pointing back towards camera / oblique angle
      const theta = pseudoRandom(i * 5 + 1) * Math.PI * 2;
      const phi = pseudoRandom(i * 5 + 2) * 0.9 + 0.2; // Cone spread ~45-60 deg
      const speed = 2.0 + pseudoRandom(i * 5 + 3) * 6.5; // High velocity ejecta

      // Normalized trajectory coordinates at peak ejection
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * speed * 2.2;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed * 2.2;
      positions[i * 3 + 2] = Math.cos(phi) * speed * 2.2; // Ejecting back out from crater (+z)

      // Particle color mix
      const col =
        pseudoRandom(i * 5 + 4) > 0.8
          ? warmSparkColor
          : pseudoRandom(i * 5 + 4) > 0.4
          ? baseColor
          : dustColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // 2. Generate Tumbling Ejecta Boulders (macroscopic fragments thrown into space)
  const boulders = useMemo(() => {
    const list: {
      seed: number;
      vel: [number, number, number];
      rotSpeed: [number, number, number];
      scale: number;
    }[] = [];
    for (let i = 0; i < 24; i++) {
      const angle = pseudoRandom(i * 7 + 1) * Math.PI * 2;
      const elevation = pseudoRandom(i * 7 + 2) * 0.8 + 0.2;
      const speed = 1.2 + pseudoRandom(i * 7 + 3) * 3.5;
      list.push({
        seed: i,
        vel: [
          Math.cos(angle) * Math.sin(elevation) * speed,
          Math.sin(angle) * Math.sin(elevation) * speed,
          Math.cos(elevation) * speed,
        ],
        rotSpeed: [
          (pseudoRandom(i * 7 + 4) - 0.5) * 8,
          (pseudoRandom(i * 7 + 5) - 0.5) * 8,
          (pseudoRandom(i * 7 + 6) - 0.5) * 8,
        ],
        scale: 0.04 + pseudoRandom(i * 7 + 7) * 0.08,
      });
    }
    return list;
  }, []);

  // Internal playback progress ref
  const currentProgressRef = useRef(progress);
  useEffect(() => {
    currentProgressRef.current = progress;
  }, [progress]);

  useFrame((_, delta) => {
    if (isPlaying && onProgressUpdate) {
      let next = currentProgressRef.current + delta * 0.16; // ~6.25 second full loop
      if (next > 1.0) {
        next = 0.0;
      }
      currentProgressRef.current = next;
      onProgressUpdate(next);
    }
  });

  const t = progress;

  // Spacecraft position during terminal approach (0.0 -> 0.45)
  const isPreImpact = t < 0.45;
  const approachFactor = Math.min(1, t / 0.45);
  const craftZ = THREE.MathUtils.lerp(9.0, impactPoint.z, approachFactor);
  const craftY = THREE.MathUtils.lerp(0.4, impactPoint.y, approachFactor);
  const craftX = THREE.MathUtils.lerp(0.1, impactPoint.x, approachFactor);

  // Kinetic flash calculations
  const isFlashActive = t >= 0.44 && t <= 0.62;
  const flashProgress = isFlashActive ? (t - 0.44) / 0.18 : 0;
  const flashIntensity = isFlashActive ? Math.sin(flashProgress * Math.PI) : 0;
  const flashScale = isFlashActive ? 0.2 + flashIntensity * 2.8 : 0.001;
  const shockwaveScale = isFlashActive ? 0.5 + flashProgress * 3.2 : 0.001;
  const shockwaveOpacity = isFlashActive ? (1 - flashProgress) * 0.7 : 0;

  // Ejecta plume calculations
  const isEjectaActive = t >= 0.45;
  const ejectaT = isEjectaActive ? (t - 0.45) / 0.55 : 0;
  const ejectaScale = Math.max(0.001, ejectaT);
  const ejectaOpacity = Math.max(0, 1 - ejectaT * 0.85);

  return (
    <group ref={groupRef}>
      {/* ── 1. APPROACHING SPACECRAFT (Disintegrates on impact at t=0.45) ── */}
      {isPreImpact && (
        <group position={[craftX, craftY, craftZ]} rotation={[0, 0, 0]} scale={0.45}>
          {/* Main Bus */}
          <mesh castShadow>
            <boxGeometry args={[1.2, 1.3, 1.3]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* ROSA Solar Arrays */}
          <mesh position={[1.8, 0, 0]}>
            <boxGeometry args={[2.2, 0.04, 0.9]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[-1.8, 0, 0]}>
            <boxGeometry args={[2.2, 0.04, 0.9]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
          </mesh>

          {/* DRACO Camera lens locked onto Dimorphos */}
          <mesh position={[0, 0, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.28, 0.4, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Hydrazine Thruster Puffs / Terminal Course Correction plume */}
          <pointLight color="#38bdf8" intensity={1.5} distance={3} />
        </group>
      )}

      {/* ── 2. IMPACT GROUND ZERO FX (Positioned on Dimorphos surface) ── */}
      <group position={[impactPoint.x, impactPoint.y, impactPoint.z]}>
        {/* Kinetic Vacuum Flash (Intense white-cyan photon explosion) */}
        {isFlashActive && (
          <mesh scale={flashScale}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={flashIntensity * 0.95}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Ring Shockwave expanding across asteroid surface */}
        {isFlashActive && (
          <mesh scale={shockwaveScale} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.55, 32]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={shockwaveOpacity}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Ejecta Dust & Regolith Plume */}
        {isEjectaActive && (
          <group scale={ejectaScale}>
            <points geometry={particleGeo}>
              <pointsMaterial
                size={0.065}
                vertexColors
                transparent
                opacity={ejectaOpacity}
                sizeAttenuation
                depthWrite={false}
              />
            </points>
          </group>
        )}

        {/* Tumbling Macroscopic Boulders (Post-impact t >= 0.45) */}
        {isEjectaActive && (
          <group>
            {boulders.map((b) => {
              const bx = b.vel[0] * ejectaT * 2.0;
              const by = b.vel[1] * ejectaT * 2.0;
              const bz = b.vel[2] * ejectaT * 2.0;
              const rx = b.rotSpeed[0] * ejectaT * 4.0;
              const ry = b.rotSpeed[1] * ejectaT * 4.0;
              const rz = b.rotSpeed[2] * ejectaT * 4.0;

              return (
                <mesh
                  key={b.seed}
                  position={[bx, by, bz]}
                  rotation={[rx, ry, rz]}
                  scale={b.scale}
                >
                  <dodecahedronGeometry args={[1, 0]} />
                  <meshStandardMaterial color="#475569" roughness={0.9} metalness={0.1} />
                </mesh>
              );
            })}
          </group>
        )}
      </group>
    </group>
  );
}
