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
    // Chapter 1: The 90-Day Promise (Establishing view of the rover in Meridiani Planum)
    cameraPos: [3.4, 1.8, 3.6],
    targetPos: [0, 0.7, 0],
  },
  2: {
    // Chapter 2: The Clue in the Rocks (Focused inspection of rock outcrop & blueberries)
    cameraPos: [-2.1, 0.55, 2.3],
    targetPos: [-2.5, 0.18, 1.8],
  },
  3: {
    // Chapter 3: The Rover That Kept Going (Wide panoramic track view towards Endeavour Crater)
    cameraPos: [-5.8, 2.8, -4.8],
    targetPos: [0, 0.7, 0],
  },
  4: {
    // Chapter 4: When the Sun Disappeared (Dust storm drama, looking up at darkening sky)
    cameraPos: [2.6, 1.1, 2.6],
    targetPos: [0, 0.9, 0],
  },
  5: {
    // Chapter 5: The Last Signal (Poignant memorial stasis in Perseverance Valley)
    cameraPos: [4.4, 2.2, 4.4],
    targetPos: [0, 0.7, 0],
  },
};

export const HOTSPOT_CAMERA_CONFIGS: Record<
  string,
  { cameraPos: [number, number, number]; targetPos: [number, number, number] }
> = {
  pancam: {
    cameraPos: [1.2, 1.8, 1.2],
    targetPos: [0.3, 1.35, 0.35],
  },
  "solar-panels": {
    cameraPos: [0.0, 2.5, 0.4],
    targetPos: [0, 0.7, 0],
  },
  wheels: {
    cameraPos: [1.8, 0.4, 0.8],
    targetPos: [0.95, 0.25, 0.1],
  },
  arm: {
    cameraPos: [0.2, 0.55, 1.5],
    targetPos: [0.0, 0.35, 0.65],
  },
  antenna: {
    cameraPos: [-1.2, 1.3, -0.4],
    targetPos: [-0.4, 0.85, -0.25],
  },
  blueberries: {
    cameraPos: [-2.1, 0.45, 2.2],
    targetPos: [-2.5, 0.15, 1.8],
  },
  "survey-meridiani": {
    cameraPos: [6.5, 2.5, 6.0],
    targetPos: [-5.0, 0.5, -5.0],
  },
  "rover-trail": {
    cameraPos: [-4.5, 2.0, -3.5],
    targetPos: [-8.0, 0.4, -8.0],
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
      minDistance={1.2}
      maxDistance={60}
      maxPolarAngle={Math.PI / 2 - 0.03} // Prevent camera from clipping beneath Martian terrain
      enabled={true}
    />
  );
}
