"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

export interface SceneConfig {
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  showAscentStage: boolean;
  ascentLiftProgress: number;
}

export const SCENE_CONFIGS: Record<number, SceneConfig> = {
  1: {
    // Scene 1: Approaching the Moon (High lunar orbit, panoramic horizon)
    cameraPos: [0, 36, 68],
    targetPos: [0, 4, 0],
    showAscentStage: true,
    ascentLiftProgress: 0,
  },
  2: {
    // Scene 2: Descending towards lunar landing site (Trajectory view)
    cameraPos: [24, 14, 32],
    targetPos: [0, 2, 0],
    showAscentStage: true,
    ascentLiftProgress: 0,
  },
  3: {
    // Scene 3: Exploring the Lunar Module & descent stage (Close inspection)
    cameraPos: [5.5, 2.8, 6.2],
    targetPos: [0, 1.8, 0],
    showAscentStage: true,
    ascentLiftProgress: 0,
  },
  4: {
    // Scene 4: Discovering Lunar Roving Vehicle (Tracks & valley panorama)
    cameraPos: [-9, 1.6, 7.5],
    targetPos: [-2, 1.0, 0],
    showAscentStage: true,
    ascentLiftProgress: 0,
  },
  5: {
    // Scene 5: Understanding what Apollo 17 left behind (Descent stage stasis & departed ascent)
    cameraPos: [7.5, 3.2, 8.5],
    targetPos: [0, 1.4, 0],
    showAscentStage: true,
    ascentLiftProgress: 0.95, // Ascent stage departed into space
  },
};

export const HOTSPOT_CAMERA_CONFIGS: Record<string, { cameraPos: [number, number, number]; targetPos: [number, number, number] }> = {
  "descent-stage": {
    cameraPos: [2.2, 1.6, 3.8],
    targetPos: [0.2, 1.3, 1.8],
  },
  "plaque": {
    cameraPos: [2.4, 1.2, 2.2],
    targetPos: [1.2, 1.0, 1.2],
  },
  "alsep": {
    cameraPos: [-3.8, 1.6, 0.4],
    targetPos: [-1.9, 1.2, -0.3],
  },
  "lrv-bay": {
    cameraPos: [1.2, 1.6, -3.6],
    targetPos: [0.2, 1.3, -1.9],
  },
  "ascent-stage": {
    cameraPos: [2.2, 4.2, 3.2],
    targetPos: [0, 3.4, 0.9],
  },
  "legs": {
    cameraPos: [3.2, 0.9, 3.2],
    targetPos: [1.5, 0.5, 1.5],
  },
  "engine": {
    cameraPos: [0.0, 0.6, 3.2],
    targetPos: [0.0, 0.7, 0.0],
  },
  // Interactive storytelling actions (from Part 3)
  "survey-site": {
    cameraPos: [18, 12, 26],
    targetPos: [-10, 2, -15],
  },
  "rover-path": {
    cameraPos: [-18, 5, 22],
    targetPos: [-19, 1, 16],
  },
  "left-behind": {
    cameraPos: [4.2, 2.1, 4.8],
    targetPos: [0, 1.1, 0],
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
      minDistance={2.5}
      maxDistance={90}
      maxPolarAngle={Math.PI / 2 - 0.04} // Prevent camera from going beneath lunar ground
      enabled={true}
    />
  );
}
