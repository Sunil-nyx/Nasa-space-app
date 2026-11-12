"use client";

import React, { useState, Suspense, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, useProgress } from "@react-three/drei";
import { LunarTerrain } from "./LunarTerrain";
import { EarthSphere } from "./EarthSphere";
import { LunarModule } from "./LunarModule";
import { CameraController, SCENE_CONFIGS } from "./CameraController";
import { StoryOverlay, STORY_SCENES } from "./StoryOverlay";

// ProgressBridge lives INSIDE Canvas so it can call useProgress().
// It reports back via a callback — no Html / nested React root needed.
function ProgressBridge({ onProgress }: { onProgress: (p: number) => void }) {
  const { progress } = useProgress();
  useEffect(() => {
    onProgress(progress);
  }, [progress, onProgress]);
  return null;
}

export default function ApolloViewer() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [freeOrbit, setFreeOrbit] = useState<boolean>(false);

  // Loading overlay state — driven by ProgressBridge inside Canvas
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Stable callback so ProgressBridge doesn't trigger infinite re-renders
  const handleProgress = useCallback((p: number) => {
    setLoadProgress(p);
    if (p >= 100) {
      // Small delay so the 100% display flashes briefly before hiding
      setTimeout(() => setLoaded(true), 400);
    }
  }, []);

  const sceneConfig = SCENE_CONFIGS[currentScene] || SCENE_CONFIGS[1];

  // Wheel / scroll listener to step through scenes naturally when hovering over 3D Canvas
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // If user is hovering over or scrolling inside the story card/modals, do NOT step scene
      const target = e.target as HTMLElement | null;
      if (target && target.closest(".story-panel-scroll, .chapter-scroll-area, [data-prevent-scene-wheel='true']")) {
        return;
      }

      // Only step scenes if not in free orbit mode and modal not open
      if (freeOrbit || activeHotspot) return;

      if (e.deltaY > 60) {
        setCurrentScene((prev) => Math.min(STORY_SCENES.length, prev + 1));
      } else if (e.deltaY < -60) {
        setCurrentScene((prev) => Math.max(1, prev - 1));
      }
    },
    [freeOrbit, activeHotspot]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const throttledWheel = (e: WheelEvent) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => handleWheel(e), 80);
    };

    window.addEventListener("wheel", throttledWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", throttledWheel);
      clearTimeout(timeout);
    };
  }, [handleWheel]);

  return (
    <div className="relative w-screen h-screen bg-[#02040a] overflow-hidden select-none">
      {/* 3D WebGL Canvas — always mounted, never conditionally rendered */}
      <Canvas
        shadows
        camera={{ position: [0, 36, 68], fov: 45, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Deep, pitch-black space background */}
        <color attach="background" args={["#010206"]} />

        {/* ProgressBridge reports asset loading to DOM overlay — no Html/nested root */}
        <ProgressBridge onProgress={handleProgress} />

        {/* Suspense fallback is null — the DOM overlay below handles the loading UI */}
        <Suspense fallback={null}>
          {/* Stark Directional Sunlight with sharp lunar shadows */}
          <directionalLight
            position={[45, 30, 25]}
            intensity={4.8}
            color="#fffcf0"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={1}
            shadow-camera-far={120}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
            shadow-bias={-0.0001}
          />

          {/* Earthshine & Secondary regolith scatter */}
          <ambientLight intensity={0.25} color="#1e293b" />

          {/* Distant Earth reflection */}
          <directionalLight
            position={[60, 48, -70]}
            intensity={0.4}
            color="#60a5fa"
          />

          {/* Sharp distant starfield in vacuum */}
          <Stars
            radius={130}
            depth={60}
            count={3500}
            factor={3.8}
            saturation={0}
            fade
            speed={0.3}
          />

          {/* Distant Earth Sphere in Lunar Sky */}
          <EarthSphere />

          {/* Realistic Procedural Lunar Terrain, Craters & Tracks */}
          <LunarTerrain />

          {/* Official NASA Apollo Lunar Module with separation mechanics */}
          <LunarModule
            showAscentStage={sceneConfig.showAscentStage}
            ascentLiftProgress={sceneConfig.ascentLiftProgress}
            activeHotspot={activeHotspot}
            onSelectHotspot={(id) => {
              setActiveHotspot(id);
              setFreeOrbit(false);
            }}
          />

          {/* Smooth Cinematic Camera & Orbit Controller */}
          <CameraController
            currentScene={currentScene}
            activeHotspot={activeHotspot}
            freeOrbit={freeOrbit}
          />
        </Suspense>
      </Canvas>

      {/* DOM Loading Overlay — rendered outside Canvas, no React root conflicts */}
      {!loaded && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#02040a]"
          style={{ transition: "opacity 0.5s", opacity: loadProgress >= 100 ? 0 : 1 }}
        >
          {/* Spinner */}
          <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 12px #38bdf8" }} />
          </div>

          {/* Label */}
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-400 mb-3">
            Initialising Lunar Environment
          </div>

          {/* Progress number */}
          <div className="font-mono text-4xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            {Math.round(loadProgress)}%
          </div>

          {/* Progress bar */}
          <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%`, boxShadow: "0 0 10px #38bdf8" }}
            />
          </div>

          <div className="font-mono text-[10px] text-slate-500 tracking-widest">
            TAURUS-LITTROW // NASA 3D ASSETS
          </div>
        </div>
      )}

      {/* Museum UI & Storytelling Overlays — only shown after loaded */}
      {loaded && (
        <StoryOverlay
          currentScene={currentScene}
          onSetScene={(sceneId) => {
            setCurrentScene(sceneId);
            setActiveHotspot(null);
            setFreeOrbit(false);
          }}
          activeHotspot={activeHotspot}
          onCloseHotspot={() => setActiveHotspot(null)}
          freeOrbit={freeOrbit}
          onToggleFreeOrbit={() => setFreeOrbit(!freeOrbit)}
          onSelectHotspot={(id) => {
            setActiveHotspot(id);
            setFreeOrbit(false);
          }}
        />
      )}
    </div>
  );
}
