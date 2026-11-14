"use client";

import React, { useState, Suspense, useEffect, useCallback, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars, useProgress } from "@react-three/drei";
import { AsteroidSystem } from "./AsteroidSystem";
import { DartSpacecraft } from "./DartSpacecraft";
import { ImpactAnimation } from "./ImpactAnimation";
import { CameraController } from "./CameraController";
import { StoryOverlay } from "./StoryOverlay";

// ─────────────────────────────────────────────────────────────
// ERROR BOUNDARY FOR WEBGL / R3F
// ─────────────────────────────────────────────────────────────

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────────────────────
// SCENE READY NOTIFIER
// Executes inside Canvas after WebGL context & shaders are ready
// ─────────────────────────────────────────────────────────────

function SceneReadyNotifier({ onSceneReady }: { onSceneReady: () => void }) {
  const hasNotified = useRef(false);
  const { gl, scene, camera } = useThree();

  useFrame(() => {
    if (!hasNotified.current) {
      if (gl && scene && camera) {
        hasNotified.current = true;
        onSceneReady();
      }
    }
  });

  return null;
}

// ─────────────────────────────────────────────────────────────
// PROGRESS BRIDGE
// Tracks DefaultLoadingManager for external assets if present
// ─────────────────────────────────────────────────────────────

interface ProgressState {
  active: boolean;
  progress: number;
  loaded: number;
  total: number;
  errors: string[];
}

function ProgressBridge({
  onProgressUpdate,
}: {
  onProgressUpdate: (state: ProgressState) => void;
}) {
  const { active, progress, loaded, total, errors } = useProgress();

  useEffect(() => {
    onProgressUpdate({
      active,
      progress,
      loaded,
      total,
      errors,
    });
  }, [active, progress, loaded, total, errors, onProgressUpdate]);

  return null;
}

// ─────────────────────────────────────────────────────────────
// MAIN DART VIEWER COMPONENT
// ─────────────────────────────────────────────────────────────

export default function DartViewer() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [freeOrbit, setFreeOrbit] = useState<boolean>(false);

  // Chapter 4 Impact Animation State
  const [impactProgress, setImpactProgress] = useState<number>(0.0);
  const [isImpactPlaying, setIsImpactPlaying] = useState<boolean>(true);

  // Chapter 5 Orbit Shift Comparison State
  const [orbitShiftComparison, setOrbitShiftComparison] = useState<boolean>(true);

  // Loading & Readiness State
  const [sceneReady, setSceneReady] = useState<boolean>(false);
  const [assetProgress, setAssetProgress] = useState<ProgressState>({
    active: false,
    progress: 0,
    loaded: 0,
    total: 0,
    errors: [],
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState<number>(0);

  // Handle asset progress reporting
  const handleProgressUpdate = useCallback((state: ProgressState) => {
    setAssetProgress(state);
    if (state.errors.length > 0) {
      setInitError(`Asset loading error: ${state.errors.join(", ")}`);
    }
  }, []);

  // Handle procedural scene frame readiness
  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  // Unified readiness evaluation:
  // - If external assets exist (total > 0): wait for loaded >= total AND sceneReady
  // - If scene is procedural (total === 0): sceneReady signals completion
  useEffect(() => {
    if (sceneReady) {
      const isComplete =
        assetProgress.total === 0 || assetProgress.loaded >= assetProgress.total;

      if (isComplete && !loaded) {
        // Small transition buffer so the UI reveals smoothly
        const timer = setTimeout(() => {
          setLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [sceneReady, assetProgress, loaded]);

  // When switching to Chapter 4, reset impact progress to beginning and play
  const handleSelectScene = (sceneId: number) => {
    setCurrentScene(sceneId);
    setActiveHotspot(null);
    setFreeOrbit(false);

    if (sceneId === 4) {
      setImpactProgress(0.0);
      setIsImpactPlaying(true);
    }
  };

  const handleRetry = () => {
    setInitError(null);
    setSceneReady(false);
    setLoaded(false);
    setRetryKey((k) => k + 1);
  };

  // Determine current display percentage
  const displayProgress =
    assetProgress.total > 0
      ? Math.round(assetProgress.progress)
      : sceneReady
      ? 100
      : 25;

  return (
    <div className="relative w-screen h-screen bg-[#01040a] overflow-hidden select-none">
      {/* 3D WebGL Canvas — always mounted, key allows clean retry */}
      <WebGLErrorBoundary onError={(err) => setInitError(err.message)}>
        <Canvas
          key={retryKey}
          shadows
          camera={{ position: [0, 8.5, 26], fov: 45, near: 0.1, far: 500 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onCreated={() => {
            // WebGL renderer created successfully
          }}
        >
          {/* Deep space background */}
          <color attach="background" args={["#010308"]} />

          {/* ProgressBridge reports asset loading to DOM overlay */}
          <ProgressBridge onProgressUpdate={handleProgressUpdate} />

          {/* SceneReadyNotifier fires on first successful rendered frame */}
          <SceneReadyNotifier onSceneReady={handleSceneReady} />

          <Suspense fallback={null}>
            {/* Intense Directional Sunlight in Vacuum */}
            <directionalLight
              position={[45, 28, 32]}
              intensity={4.5}
              color="#ffffff"
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

            {/* Deep Space Ambient Starlight */}
            <ambientLight intensity={0.22} color="#1e293b" />

            {/* Cyan/Blue Secondary Reflection from Earth & Interplanetary Dust */}
            <directionalLight
              position={[-35, -15, -25]}
              intensity={0.35}
              color="#0284c7"
            />

            {/* Distant Starfield in Vacuum */}
            <Stars
              radius={140}
              depth={70}
              count={4200}
              factor={4.0}
              saturation={0}
              fade
              speed={0.25}
            />

            {/* ── ASTEROID BINARY SYSTEM (Didymos & Dimorphos) ── */}
            <AsteroidSystem
              currentScene={currentScene}
              activeHotspot={activeHotspot}
              onSelectHotspot={(id) => {
                setActiveHotspot(id);
                setFreeOrbit(false);
              }}
              showOrbits={true}
              orbitShiftComparison={currentScene === 5 ? orbitShiftComparison : false}
              impactProgress={currentScene === 4 ? impactProgress : currentScene === 5 ? 1.0 : 0}
            />

            {/* ── CHAPTER 1: DART SPACECRAFT IN INTERPLANETARY CRUISE ── */}
            {currentScene === 1 && (
              <DartSpacecraft
                position={[9.5, 2.8, 9.5]}
                rotation={[0.15, -0.7, 0.1]}
                scale={0.4}
                activeHotspot={activeHotspot}
                onSelectHotspot={(id) => {
                  setActiveHotspot(id);
                  setFreeOrbit(false);
                }}
                showThrusterGlow={true}
              />
            )}

            {/* ── CHAPTER 2: DART SPACECRAFT TECHNICAL INSPECTION ── */}
            {currentScene === 2 && (
              <DartSpacecraft
                position={[0, 0, 0]}
                rotation={[0.12, -0.35, 0.05]}
                scale={1.0}
                activeHotspot={activeHotspot}
                onSelectHotspot={(id) => {
                  setActiveHotspot(id);
                  setFreeOrbit(false);
                }}
                showThrusterGlow={false}
              />
            )}

            {/* ── CHAPTER 3: DART ON TERMINAL APPROACH VECTOR ── */}
            {currentScene === 3 && (
              <DartSpacecraft
                position={[0, 0.35, 2.8]}
                rotation={[0, 0, 0]}
                scale={0.65}
                activeHotspot={activeHotspot}
                onSelectHotspot={(id) => {
                  setActiveHotspot(id);
                  setFreeOrbit(false);
                }}
                showThrusterGlow={true}
              />
            )}

            {/* ── CHAPTER 4: KINETIC IMPACT ANIMATION ── */}
            {currentScene === 4 && (
              <ImpactAnimation
                progress={impactProgress}
                isPlaying={isImpactPlaying}
                onProgressUpdate={(p) => setImpactProgress(p)}
                targetPosition={[0, 0, -4.5]}
              />
            )}

            {/* ── CINEMATIC CAMERA CONTROLLER ── */}
            <CameraController
              currentScene={currentScene}
              activeHotspot={activeHotspot}
              freeOrbit={freeOrbit}
            />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>

      {/* ── DOM LOADING OVERLAY ─────────────────────────────────── */}
      {!loaded && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#01040a] px-4"
          style={{
            transition: "opacity 0.4s ease-out",
            opacity: loaded ? 0 : 1,
            pointerEvents: loaded ? "none" : "auto",
          }}
        >
          {initError ? (
            /* Error Card with Retry Button */
            <div className="max-w-md w-full p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-center backdrop-blur-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xl font-bold">
                ⚠
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-red-400 mb-2 font-bold">
                3D System Initialization Error
              </div>
              <p className="text-slate-300 text-xs leading-relaxed mb-6 font-mono">
                {initError}
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                Retry Initialization
              </button>
            </div>
          ) : (
            /* Active Initialization Spinner & Progress */
            <>
              <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                <div className="absolute w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                  style={{ boxShadow: "0 0 14px #38bdf8" }}
                />
              </div>

              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-400 mb-3 text-center">
                {assetProgress.total > 0
                  ? "DOWNLOADING MISSION TELEMETRY"
                  : "INITIALIZING 3D ASTEROID SYSTEM"}
              </div>

              <div
                className="font-mono text-4xl font-black text-white mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                {displayProgress}%
              </div>

              <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${displayProgress}%`,
                    boxShadow: "0 0 10px #38bdf8",
                  }}
                />
              </div>

              <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase text-center">
                (65803) DIDYMOS // 11M KM FROM EARTH
              </div>
            </>
          )}
        </div>
      )}

      {/* ── STORYTELLING OVERLAY & HUD ───────────────────────────── */}
      {loaded && (
        <StoryOverlay
          currentScene={currentScene}
          onSelectScene={handleSelectScene}
          activeHotspot={activeHotspot}
          onSelectHotspot={(id) => {
            setActiveHotspot(id);
            setFreeOrbit(false);
          }}
          onCloseHotspot={() => setActiveHotspot(null)}
          freeOrbit={freeOrbit}
          onToggleFreeOrbit={() => setFreeOrbit(!freeOrbit)}
          // Chapter 4 Controls
          impactProgress={impactProgress}
          onImpactProgressChange={(p) => {
            setImpactProgress(p);
            setIsImpactPlaying(false);
          }}
          isImpactPlaying={isImpactPlaying}
          onToggleImpactPlay={() => setIsImpactPlaying(!isImpactPlaying)}
          onReplayImpact={() => {
            setImpactProgress(0.0);
            setIsImpactPlaying(true);
          }}
          // Chapter 5 Controls
          orbitShiftComparison={orbitShiftComparison}
          onToggleOrbitShift={() => setOrbitShiftComparison(!orbitShiftComparison)}
        />
      )}
    </div>
  );
}
