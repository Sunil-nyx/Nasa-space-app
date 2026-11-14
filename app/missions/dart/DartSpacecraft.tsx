"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface DartSpacecraftProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  visible?: boolean;
  activeHotspot: string | null;
  onSelectHotspot: (id: string) => void;
  showThrusterGlow?: boolean;
}

// Interactive Hotspot Marker on Spacecraft
function HotspotMarker({
  id,
  position,
  isActive,
  onSelect,
}: {
  id: string;
  position: [number, number, number];
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? "#38bdf8" : "#38bdf8"}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color={isActive ? "#ffffff" : "#38bdf8"} />
      </mesh>
    </group>
  );
}

export function DartSpacecraft({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  visible = true,
  activeHotspot,
  onSelectHotspot,
  showThrusterGlow = true,
}: DartSpacecraftProps) {
  const craftRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (thrusterRef.current && showThrusterGlow) {
      // Subtle ion engine flicker
      thrusterRef.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 12) * 0.3;
    }
  });

  if (!visible) return null;

  return (
    <group ref={craftRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* ── MAIN SPACECRAFT BUS ───────────────────────────────── */}
      {/* Central Honeycomb Bus Body with MLI Thermal Blankets */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.3, 1.3]} />
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Thermal Foil Accent Panel (Sun-facing side) */}
      <mesh position={[0.605, 0, 0]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.88}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Titanium Structural Trim & Frame Edges */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.22, 1.32, 1.32]} />
        <meshStandardMaterial
          color="#334155"
          wireframe
        />
      </mesh>

      {/* ── ROLL-OUT SOLAR ARRAYS (ROSA) ────────────────────────── */}
      {/* 8.5-meter deployed flexible solar array blankets */}
      {/* Port Solar Array Wing (+Y direction) */}
      <group position={[0, 0.65, 0]}>
        {/* Support Strut & Deployment Canister */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Composite Carbon-Fiber Boom Arm */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[0.08, 2.0, 0.08]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Solar Blanket Wing (Front & back deep photovoltaic blue with silicon sheen) */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <planeGeometry args={[1.2, 2.4]} />
          <meshStandardMaterial
            color="#081b33"
            metalness={0.88}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Kapton Solar Cell Edge Trim */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[1.22, 2.42, 0.02]} />
          <meshStandardMaterial
            color="#d97706"
            metalness={0.7}
            roughness={0.3}
            wireframe
          />
        </mesh>
        {/* Solar cell grid lines overlay */}
        <mesh position={[0, 1.8, 0.015]}>
          <planeGeometry args={[1.18, 2.38]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Starboard Solar Array Wing (-Y direction) */}
      <group position={[0, -0.65, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
          <boxGeometry args={[0.08, 2.0, 0.08]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.8, 0]} castShadow receiveShadow>
          <planeGeometry args={[1.2, 2.4]} />
          <meshStandardMaterial
            color="#081b33"
            metalness={0.88}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <boxGeometry args={[1.22, 2.42, 0.02]} />
          <meshStandardMaterial
            color="#d97706"
            metalness={0.7}
            roughness={0.3}
            wireframe
          />
        </mesh>
        <mesh position={[0, -1.8, 0.015]}>
          <planeGeometry args={[1.18, 2.38]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ── DRACO TELESCOPE & SMART NAV CAMERA ─────────────────── */}
      {/* Front-Facing Optical Navigation Telescope (+Z direction) */}
      <group position={[0, 0.15, 0.65]}>
        {/* Cylindrical Carbon Composite Barrel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.24, 0.55, 24]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Optical Aperture Lens Baffle */}
        <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.22, 24]} />
          <meshBasicMaterial color="#09090b" side={THREE.DoubleSide} />
        </mesh>
        {/* Primary Optical Lens */}
        <mesh position={[0, 0, 0.26]}>
          <circleGeometry args={[0.12, 24]} />
          <meshStandardMaterial
            color="#0284c7"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
        {/* Secondary Mirror Spider Support */}
        <mesh position={[0, 0, 0.27]}>
          <ringGeometry args={[0.03, 0.045, 12]} />
          <meshBasicMaterial color="#71717a" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ── HIGH-GAIN RADIAL-LINE SLOT ARRAY ANTENNA ───────────── */}
      {/* Circular RLSA Dish Antenna mounted on Port Side (+X) */}
      <group position={[0.62, 0.25, -0.15]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.05, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Feed Horn Assembly */}
        <mesh position={[0, 0.08, 0]}>
          <coneGeometry args={[0.06, 0.12, 16]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── PROPULSION: NEXT-C ION ENGINE & RCS THRUSTERS ───────── */}
      {/* Aft-Mounted Gridded Ion Engine (-Z direction) */}
      <group position={[0, 0, -0.68]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.22, 0.15, 24]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Ion Accelerator Grid Core */}
        <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.20, 24]} />
          <meshBasicMaterial color={showThrusterGlow ? "#06b6d4" : "#1e293b"} />
        </mesh>
        {/* Blue/Cyan Xenon Ion Plasma Glow */}
        {showThrusterGlow && (
          <pointLight
            ref={thrusterRef}
            position={[0, 0, -0.35]}
            color="#22d3ee"
            intensity={1.5}
            distance={2.5}
          />
        )}
      </group>

      {/* Hydrazine RCS Attitude Control Thruster Quads (4 corners) */}
      {[
        [0.55, 0.55, 0.55],
        [-0.55, 0.55, 0.55],
        [0.55, -0.55, 0.55],
        [-0.55, -0.55, 0.55],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.025, 0.06, 8]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
        </group>
      ))}

      {/* ── LICIACUBE DISPENSER CANISTER ───────────────────────── */}
      {/* Italian Space Agency 6U CubeSat Deployer (+Y, aft) */}
      <group position={[-0.45, 0.55, -0.3]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.38, 0.24]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.26, 0.02, 0.26]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>
      </group>

      {/* ── INTERACTIVE 3D HOTSPOTS ────────────────────────────── */}
      {/* 1. DRACO Camera */}
      <HotspotMarker
        id="draco"
        position={[0, 0.15, 1.05]}
        isActive={activeHotspot === "draco"}
        onSelect={onSelectHotspot}
      />

      {/* 2. Roll-Out Solar Arrays (ROSA) */}
      <HotspotMarker
        id="rosa"
        position={[0, 2.2, 0.1]}
        isActive={activeHotspot === "rosa"}
        onSelect={onSelectHotspot}
      />

      {/* 3. Main Bus & Autonomous Avionics */}
      <HotspotMarker
        id="bus"
        position={[0, 0, 0.75]}
        isActive={activeHotspot === "bus"}
        onSelect={onSelectHotspot}
      />

      {/* 4. High-Gain RLSA Antenna */}
      <HotspotMarker
        id="antenna"
        position={[0.95, 0.25, -0.15]}
        isActive={activeHotspot === "antenna"}
        onSelect={onSelectHotspot}
      />

      {/* 5. NEXT-C Ion Propulsion */}
      <HotspotMarker
        id="next-c"
        position={[0, 0, -1.0]}
        isActive={activeHotspot === "next-c"}
        onSelect={onSelectHotspot}
      />

      {/* 6. LICIACube Companion */}
      <HotspotMarker
        id="liciacube"
        position={[-0.45, 0.85, -0.3]}
        isActive={activeHotspot === "liciacube"}
        onSelect={onSelectHotspot}
      />
    </group>
  );
}
