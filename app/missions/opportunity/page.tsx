"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic client import for WebGL Canvas
const OpportunityViewer = dynamic(() => import("./OpportunityViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-[#0a0403] flex flex-col items-center justify-center text-center">
      <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]" />
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 mb-1">
        Initializing 3D Mars Canvas
      </div>
      <div className="text-[11px] font-mono text-slate-500">
        SILENT EXPLORERS // MER-B OPPORTUNITY ARCHIVE
      </div>
    </div>
  ),
});

export default function OpportunityMissionPage() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#0a0403]">
      <OpportunityViewer />
    </main>
  );
}
