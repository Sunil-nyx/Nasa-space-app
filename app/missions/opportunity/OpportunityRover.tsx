"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface OpportunityRoverProps {
  activeHotspot: string | null;
  onSelectHotspot: (id: string) => void;
}

// Interactive Hotspot Marker
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
          color={isActive ? "#38bdf8" : "#f59e0b"}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={isActive ? "#38bdf8" : "#fbbf24"} />
      </mesh>
    </group>
  );
}

export function OpportunityRover({
  activeHotspot,
  onSelectHotspot,
}: OpportunityRoverProps) {
  const { scene } = useGLTF("/models/opportunity_rover.glb");

  // Clone scene so multiple instances don't collide and ensure shadows are cast
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return (
    <group position={[0, 0, 0]}>
      {/* Authentic NASA 3D Model of MER Opportunity */}
      <primitive object={clonedScene} />

      {/* Interactive Hotspot 1: Pancam Mast Assembly */}
      <HotspotMarker
        id="pancam"
        position={[0.36, 1.52, 0.42]}
        isActive={activeHotspot === "pancam"}
        onSelect={onSelectHotspot}
      />

      {/* Interactive Hotspot 2: Solar Array Wings */}
      <HotspotMarker
        id="solar-panels"
        position={[0.0, 0.88, -0.1]}
        isActive={activeHotspot === "solar-panels"}
        onSelect={onSelectHotspot}
      />

      {/* Interactive Hotspot 3: Rocker-Bogie Suspension & Wheels */}
      <HotspotMarker
        id="wheels"
        position={[1.05, 0.3, 0.05]}
        isActive={activeHotspot === "wheels"}
        onSelect={onSelectHotspot}
      />

      {/* Interactive Hotspot 4: Instrument Deployment Device (Robotic Arm) */}
      <HotspotMarker
        id="arm"
        position={[0.0, 0.38, 0.68]}
        isActive={activeHotspot === "arm"}
        onSelect={onSelectHotspot}
      />

      {/* Interactive Hotspot 5: High-Gain Antenna */}
      <HotspotMarker
        id="antenna"
        position={[-0.42, 0.98, -0.28]}
        isActive={activeHotspot === "antenna"}
        onSelect={onSelectHotspot}
      />
    </group>
  );
}

// Preload the NASA MER model
useGLTF.preload("/models/opportunity_rover.glb");
