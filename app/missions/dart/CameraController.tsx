"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

export interface SceneConfig {
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
}

export const SCENE_CONFIGS: Record<number, SceneConfig> = {
  1: {
    // Chapter 1: Two Worlds, One Target (Wide binary asteroid system establishing shot)
    cameraPos: [0, 8.5, 26],
    targetPos: [0, 0, 0],
  },
  2: {
    // Chapter 2: The Spacecraft Built to Crash (Detailed 3/4 technical inspection of DART)
    cameraPos: [1.9, 1.1, 3.2],
    targetPos: [0, 0, 0],
  },
  3: {
    // Chapter 3: The Final Approach (Chasing perspective behind DART bearing down on Dimorphos)
    cameraPos: [0.4, 0.9, 6.2],
    targetPos: [0, 0, -4.5],
  },
  4: {
    // Chapter 4: The Impact (Side-profile vantage point observing kinetic impact and debris plume)
    cameraPos: [3.8, 1.4, -1.8],
    targetPos: [0, 0.1, -4.5],
  },
  5: {
    // Chapter 5: Did It Work? (High-inclination planetary vantage showing before/after orbit shift)
    cameraPos: [0, 24, 12],
    targetPos: [0, 0, 0],
  },
};

export const HOTSPOT_CAMERA_CONFIGS: Record<
  string,
  { cameraPos: [number, number, number]; targetPos: [number, number, number] }
> = {
  draco: {
    cameraPos: [0.2, 0.35, 1.6],
    targetPos: [0, 0, 0.9],
  },
  rosa: {
    cameraPos: [2.6, 1.0, 1.4],
    targetPos: [1.8, 0, 0],
  },
  bus: {
    cameraPos: [0.75, 1.0, 1.9],
    targetPos: [0, 0, 0.75],
  },
  antenna: {
    cameraPos: [1.7, 0.7, 0.4],
    targetPos: [0.95, 0.25, -0.15],
  },
  "next-c": {
    cameraPos: [0.25, 0.4, -2.1],
    targetPos: [0, 0, -1.0],
  },
  liciacube: {
    cameraPos: [-1.1, 1.3, 0.1],
    targetPos: [-0.45, 0.85, -0.3],
  },
  didymos: {
    cameraPos: [7.5, 4.0, 10.5],
    targetPos: [0, 0, 0],
  },
  dimorphos: {
    cameraPos: [2.4, 1.0, -2.6],
    targetPos: [0, 0, -4.5],
  },
  "impact-site": {
    cameraPos: [1.6, 0.7, -3.0],
    targetPos: [0, 0.2, -4.5],
  },
};

interface CameraControllerProps {
  currentScene: number;
  activeHotspot: string | null;
  freeOrbit: boolean;
}

export function CameraController({
  currentScene,
  activeHotspot,
  freeOrbit,
}: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetCamPos = useRef(new THREE.Vector3(...SCENE_CONFIGS[1].cameraPos));
  const targetLookAt = useRef(new THREE.Vector3(...SCENE_CONFIGS[1].targetPos));

  useEffect(() => {
    if (activeHotspot && HOTSPOT_CAMERA_CONFIGS[activeHotspot]) {
      const cfg = HOTSPOT_CAMERA_CONFIGS[activeHotspot];
      targetCamPos.current.set(...cfg.cameraPos);
      targetLookAt.current.set(...cfg.targetPos);
    } else {
      const cfg = SCENE_CONFIGS[currentScene] || SCENE_CONFIGS[1];
      targetCamPos.current.set(...cfg.cameraPos);
      targetLookAt.current.set(...cfg.targetPos);
    }
  }, [currentScene, activeHotspot]);

  useFrame((_, delta) => {
    if (!freeOrbit) {
      // Smooth cinematic camera interpolation
      const lerpSpeed = Math.min(1, delta * 2.2);
      camera.position.lerp(targetCamPos.current, lerpSpeed);

      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, lerpSpeed);
        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={0.8}
      maxDistance={70}
      enabled={true}
    />
  );
}
