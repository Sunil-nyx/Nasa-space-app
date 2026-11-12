"use client";

import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LunarModuleProps {
  showAscentStage: boolean;
  ascentLiftProgress?: number; // 0 = docked, 1 = departed into space
  onSelectHotspot?: (id: string) => void;
  activeHotspot?: string | null;
}

export function LunarModule({
  showAscentStage,
  ascentLiftProgress = 0,
  onSelectHotspot,
  activeHotspot,
}: LunarModuleProps) {
  const gltf = useGLTF("/models/apollo_lunar_module.glb");
  const ascentGroupRef = useRef<THREE.Group>(null);

  // Separate the NASA model into Descent Stage and Ascent Stage
  const { descentMeshes, ascentMeshes } = useMemo(() => {
    const dList: THREE.Object3D[] = [];
    const aList: THREE.Object3D[] = [];

    // Clone scene to avoid modifying cache
    const cloned = gltf.scene.clone(true);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Enhance materials for realism
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = Math.max(0.2, mat.roughness ?? 0.5);
          mat.metalness = Math.min(0.9, (mat.metalness ?? 0.3) + 0.3);
          mesh.material = mat;
        }

        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox;
        if (bbox) {
          // In model coordinates, minY >= 1.9 corresponds to the Ascent Stage
          if (bbox.min.y >= 1.88) {
            aList.push(mesh.clone());
          } else {
            dList.push(mesh.clone());
          }
        }
      }
    });

    return { descentMeshes: dList, ascentMeshes: aList };
  }, [gltf.scene]);

  // Handle smooth liftoff animation for the Ascent Stage in Scene 5
  useFrame(() => {
    if (ascentGroupRef.current) {
      if (!showAscentStage) {
        // Departed
        ascentGroupRef.current.visible = false;
      } else {
        ascentGroupRef.current.visible = true;
        if (ascentLiftProgress > 0) {
          // Interpolate ascending trajectory: lifts upward and tilts slightly toward rendezvous orbit
          const yOffset = ascentLiftProgress * 28;
          const zOffset = ascentLiftProgress * -15;
          ascentGroupRef.current.position.set(0, yOffset, zOffset);
          ascentGroupRef.current.rotation.x = ascentLiftProgress * 0.18;
          ascentGroupRef.current.rotation.z = ascentLiftProgress * -0.12;
        } else {
          ascentGroupRef.current.position.set(0, 0, 0);
          ascentGroupRef.current.rotation.set(0, 0, 0);
        }
      }
    }
  });

  return (
    <group position={[0, -0.08, 0]} rotation={[0, -0.45, 0]}>
      {/* DESCENT STAGE (Permanently on the Moon) */}
      <group>
        {descentMeshes.map((m, idx) => (
          <primitive key={`descent-${idx}`} object={m} />
        ))}

        {/* Challenger Commemorative Plaque (Affixed to ladder between front legs) */}
        <group position={[1.05, 0.95, 1.05]} rotation={[0, Math.PI / 4, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.32, 0.22, 0.02]} />
            <meshStandardMaterial
              color="#e2e8f0"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>
      </group>

      {/* ASCENT STAGE (Crew Cabin - Departed Dec 14, 1972) */}
      <group ref={ascentGroupRef}>
        {ascentMeshes.map((m, idx) => (
          <primitive key={`ascent-${idx}`} object={m} />
        ))}

        {/* Thruster ignition glow during liftoff */}
        {ascentLiftProgress > 0.02 && ascentLiftProgress < 0.8 && (
          <pointLight
            position={[0, 1.9, 0]}
            color="#fbbf24"
            intensity={8 * (1 - ascentLiftProgress)}
            distance={15}
          />
        )}
      </group>

      {/* 3D INTERACTIVE HOTSPOTS */}
      {/* Hotspot 1: Descent Stage Mylar Wrap */}
      <HotspotBeacon
        position={[0.2, 1.3, 1.8]}
        label="Descent Stage & Foil"
        id="descent-stage"
        active={activeHotspot === "descent-stage"}
        onClick={() => onSelectHotspot?.("descent-stage")}
      />

      {/* Hotspot 2: Challenger Plaque */}
      <HotspotBeacon
        position={[1.2, 1.0, 1.2]}
        label="Challenger Plaque"
        id="plaque"
        active={activeHotspot === "plaque"}
        onClick={() => onSelectHotspot?.("plaque")}
      />

      {/* Hotspot 3: Scientific Equipment (ALSEP) */}
      <HotspotBeacon
        position={[-1.9, 1.2, -0.3]}
        label="ALSEP Science Bay"
        id="alsep"
        active={activeHotspot === "alsep"}
        onClick={() => onSelectHotspot?.("alsep")}
      />

      {/* Hotspot 4: Lunar Roving Vehicle Bay */}
      <HotspotBeacon
        position={[0.2, 1.3, -1.9]}
        label="LRV Deployment Station"
        id="lrv-bay"
        active={activeHotspot === "lrv-bay"}
        onClick={() => onSelectHotspot?.("lrv-bay")}
      />

      {/* Hotspot 5: Landing Legs & Footpads */}
      <HotspotBeacon
        position={[1.8, 0.4, 1.8]}
        label="Landing Gear & Footpads"
        id="legs"
        active={activeHotspot === "legs"}
        onClick={() => onSelectHotspot?.("legs")}
      />

      {/* Hotspot 6: Descent Propulsion Engine Bell */}
      <HotspotBeacon
        position={[0.0, 0.4, 0.0]}
        label="Descent Rocket Engine"
        id="engine"
        active={activeHotspot === "engine"}
        onClick={() => onSelectHotspot?.("engine")}
      />

      {/* Hotspot 7: Ascent Stage Cabin / Separation Plane */}
      {showAscentStage && ascentLiftProgress < 0.2 && (
        <HotspotBeacon
          position={[0, 3.4, 0.9]}
          label="Ascent Stage (Departed)"
          id="ascent-stage"
          active={activeHotspot === "ascent-stage"}
          onClick={() => onSelectHotspot?.("ascent-stage")}
        />
      )}
    </group>
  );
}

// Interactive 3D Beacon Marker Component
function HotspotBeacon({
  position,
  active,
  onClick,
}: {
  position: [number, number, number];
  label?: string;
  id?: string;
  active: boolean;
  onClick: () => void;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3.5) * 0.25;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      {/* Outer pulsing ring */}
      <mesh
        ref={pulseRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <ringGeometry args={[0.16, 0.22, 24]} />
        <meshBasicMaterial
          color={active ? "#38bdf8" : "#67e8f9"}
          transparent
          opacity={active ? 0.9 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center glowing dot */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <circleGeometry args={[0.09, 16]} />
        <meshBasicMaterial
          color={active ? "#ffffff" : "#38bdf8"}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hover/active indicator light */}
      <pointLight
        color="#38bdf8"
        intensity={active ? 2.5 : 0.8}
        distance={2.5}
      />
    </group>
  );
}

// Preload the NASA 3D model
useGLTF.preload("/models/apollo_lunar_module.glb");
