const { compile } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');
const fs = require('fs');
const path = require('path');

async function generateCompleteCSS() {
  const projectRoot = process.cwd();
  
  // Tailwind v4 input
  const tailwindInput = `@import "tailwindcss";`;
  
  const compiler = await compile(tailwindInput, {
    base: projectRoot,
    from: path.join(projectRoot, 'app/globals.css'),
    shouldRewriteUrls: true,
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [
      { base: projectRoot, pattern: 'app/**/*.{js,ts,jsx,tsx}', negated: false }
    ]
  });

  const candidates = scanner.scan();
  console.log(`Scanned ${candidates.length} candidate classes.`);
  
  // Build all Tailwind utilities & preflight
  const tailwindCSS = compiler.build([...candidates]);

  // Custom Cinematic Space Styles
  const customSpaceCSS = `
/* ==========================================================================
   SILENT EXPLORERS — CINEMATIC SPACE THEME & ATMOSPHERIC LIGHTING
   ========================================================================== */

:root {
  --color-space-black: #02040a;
  --color-space-deep: #050b18;
  --color-space-navy: #081126;
  --color-space-violet: #150d2a;
  --glow-cyan: rgba(56, 189, 248, 0.4);
  --glow-violet: rgba(168, 85, 247, 0.3);
}

html {
  color-scheme: dark;
  scroll-behavior: smooth;
  background-color: #02040a;
}

body {
  background-color: #02040a;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

/* Link reset for clean navigation */
a {
  text-decoration: none;
  color: inherit;
}

/* Deep Space Procedural Canvas Background */
.space-bg {
  background-color: #02040a;
  background-image: 
    radial-gradient(circle at 50% -10%, rgba(14, 165, 233, 0.18) 0%, transparent 55%),
    radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 45%),
    radial-gradient(circle at 85% 45%, rgba(139, 92, 246, 0.14) 0%, transparent 50%),
    radial-gradient(circle at 50% 85%, rgba(14, 165, 233, 0.12) 0%, transparent 60%),
    radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
  background-attachment: fixed;
}

/* Starfield Layer 1 - Fine distant stars */
.stars-layer-1 {
  background-image: 
    radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1.2px 1.2px at 95px 140px, #93c5fd, rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 180px 50px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 260px 210px, #bae6fd, rgba(0,0,0,0)),
    radial-gradient(1.8px 1.8px at 340px 90px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 430px 240px, #7dd3fc, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 520px 120px, #e0f2fe, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 610px 310px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 700px 170px, #bae6fd, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 790px 60px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2.2px 2.2px at 890px 230px, #38bdf8, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 970px 150px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 1070px 290px, #e0f2fe, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 1160px 100px, #7dd3fc, rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 1270px 260px, #ffffff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 1300px 380px;
}

/* Starfield Layer 2 - Brighter and colored stars */
.stars-layer-2 {
  background-image: 
    radial-gradient(1.2px 1.2px at 45px 95px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 145px 280px, #67e8f9, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 310px 80px, #c4b5fd, rgba(0,0,0,0)),
    radial-gradient(1.6px 1.6px at 420px 330px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1.2px 1.2px at 540px 180px, #7dd3fc, rgba(0,0,0,0)),
    radial-gradient(2.2px 2.2px at 670px 50px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 810px 290px, #a5b4fc, rgba(0,0,0,0)),
    radial-gradient(1.8px 1.8px at 920px 190px, #e0f2fe, rgba(0,0,0,0)),
    radial-gradient(1.2px 1.2px at 1050px 40px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 1220px 240px, #38bdf8, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 1200px 420px;
}

/* Star Animations */
@keyframes twinkleSlow {
  0%, 100% { opacity: 0.35; transform: scale(0.98); }
  50% { opacity: 0.95; transform: scale(1.02); }
}

@keyframes twinkleFast {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.85; }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.25), inset 0 0 15px rgba(56, 189, 248, 0.1);
    border-color: rgba(56, 189, 248, 0.3);
  }
  50% {
    box-shadow: 0 0 35px rgba(56, 189, 248, 0.55), inset 0 0 25px rgba(56, 189, 248, 0.25);
    border-color: rgba(56, 189, 248, 0.6);
  }
}

.animate-twinkle-slow {
  animation: twinkleSlow 6s ease-in-out infinite;
}

.animate-twinkle-fast {
  animation: twinkleFast 3.5s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulseGlow 4s ease-in-out infinite;
}

/* Glassmorphism Panels */
.glass-panel {
  background: rgba(8, 16, 36, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-panel-hover {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-panel-hover:hover {
  background: rgba(12, 24, 52, 0.85);
  border-color: rgba(56, 189, 248, 0.4);
  transform: translateY(-5px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 35px -5px rgba(56, 189, 248, 0.25);
}

/* Atmospheric Text Glows */
.glow-text-cyan {
  text-shadow: 0 0 30px rgba(56, 189, 248, 0.5), 0 0 60px rgba(56, 189, 248, 0.2);
}

.glow-text-white {
  text-shadow: 0 2px 25px rgba(255, 255, 255, 0.35);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(2, 4, 10, 0.6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.25);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.55);
}

/* Subtle Chapter Panel Scrollbar */
.chapter-scroll-area {
  scrollbar-width: thin;
  scrollbar-color: rgba(56, 189, 248, 0.3) rgba(2, 4, 10, 0.4);
  overscroll-behavior: contain;
  touch-action: pan-y;
}

.chapter-scroll-area::-webkit-scrollbar {
  width: 5px;
}

.chapter-scroll-area::-webkit-scrollbar-track {
  background: rgba(4, 8, 22, 0.4);
  border-radius: 9999px;
}

.chapter-scroll-area::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.3);
  border-radius: 9999px;
}

.chapter-scroll-area::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.6);
}
`;

  const finalOutput = `${tailwindCSS}\n\n${customSpaceCSS}`;
  
  fs.writeFileSync(path.join(projectRoot, 'app/globals.css'), finalOutput);
  console.log(`Successfully compiled app/globals.css (${finalOutput.length} bytes)!`);
}

generateCompleteCSS().catch(console.error);
