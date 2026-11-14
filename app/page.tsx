import React from "react";

export default function Home() {
  return (
    <div className="relative min-h-screen space-bg overflow-x-hidden selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Background Star Layers */}
      <div className="fixed inset-0 pointer-events-none stars-layer-1 animate-twinkle-slow opacity-85 z-0" />
      <div className="fixed inset-0 pointer-events-none stars-layer-2 animate-twinkle-fast opacity-70 z-0" />

      {/* Atmospheric Radial Nebulae (Blue & Violet Lighting) */}
      <div className="fixed top-[-10vw] left-[15vw] w-[55vw] h-[55vw] rounded-full bg-cyan-600/15 blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[40vh] right-[-10vw] w-[50vw] h-[50vw] rounded-full bg-violet-600/15 blur-[170px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] left-[-10vw] w-[60vw] h-[60vw] rounded-full bg-indigo-900/20 blur-[160px] pointer-events-none z-0" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#02040a]/80 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3.5 group no-underline text-white">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-cyan-500/40 bg-cyan-950/50 group-hover:border-cyan-400/80 transition-colors">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-ping opacity-75" />
              <span className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </div>
            <div>
              <span className="font-mono text-base font-bold tracking-[0.25em] text-white block group-hover:text-cyan-300 transition-colors">
                SILENT EXPLORERS
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-400/80 font-mono block">
                Planetary Artifact Archive
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#archive"
              className="text-xs uppercase tracking-[0.22em] font-mono text-slate-300 hover:text-cyan-300 transition-colors no-underline"
            >
              The Archive
            </a>
            <a
              href="#missions"
              className="text-xs uppercase tracking-[0.22em] font-mono text-slate-300 hover:text-cyan-300 transition-colors no-underline"
            >
              Missions
            </a>
            <a
              href="#about"
              className="text-xs uppercase tracking-[0.22em] font-mono text-slate-300 hover:text-cyan-300 transition-colors no-underline"
            >
              About
            </a>
          </nav>

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/40 text-[11px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="tracking-wider">{"DEEP SPACE BEACON // LISTENING"}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-16 pb-24">
          {/* Subtle Grid overlay for technical documentary feel */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            {/* Mission Dispatch Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 text-xs font-mono tracking-[0.25em] uppercase mb-8 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {"Deep Space Registry // 1957 — Present"}
            </div>

            {/* Dramatic Hero Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] mb-8 glow-text-white">
              The Machines <br />
              <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-400 bg-clip-text text-transparent glow-text-cyan">
                We Left Behind.
              </span>
            </h1>

            {/* Introduction Explaining Spacecraft on Other Worlds */}
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12">
              Across airless lunar seas, rust-red Martian canyons, and the fractured crusts
              of distant asteroids rest humanity’s most daring emissaries. Having answered
              every question we asked of them, they remain forever in the silent vacuum —
              enduring monuments to human curiosity, perseverance, and our restless urge
              to touch the cosmos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {/* Featured Mission Shortcut Button */}
              <a
                href="/missions/dart"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:shadow-[0_0_50px_rgba(56,189,248,0.75)] hover:brightness-110 transition-all duration-300 text-center no-underline flex items-center justify-center gap-2.5 group"
              >
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                <span>EXPLORE FEATURED MISSION — DART</span>
                <span className="text-slate-950 font-black group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#missions"
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-cyan-400/50 text-slate-200 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 text-center backdrop-blur-md no-underline"
              >
                Inspect All Artifacts
              </a>
              <a
                href="#archive"
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-cyan-400/50 text-slate-200 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 text-center backdrop-blur-md no-underline"
              >
                Mission Archives
              </a>
            </div>

            {/* Hero Telemetry Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20 pt-12 border-t border-white/[0.08] w-full max-w-4xl">
              <div className="text-center p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white mb-1">
                  150+
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Moon Artifacts
                </div>
              </div>
              <div className="text-center p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-cyan-300 mb-1">
                  8
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Worlds Touched
                </div>
              </div>
              <div className="text-center p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-violet-300 mb-1">
                  55+ Yrs
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Oldest Artifact
                </div>
              </div>
              <div className="text-center p-3">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-sky-400 mb-1">
                  No Wind
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Near-Vacuum Preservation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION CARDS SECTION */}
        <section id="missions" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-3">
                  {"Catalog // Decommissioned Artifacts"}
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
                  Featured Pioneers
                </h2>
              </div>
              <p className="text-slate-400 text-sm max-w-md font-light">
                Each machine carried our senses to uncharted domains. When their batteries
                froze and antennas turned cold, their resting places became sacred outposts of history.
              </p>
            </div>

            {/* The 3 Required Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* CARD 1: Apollo 17 — The Moon */}
              <article className="group relative rounded-2xl p-7 glass-panel glass-panel-hover flex flex-col justify-between overflow-hidden border border-white/[0.08] hover:border-slate-300/40">
                {/* Visual Accent Glow */}
                <div className="absolute -top-24 -right-24 w-52 h-52 bg-slate-200/10 rounded-full blur-3xl pointer-events-none group-hover:bg-slate-200/20 transition-all duration-500" />

                <div>
                  {/* Planetary & Artifact Category */}
                  <div className="flex items-center justify-between text-xs font-mono mb-5">
                    <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-slate-200">
                      {"THE MOON // LUNAR SURFACE"}
                    </span>
                    <span className="text-slate-400">DEC 1972</span>
                  </div>

                  {/* Mission Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                    Apollo 17 — The Moon
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 tracking-wider mb-5 uppercase">
                    Challenger Descent Stage &amp; LRV-3
                  </div>

                  {/* Custom Distinct Visual Illustration: Apollo 17 & Lunar Rover on Moon */}
                  <div className="my-5 rounded-xl bg-black/60 border border-white/[0.08] overflow-hidden p-3 relative group-hover:border-cyan-500/30 transition-colors">
                    <svg
                      viewBox="0 0 360 170"
                      className="w-full h-auto"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Deep lunar space */}
                      <rect width="360" height="170" fill="#040711" />
                      {/* Tiny stars */}
                      <circle cx="28" cy="24" r="0.8" fill="#ffffff" opacity="0.8" />
                      <circle cx="85" cy="40" r="0.6" fill="#93c5fd" opacity="0.7" />
                      <circle cx="150" cy="18" r="1" fill="#ffffff" opacity="0.9" />
                      <circle cx="240" cy="32" r="0.7" fill="#ffffff" opacity="0.6" />
                      <circle cx="310" cy="20" r="0.8" fill="#bae6fd" opacity="0.8" />
                      <circle cx="335" cy="55" r="0.6" fill="#ffffff" opacity="0.7" />

                      {/* Distant Earth hanging in sky */}
                      <circle cx="285" cy="38" r="14" fill="#1e3a8a" />
                      <circle cx="285" cy="38" r="14" fill="url(#earthGlow)" opacity="0.6" />
                      <path
                        d="M276 34c2-2 5 0 6 3 2 4 4 1 6 2 2 1 4 4 3 6-4 4-11 5-15 1-2-2-3-7 0-12z"
                        fill="#6ee7b7"
                        opacity="0.75"
                      />
                      <path
                        d="M288 30c3 1 5 3 6 6-1 2-4 3-5 5-2-1-3-4-2-7 0-2 1-3 1-4z"
                        fill="#ffffff"
                        opacity="0.8"
                      />
                      <circle cx="285" cy="38" r="14" stroke="#60a5fa" strokeWidth="0.8" opacity="0.6" />

                      {/* Distant South Massif mountains */}
                      <path
                        d="M0 115 L60 92 L140 108 L220 86 L300 102 L360 94 L360 170 L0 170 Z"
                        fill="#111827"
                      />
                      <path
                        d="M0 128 L80 118 L180 125 L270 115 L360 124 L360 170 L0 170 Z"
                        fill="#1f2937"
                      />

                      {/* Lunar surface foreground with crater dust */}
                      <path
                        d="M0 138 C90 134 180 142 270 136 C310 133 340 136 360 138 L360 170 L0 170 Z"
                        fill="#374151"
                      />
                      {/* Lunar Craters */}
                      <ellipse cx="65" cy="148" rx="22" ry="4.5" fill="#1f2937" stroke="#4b5563" strokeWidth="0.8" />
                      <ellipse cx="295" cy="155" rx="35" ry="6" fill="#1f2937" stroke="#4b5563" strokeWidth="0.8" />
                      <ellipse cx="190" cy="162" rx="18" ry="3" fill="#1f2937" opacity="0.7" />

                      {/* Apollo 17 Challenger Descent Stage */}
                      <g transform="translate(195, 96)">
                        {/* Gold Foil Mylar Descent Stage Body */}
                        <polygon points="20,18 42,18 50,30 12,30" fill="#d97706" stroke="#fbbf24" strokeWidth="0.8" />
                        <rect x="22" y="10" width="18" height="8" fill="#b45309" stroke="#f59e0b" strokeWidth="0.8" />
                        {/* Engine Bell */}
                        <polygon points="27,30 35,30 38,37 24,37" fill="#475569" />
                        {/* 4 Landing Struts */}
                        <line x1="16" y1="28" x2="2" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
                        <circle cx="2" cy="44" r="2.5" fill="#64748b" />
                        <line x1="46" y1="28" x2="60" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
                        <circle cx="60" cy="44" r="2.5" fill="#64748b" />
                        <line x1="26" y1="28" x2="20" y2="43" stroke="#cbd5e1" strokeWidth="1.2" />
                        <circle cx="20" cy="43" r="2" fill="#64748b" />
                        <line x1="36" y1="28" x2="42" y2="43" stroke="#cbd5e1" strokeWidth="1.2" />
                        <circle cx="42" cy="43" r="2" fill="#64748b" />
                        {/* Left behind plaque & ladder */}
                        <line x1="31" y1="18" x2="31" y2="35" stroke="#f8fafc" strokeWidth="0.8" />
                        <rect x="27" y="22" width="8" height="4" fill="#e2e8f0" opacity="0.9" />
                      </g>

                      {/* Lunar Roving Vehicle (LRV-3) Parked Facing Mountains */}
                      <g transform="translate(105, 120)">
                        {/* LRV Wire-Mesh Wheels */}
                        <circle cx="8" cy="22" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                        <circle cx="34" cy="22" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                        {/* Chassis Frame */}
                        <path d="M4 18 L38 18 L34 13 L12 13 Z" fill="#94a3b8" stroke="#f1f5f9" strokeWidth="0.8" />
                        {/* Crew Seats */}
                        <path d="M16 13 L16 7 L21 7 L21 13 Z" fill="#cbd5e1" />
                        <path d="M23 13 L23 7 L28 7 L28 13 Z" fill="#cbd5e1" />
                        {/* High-gain Umbrella Dish Antenna */}
                        <line x1="30" y1="13" x2="35" y2="3" stroke="#38bdf8" strokeWidth="1" />
                        <path d="M31 3 Q35 0 39 3" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
                        {/* TV Camera */}
                        <circle cx="37" cy="8" r="1.5" fill="#38bdf8" />
                      </g>

                      {/* Telemetry Coordinate HUD */}
                      <text x="12" y="20" fill="#94a3b8" fontFamily="monospace" fontSize="8" letterSpacing="1">
                        TAURUS-LITTROW // 20.1908° N, 30.7717° E
                      </text>
                      <text x="12" y="160" fill="#38bdf8" fontFamily="monospace" fontSize="8" letterSpacing="1">
                        RANGE: 384,400 KM • MONUMENT STATIC
                      </text>

                      <defs>
                        <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Mission Story */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    When Eugene Cernan and Harrison Schmitt lifted off the Moon in December
                    1972, their Ascent Stage returned them to lunar orbit while the lower
                    Descent Stage and Lunar Roving Vehicle remained at Taurus-Littrow. In the
                    Moon&apos;s airless exosphere, undisturbed by wind, rain, or biological decay,
                    the historic descent base sits facing the mountains beneath the rising Earth.
                  </p>
                </div>

                {/* Telemetry Footer & 3D Mission Link */}
                <div className="pt-5 border-t border-white/[0.08] mt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>STATUS: SILENT VANGUARD</span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      PRESERVED
                    </span>
                  </div>
                  <a
                    href="/missions/apollo-17"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/35 hover:to-blue-600/35 border border-cyan-500/35 hover:border-cyan-400 text-cyan-200 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] no-underline"
                  >
                    <span>Launch 3D Lunar Experience</span>
                    <span className="text-cyan-400">→</span>
                  </a>
                </div>
              </article>

              {/* CARD 2: Opportunity — Mars */}
              <article className="group relative rounded-2xl p-7 glass-panel glass-panel-hover flex flex-col justify-between overflow-hidden border border-white/[0.08] hover:border-amber-400/40">
                {/* Visual Accent Glow (Martian Crimson / Amber) */}
                <div className="absolute -top-24 -right-24 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-500" />

                <div>
                  {/* Planetary & Artifact Category */}
                  <div className="flex items-center justify-between text-xs font-mono mb-5">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-200">
                      {"MARS // MERIDIANI PLANUM"}
                    </span>
                    <span className="text-slate-400">2004 — 2018</span>
                  </div>

                  {/* Mission Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                    Opportunity — Mars
                  </h3>
                  <div className="text-xs font-mono text-amber-400 tracking-wider mb-5 uppercase">
                    Mars Exploration Rover (MER-B)
                  </div>

                  {/* Custom Distinct Visual Illustration: Opportunity Rover on Red Martian Dunes */}
                  <div className="my-5 rounded-xl bg-black/60 border border-white/[0.08] overflow-hidden p-3 relative group-hover:border-amber-500/30 transition-colors">
                    <svg
                      viewBox="0 0 360 170"
                      className="w-full h-auto"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Martian Dusky Salmon Sky */}
                      <rect width="360" height="170" fill="#1c0d0a" />
                      {/* Distant pale Sun through thin atmosphere */}
                      <circle cx="70" cy="40" r="8" fill="#fef08a" opacity="0.85" />
                      <circle cx="70" cy="40" r="18" fill="#fef08a" opacity="0.15" />

                      {/* Dust haze gradient */}
                      <rect width="360" height="85" fill="url(#marsAtmosphere)" opacity="0.4" />

                      {/* Distant Crater Rim (Endeavour Crater Wall) */}
                      <path
                        d="M0 88 Q90 74 180 82 T360 76 L360 170 L0 170 Z"
                        fill="#381710"
                      />
                      <path
                        d="M0 102 Q120 92 240 98 T360 94 L360 170 L0 170 Z"
                        fill="#5c2415"
                      />

                      {/* Foreground Martian Dunes (Perseverance Valley) */}
                      <path
                        d="M0 118 C110 108 210 128 360 114 L360 170 L0 170 Z"
                        fill="#83311c"
                      />
                      <path
                        d="M0 135 C130 130 230 144 360 132 L360 170 L0 170 Z"
                        fill="#9f3e24"
                      />

                      {/* Rover Wheel Tracks etched in red sand */}
                      <path
                        d="M30 158 Q90 148 140 143"
                        stroke="#5c2415"
                        strokeWidth="2.5"
                        strokeDasharray="3 2"
                      />
                      <path
                        d="M36 166 Q98 155 148 149"
                        stroke="#5c2415"
                        strokeWidth="2.5"
                        strokeDasharray="3 2"
                      />

                      {/* Opportunity Rover Graphic Representation */}
                      <g transform="translate(142, 108)">
                        {/* Rocker-Bogie Suspension Legs */}
                        <line x1="8" y1="26" x2="22" y2="18" stroke="#d97706" strokeWidth="1.5" />
                        <line x1="22" y1="18" x2="38" y2="25" stroke="#d97706" strokeWidth="1.5" />
                        <line x1="22" y1="18" x2="52" y2="24" stroke="#d97706" strokeWidth="1.5" />

                        {/* 6 Cleated Aluminum Wheels */}
                        <circle cx="8" cy="28" r="4.5" fill="#1c1917" stroke="#f59e0b" strokeWidth="1" />
                        <circle cx="26" cy="27" r="4.5" fill="#1c1917" stroke="#f59e0b" strokeWidth="1" />
                        <circle cx="48" cy="27" r="4.5" fill="#1c1917" stroke="#f59e0b" strokeWidth="1" />

                        {/* Central Body Warm Electronics Box (WEB) */}
                        <polygon points="14,14 44,14 40,20 16,20" fill="#78350f" stroke="#fbbf24" strokeWidth="0.8" />

                        {/* Solar Array Wings (Winged hexagon panel layout) */}
                        <polygon points="6,14 16,10 42,10 52,14 44,16 14,16" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.8" />
                        <line x1="20" y1="10" x2="18" y2="16" stroke="#93c5fd" strokeWidth="0.5" />
                        <line x1="28" y1="10" x2="28" y2="16" stroke="#93c5fd" strokeWidth="0.5" />
                        <line x1="36" y1="10" x2="38" y2="16" stroke="#93c5fd" strokeWidth="0.5" />

                        {/* Pancam Mast Assembly (The Rover's "Eyes") */}
                        <line x1="38" y1="10" x2="38" y2="-4" stroke="#f59e0b" strokeWidth="1.5" />
                        {/* Pancam Stereo Camera Bar */}
                        <rect x="33" y="-8" width="10" height="4" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
                        <circle cx="35" cy="-6" r="1.2" fill="#0f172a" />
                        <circle cx="41" cy="-6" r="1.2" fill="#0f172a" />
                        {/* High Gain Antenna Dish */}
                        <ellipse cx="22" cy="7" rx="4" ry="2" fill="#d97706" stroke="#fef3c7" strokeWidth="0.8" />
                      </g>

                      {/* Telemetry Coordinate HUD */}
                      <text x="12" y="20" fill="#fdba74" fontFamily="monospace" fontSize="8" letterSpacing="1">
                        PERSEVERANCE VALLEY // SOL 5111
                      </text>
                      <text x="12" y="160" fill="#fbbf24" fontFamily="monospace" fontSize="8" letterSpacing="1">
                        ODOMETRY: 45.16 KM • BATTERY: 0% • DUST COATED
                      </text>

                      <defs>
                        <linearGradient id="marsAtmosphere" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#1c0d0a" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Mission Story */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    Engineered for an initial 90-sol primary mission, Opportunity traversed
                    the Martian terrain for nearly 15 years, driving 45.16 km—a world record
                    surpassed only by Perseverance in October 2026. In June 2018, a global
                    dust storm darkened the skies, bringing its historic mission to a close
                    in Perseverance Valley.
                  </p>
                </div>

                {/* Telemetry Footer & 3D Mission Link */}
                <div className="pt-5 border-t border-white/[0.08] mt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>FINAL CALL: SOL 5111</span>
                    <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                      DORMANT
                    </span>
                  </div>
                  <a
                    href="/missions/opportunity"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-600/20 hover:from-amber-500/35 hover:to-orange-600/35 border border-amber-500/35 hover:border-amber-400 text-amber-200 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] no-underline"
                  >
                    <span>Launch 3D Mars Experience</span>
                    <span className="text-amber-400">→</span>
                  </a>
                </div>
              </article>

              {/* CARD 3: DART — Dimorphos (FEATURED MISSION) */}
              <article className="group relative rounded-2xl p-7 flex flex-col justify-between overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_35px_rgba(56,189,248,0.22)] ring-1 ring-cyan-400/30 lg:scale-[1.02] z-10 bg-gradient-to-b from-[#071736]/95 via-[#040e24]/90 to-[#02050f]/95 glass-panel-hover">
                {/* Visual Accent Glow (Kinetic Electric Cyan) */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/35 transition-all duration-500" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Distinctive FEATURED MISSION Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      ★ FEATURED MISSION
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
                      PLANETARY DEFENSE
                    </span>
                  </div>

                  {/* Planetary & Artifact Category */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-bold">
                      {"DIMORPHOS // (65803) DIDYMOS"}
                    </span>
                    <span className="text-slate-300 font-bold">SEP 26, 2022</span>
                  </div>

                  {/* Mission Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1 group-hover:text-cyan-200 transition-colors tracking-tight">
                    DART — Dimorphos
                  </h3>
                  <div className="text-xs font-mono text-cyan-300 font-bold tracking-wider mb-5 uppercase">
                    Double Asteroid Redirection Test // Kinetic Impactor
                  </div>

                  {/* Custom Distinct Visual Illustration: DART Kinetic Collision Vector */}
                  <div className="my-5 rounded-xl bg-black/70 border border-cyan-500/30 overflow-hidden p-3 relative group-hover:border-cyan-400/60 transition-colors shadow-[inset_0_0_20px_rgba(56,189,248,0.1)]">
                    <svg
                      viewBox="0 0 360 170"
                      className="w-full h-auto"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Deep Void with Starfield */}
                      <rect width="360" height="170" fill="#020617" />
                      <circle cx="20" cy="25" r="0.8" fill="#ffffff" />
                      <circle cx="75" cy="18" r="1" fill="#38bdf8" />
                      <circle cx="120" cy="45" r="0.6" fill="#ffffff" />
                      <circle cx="180" cy="15" r="0.8" fill="#e0f2fe" />
                      <circle cx="330" cy="25" r="0.7" fill="#ffffff" />
                      <circle cx="345" cy="85" r="0.9" fill="#93c5fd" />

                      {/* Primary Asteroid Didymos in Background */}
                      <g opacity="0.35">
                        <polygon
                          points="20,70 35,50 65,45 80,60 90,90 75,115 45,120 25,100"
                          fill="#334155"
                          stroke="#64748b"
                          strokeWidth="1"
                        />
                        <text x="35" y="85" fill="#94a3b8" fontFamily="monospace" fontSize="6">
                          (65803) DIDYMOS
                        </text>
                      </g>

                      {/* Target Asteroid Moonlet Dimorphos (Rugged Boulder-Rich Body) */}
                      <g transform="translate(195, 45)">
                        <polygon
                          points="20,35 45,15 85,10 120,25 140,55 130,95 95,115 50,110 20,85 15,55"
                          fill="#1e293b"
                          stroke="#475569"
                          strokeWidth="1.5"
                        />
                        {/* Surface Boulders & Craters */}
                        <ellipse cx="60" cy="40" rx="12" ry="7" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
                        <ellipse cx="100" cy="65" rx="15" ry="9" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
                        <ellipse cx="50" cy="80" rx="10" ry="6" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
                        {/* Fresh Impact Crater Core */}
                        <circle cx="45" cy="55" r="14" fill="#0284c7" opacity="0.25" />
                        <circle cx="45" cy="55" r="7" fill="#38bdf8" opacity="0.7" />
                        <circle cx="45" cy="55" r="3" fill="#ffffff" />
                      </g>

                      {/* Kinetic Trajectory Flight Path */}
                      <line
                        x1="35"
                        y1="135"
                        x2="236"
                        y2="100"
                        stroke="#0ea5e9"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        opacity="0.8"
                      />
                      {/* Shockwave Rings of Impact */}
                      <circle cx="240" cy="100" r="12" stroke="#38bdf8" strokeWidth="1" opacity="0.8" fill="none" />
                      <circle cx="240" cy="100" r="22" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" fill="none" />
                      <circle cx="240" cy="100" r="35" stroke="#38bdf8" strokeWidth="0.5" opacity="0.25" fill="none" />

                      {/* DART Spacecraft (approaching target) */}
                      <g transform="translate(100, 114) rotate(-10)">
                        {/* Cubical Bus Body */}
                        <rect x="0" y="0" width="16" height="14" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1" />
                        {/* DRACO High-Resolution Imaging Camera */}
                        <rect x="14" y="4" width="6" height="6" fill="#0284c7" stroke="#e0f2fe" strokeWidth="0.8" />
                        <circle cx="17" cy="7" r="1.5" fill="#ffffff" />
                        {/* Solar Array Wings (Roll-Out Solar Arrays / ROSA) */}
                        <rect x="-18" y="-12" width="18" height="10" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />
                        <rect x="16" y="16" width="18" height="10" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />
                        {/* Structural Struts */}
                        <line x1="0" y1="0" x2="-10" y2="-6" stroke="#94a3b8" strokeWidth="1.2" />
                        <line x1="16" y1="14" x2="26" y2="20" stroke="#94a3b8" strokeWidth="1.2" />
                      </g>

                      {/* Telemetry Coordinate HUD */}
                      <text x="12" y="20" fill="#38bdf8" fontFamily="monospace" fontSize="8" letterSpacing="1">
                        INTERCEPT VECTOR // 6.1 KM/S (14,000 MPH)
                      </text>
                      <text x="12" y="160" fill="#67e8f9" fontFamily="monospace" fontSize="8" letterSpacing="1">
                        RESULT: ORBIT REDIRECTED (-33 MIN) • FUSED IN BEDROCK
                      </text>
                    </svg>
                  </div>

                  {/* Mission Story */}
                  <p className="text-slate-200 text-sm leading-relaxed mb-6 font-light">
                    On September 26, 2022, 11 million kilometers from Earth, DART executed
                    humanity&apos;s first full-scale planetary defense demonstration. Travelling at
                    6.1 km/s (14,000 mph), it deliberately collided with Dimorphos—the 160-meter
                    moonlet orbiting asteroid Didymos. The controlled kinetic impact altered
                    Dimorphos&apos;s orbital period by 33 minutes, proving humanity can deflect
                    celestial hazards without destroying them.
                  </p>
                </div>

                {/* Telemetry Footer & Call to Action */}
                <div className="pt-5 border-t border-cyan-500/20 mt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span>IMPACT: HYPERVELOCITY (6.1 KM/S)</span>
                    <span className="text-cyan-300 flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                      ORBIT DEFLECTED
                    </span>
                  </div>
                  <a
                    href="/missions/dart"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] no-underline"
                  >
                    <span>Launch 3D Asteroid Encounter</span>
                    <span className="text-slate-950 font-black">→</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* DOCUMENTARY INSIGHT / WHY WE LEFT THEM SECTION */}
        <section id="archive" className="py-24 px-6 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] block mb-3">
                The Science of Isolation
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
                Why Some Machines Stayed Behind
              </h2>
              <p className="text-slate-400 text-base mt-4 font-light">
                Bringing a spacecraft back across gravitational chasms requires astronomical
                fuel and mass. Instead, every ounce was dedicated to science, cameras, and discovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl glass-panel border border-white/[0.08]">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold mb-6">
                  01
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  The Gravity Penalty
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Escaping deep gravitational wells consumes exponential fuel. For exploration rovers
                  and planetary landers, designing missions to remain on their target worlds eliminated
                  the heavy ascent rockets, fuel tanks, and heat shields needed for a return trip,
                  maximizing the payload capacity available for cameras, spectrometers, and scientific drills.
                </p>
              </div>

              <div className="p-8 rounded-2xl glass-panel border border-white/[0.08]">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold mb-6">
                  02
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  Environmental Stasis &amp; Weathering
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Preservation depends on each alien world&apos;s distinct environment. In the Moon&apos;s
                  near-vacuum exosphere, without liquid water or weather, descent stages endure for centuries,
                  weathered only by micrometeorites and solar radiation. On Mars, rovers face a thin CO₂ atmosphere,
                  drifting dust, and severe thermal cycles that slowly bury their tracks.
                </p>
              </div>

              <div className="p-8 rounded-2xl glass-panel border border-white/[0.08]">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold mb-6">
                  03
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  Different Journeys, Different Ends
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Not every machine stayed behind for the same reason. Apollo 17&apos;s astronauts returned home
                  while their descent stage remained as a permanent monument; Opportunity explored Mars until
                  a global dust storm silenced its solar panels; and DART sacrificed itself in a deliberate,
                  controlled kinetic impact to prove we could safeguard our planet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DRAMATIC CLOSING SECTION */}
        <section id="about" className="py-32 px-6 relative overflow-hidden">
          {/* Atmospheric Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-700/20 via-cyan-500/25 to-violet-700/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Beacon Signal Symbol */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-cyan-500/40 bg-cyan-950/40 mb-8 animate-pulse-glow">
              <span className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#38bdf8]" />
            </div>

            {/* Required Dramatic Heading */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight mb-8">
              THEIR MISSIONS ENDED. <br />
              <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-400 bg-clip-text text-transparent glow-text-cyan">
                THEIR LEGACY DIDN&apos;T.
              </span>
            </h2>

            {/* Evocative Narrative Conclusion */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Long after their batteries drained and radio transmitters fell cold, these sentinels
              continue to hold ground on alien soil. Millions of years from now, when the winds of Mars
              have buried their tracks and micrometeorites have etched their chassis, they will still
              stand as the ultimate proof: we were here, and we reached for the stars.
            </p>

            {/* Coordinates / Telemetry strip */}
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-slate-400 backdrop-blur-md">
              <span className="text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
                TELEMETRY: ARCHIVED
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>SOLAR SYSTEM REGISTRY ID #SE-2026</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="text-slate-300">STATUS: ETERNAL EMBODIMENT</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#010307] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="font-mono text-sm font-bold tracking-widest text-white">
              SILENT EXPLORERS
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {"// The Machines Humanity Left Behind"}
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono text-slate-400">
            <a href="#" className="hover:text-cyan-300 transition-colors no-underline">
              Return to Top
            </a>
            <a href="#missions" className="hover:text-cyan-300 transition-colors no-underline">
              Missions
            </a>
            <a href="#archive" className="hover:text-cyan-300 transition-colors no-underline">
              The Archive
            </a>
          </div>

          <div className="text-xs font-mono text-slate-500 text-center md:text-right">
            Dedicated to the engineers and dreamers of deep space exploration.
          </div>
        </div>
      </footer>
    </div>
  );
}
