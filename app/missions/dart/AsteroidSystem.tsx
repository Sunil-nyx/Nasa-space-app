"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";

interface AsteroidSystemProps {
  currentScene: number;
  activeHotspot: string | null;
  onSelectHotspot: (id: string) => void;
  showOrbits?: boolean;
  orbitShiftComparison?: boolean;
  impactProgress?: number; // 0 to 1
  dimorphosPositionRef?: React.MutableRefObject<[number, number, number]>;
}

// Deterministic pseudo-random helper
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function AsteroidSystem({
  currentScene,
  activeHotspot,
  onSelectHotspot,
  showOrbits = true,
  orbitShiftComparison = false,
  impactProgress = 0,
  dimorphosPositionRef,
}: AsteroidSystemProps) {
  const didymosRef = useRef<THREE.Group>(null);
  const dimorphosRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  // Generate realistic oblate "spinning top" asteroid geometry for Didymos (~780m)
  const didymosGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(4.2, 4);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      // Flatten poles and create equatorial ridge (oblate spheroid like Didymos/Bennu/Ryugu)
      const isEquator = 1.0 - Math.min(1.0, Math.abs(v.y) / 3.0);
      v.x *= 1.0 + isEquator * 0.22;
      v.z *= 1.0 + isEquator * 0.22;
      v.y *= 0.82;

      // Surface cratering and boulder noise
      const noise =
        pseudoRandom(i * 3 + 1) * 0.28 +
        Math.sin(v.x * 2.5) * Math.cos(v.z * 2.5) * 0.15;
      v.multiplyScalar(1.0 + noise);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Generate realistic elongated "rubble pile" asteroid geometry for Dimorphos (~160m)
  const dimorphosGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.25, 4);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      // Triaxial ellipsoid elongation (Dimorphos is an oblong rubble pile: ~177m x 174m x 116m)
      v.x *= 1.25;
      v.z *= 0.95;
      v.y *= 0.78;

      // Rugged boulder-covered surface irregularities
      const noise =
        pseudoRandom(i * 4 + 2) * 0.22 +
        Math.sin(v.x * 4.0) * Math.sin(v.y * 4.0) * 0.12;
      v.multiplyScalar(1.0 + noise);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Surface boulders on Dimorphos
  const dimorphosBoulders = useMemo(() => {
    const list: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 40; i++) {
      const u = pseudoRandom(i * 3 + 1) * Math.PI * 2;
      const v = pseudoRandom(i * 3 + 2) * Math.PI - Math.PI / 2;
      const r = 1.2 + pseudoRandom(i * 3 + 3) * 0.1;
      const x = r * Math.cos(v) * Math.cos(u) * 1.2;
      const y = r * Math.sin(v) * 0.8;
      const z = r * Math.cos(v) * Math.sin(u) * 0.95;
      list.push({
        pos: [x, y, z],
        scale: 0.06 + pseudoRandom(i * 3 + 4) * 0.14,
      });
    }
    return list;
  }, []);

  // Orbital trail vertices for Dimorphos around Didymos
  const { originalOrbitPoints, deflectedOrbitPoints } = useMemo(() => {
    const count = 120;
    const orig: THREE.Vector3[] = [];
    const defl: THREE.Vector3[] = [];
    const R1 = 14.0; // Pre-impact 11h 55m orbit
    const R2 = 13.1; // Post-impact 11h 22m orbit (-33 min closer to Didymos)

    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;
      orig.push(new THREE.Vector3(Math.cos(theta) * R1, 0, Math.sin(theta) * R1));
      defl.push(new THREE.Vector3(Math.cos(theta) * R2, 0, Math.sin(theta) * R2));
    }
    return {
      originalOrbitPoints: orig,
      deflectedOrbitPoints: defl,
    };
  }, []);

  // Orbit animation loop
  useFrame((state, delta) => {
    // Didymos rotates every 2.26 hours
    if (didymosRef.current) {
      didymosRef.current.rotation.y += delta * 0.05;
    }

    // In Scene 1 and Scene 5, Dimorphos slowly orbits around Didymos
    // In Scene 2, 3, 4 (approach and impact), lock Dimorphos position for stable camera and targeting!
    if (dimorphosRef.current) {
      const speed = currentScene === 1 ? 0.04 : 0.0;
      const time = state.clock.elapsedTime * speed;

      // In Chapter 5 comparison, show deflected orbit radius if requested
      const radius = orbitShiftComparison ? 13.1 : 14.0;
      const orbitX = Math.cos(time + 0.4) * radius;
      const orbitZ = Math.sin(time + 0.4) * radius;

      // If in impact scene, position Dimorphos close to camera target
      if (currentScene === 4 || currentScene === 3) {
        dimorphosRef.current.position.set(0, 0, -4.5);
      } else {
        dimorphosRef.current.position.set(orbitX, 0, orbitZ);
      }

      dimorphosRef.current.rotation.y += delta * 0.08;

      if (dimorphosPositionRef) {
        dimorphosPositionRef.current = [
          dimorphosRef.current.position.x,
          dimorphosRef.current.position.y,
          dimorphosRef.current.position.z,
        ];
      }
    }
  });

  const isDimorphosActive = activeHotspot === "dimorphos";
  const isDidymosActive = activeHotspot === "didymos";
  const isImpactActive = activeHotspot === "impact-site";

  return (
    <group>
      {/* ── 1. PRIMARY ASTEROID: (65803) DIDYMOS (~780m) ──────── */}
      {/* Only shown when not in close-up approach/impact scene, or placed in distance */}
      <group
        ref={didymosRef}
        position={currentScene === 4 ? [35, 15, -45] : [0, 0, 0]}
        scale={currentScene === 4 ? [0.6, 0.6, 0.6] : [1, 1, 1]}
      >
        <mesh
          geometry={didymosGeometry}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            onSelectHotspot("didymos");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <meshStandardMaterial
            color="#475569"
            roughness={0.92}
            metalness={0.12}
            flatShading
          />
        </mesh>

        {/* Hotspot Marker for Didymos */}
        {currentScene === 1 && (
          <group position={[0, 4.8, 0]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot("didymos");
              }}
            >
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial
                color={isDidymosActive ? "#38bdf8" : "#94a3b8"}
                wireframe
              />
            </mesh>
          </group>
        )}
      </group>

      {/* ── 2. MOONLET: DIMORPHOS (~160m TARGET) ─────────────── */}
      <group ref={dimorphosRef} position={[14.0, 0, 0]}>
        <mesh
          geometry={dimorphosGeometry}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            onSelectHotspot("dimorphos");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <meshStandardMaterial
            color="#334155"
            roughness={0.95}
            metalness={0.08}
            flatShading
          />
        </mesh>

        {/* Scattered Surface Boulders on Dimorphos */}
        {dimorphosBoulders.map((b, i) => (
          <mesh key={i} position={b.pos} scale={[b.scale, b.scale, b.scale]} castShadow>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#1e293b" roughness={0.98} metalness={0.02} />
          </mesh>
        ))}

        {/* Fresh Excavated Impact Crater on Dimorphos (Shows after impact / in Ch 4 & 5) */}
        {(currentScene >= 4 || impactProgress > 0.68) && (
          <group position={[0, 0.2, 1.25]} rotation={[0.2, 0, 0]}>
            {/* Crater Depression Ring */}
            <mesh>
              <ringGeometry args={[0.08, 0.35, 24]} />
              <meshStandardMaterial color="#0f172a" roughness={0.99} side={THREE.DoubleSide} />
            </mesh>
            {/* Scorched Impact Glass Core */}
            <mesh position={[0, 0, -0.02]}>
              <circleGeometry args={[0.08, 24]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
          </group>
        )}

        {/* Hotspot Marker for Dimorphos / Impact Site */}
        {currentScene === 1 && (
          <group position={[0, 1.6, 0]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot("dimorphos");
              }}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshBasicMaterial
                color={isDimorphosActive ? "#38bdf8" : "#38bdf8"}
                wireframe
              />
            </mesh>
          </group>
        )}

        {/* Hotspot Marker for Impact Ground Zero (Ch 4 & 5) */}
        {currentScene >= 4 && (
          <group position={[0, 0.25, 1.5]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot("impact-site");
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial
                color={isImpactActive ? "#38bdf8" : "#f59e0b"}
                wireframe
              />
            </mesh>
          </group>
        )}
      </group>

      {/* ── 3. ORBITAL PATHS ──────────────────────────────────── */}
      {showOrbits && currentScene !== 4 && currentScene !== 3 && (
        <group ref={orbitGroupRef}>
          {/* Pre-Impact Original Orbit (11h 55m) */}
          <Line
            points={originalOrbitPoints}
            color="#38bdf8"
            lineWidth={1.2}
            transparent
            opacity={orbitShiftComparison ? 0.35 : 0.65}
          />

          {/* Post-Impact Deflected Orbit (11h 22m, -33 Min Inward Shift) */}
          {orbitShiftComparison && (
            <Line
              points={deflectedOrbitPoints}
              color="#22c55e"
              lineWidth={1.5}
              transparent
              opacity={0.85}
            />
          )}
        </group>
      )}
    </group>
  );
}
