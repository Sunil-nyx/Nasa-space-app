"use client";

import React, { useState, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { MarsTerrain } from "./MarsTerrain";
import { MarsSky } from "./MarsSky";
import { OpportunityRover } from "./OpportunityRover";
import { MartianRockOutcrop } from "./MartianRockOutcrop";
import { CameraController } from "./CameraController";
import { StoryOverlay } from "./StoryOverlay";

// ProgressBridge lives INSIDE Canvas so it can call useProgress().
// It reports back via a callback — no Html / nested React root needed.
function ProgressBridge({ onProgress }: { onProgress: (p: number) => void }) {
  const { progress } = useProgress();
  React.useEffect(() => {
    onProgress(progress);
  }, [progress, onProgress]);
  return null;
}

export default function OpportunityViewer() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [freeOrbit, setFreeOrbit] = useState<boolean>(false);

  // Loading overlay state
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleProgress = useCallback((p: number) => {
    setLoadProgress(p);
    if (p >= 100) {
      setTimeout(() => setLoaded(true), 400);
    }
  }, []);

  const isDustStorm = currentScene === 4;

  return (
    <div className="relative w-screen h-screen bg-[#0d0403] overflow-hidden select-none">
      {/* 3D WebGL Canvas — always mounted, never conditionally unmounted */}
      <Canvas
        shadows
        camera={{ position: [3.4, 1.8, 3.6], fov: 45, near: 0.1, far: 400 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Martian atmospheric background color */}
        <color attach="background" args={[isDustStorm ? "#120503" : "#592317"]} />

        {/* ProgressBridge reports asset loading to DOM overlay */}
        <ProgressBridge onProgress={handleProgress} />

        <Suspense fallback={null}>
          {/* Directional Martian Sunlight */}
          <directionalLight
            position={[35, 26, 20]}
            intensity={isDustStorm ? 0.45 : 4.2}
            color={isDustStorm ? "#b45309" : "#ffedd5"}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={1}
            shadow-camera-far={90}
            shadow-camera-left={-18}
            shadow-camera-right={18}
            shadow-camera-top={18}
            shadow-camera-bottom={-18}
            shadow-bias={-0.0001}
          />

          {/* Diffuse Martian red sky ambient light */}
          <ambientLight
            intensity={isDustStorm ? 0.2 : 0.65}
            color={isDustStorm ? "#260e07" : "#7c2d12"}
          />

          {/* Secondary bounce light from red dunes */}
          <directionalLight
            position={[-25, -10, -20]}
            intensity={0.25}
            color="#991b1b"
          />

          {/* Atmospheric Martian Sky & Dust Cloud */}
          <MarsSky currentScene={currentScene} />

          {/* Red Regolith Terrain with dunes & Opportunity tyre tracks */}
          <MarsTerrain />

          {/* Interactive Rock Outcrop with Hematite Blueberries */}
          <MartianRockOutcrop
            activeHotspot={activeHotspot}
            onSelectHotspot={(id) => {
              setActiveHotspot(id);
              setFreeOrbit(false);
            }}
          />

          {/* Official NASA 3D Mars Exploration Rover (MER Opportunity) */}
          <OpportunityRover
            activeHotspot={activeHotspot}
            onSelectHotspot={(id) => {
              setActiveHotspot(id);
              setFreeOrbit(false);
            }}
          />

          {/* Cinematic Camera & Orbit Controller */}
          <CameraController
            currentScene={currentScene}
            activeHotspot={activeHotspot}
            freeOrbit={freeOrbit}
          />
        </Suspense>
      </Canvas>

      {/* DOM Loading Overlay — rendered outside Canvas */}
      {!loaded && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0403]"
          style={{ transition: "opacity 0.5s", opacity: loadProgress >= 100 ? 0 : 1 }}
        >
          {/* Spinner */}
          <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
            <span
              className="w-2.5 h-2.5 rounded-full bg-amber-400"
              style={{ boxShadow: "0 0 12px #f59e0b" }}
            />
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-400 mb-3">
            Initialising Mars Environment
          </div>

          <div className="font-mono text-4xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            {Math.round(loadProgress)}%
          </div>

          <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%`, boxShadow: "0 0 10px #f59e0b" }}
            />
          </div>

          <div className="font-mono text-[10px] text-slate-500 tracking-widest">
            MERIDIANI PLANUM // NASA MER ASSETS
          </div>
        </div>
      )}

      {/* Museum UI & Storytelling Overlays */}
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
