"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic client import for WebGL Canvas
const DartViewer = dynamic(() => import("./DartViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-[#020612] flex flex-col items-center justify-center text-center">
      <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-1">
        Initializing 3D Asteroid System
      </div>
      <div className="text-[11px] font-mono text-slate-500">
        SILENT EXPLORERS // DART KINETIC DEFENSE ARCHIVE
      </div>
    </div>
  ),
});

export default function DartMissionPage() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#020612]">
      <DartViewer />
    </main>
  );
}
