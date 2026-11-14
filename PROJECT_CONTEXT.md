# SILENT EXPLORERS – Project Context

## 1. Project Overview & Objectives
- **Name:** Silent Explorers – *The Machines Humanity Left Behind*
- **Goal:** Provide an immersive, educational web‑experience that lets middle‑school students explore historic space missions, starting with a realistic 3‑D Apollo 17 lunar environment.
- **Scope:** Single‑page Home + mission‑specific routes built with Next.js App Router, React, Three.js and Tailwind CSS. No backend, authentication, or external databases.

## 2. Technology Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Framework | **Next.js** (App Router) | 16.4.6 |
| UI Library | **React** | 19.3.0 |
| 3‑D Rendering | **three** | ^0.187.0 |
| React‑Three Fiber | **@react-three/fiber** | ^9.8.2 |
| Drei (helpers) | **@react-three/drei** | ^10.7.9 |
| Styling | **Tailwind CSS** | 4.3.3 |
| Types | **TypeScript** | ^5 |
| Linting | **ESLint** (Next) | ^9 |

## 3. Architecture Overview
- **`app/`** – Next.js App Router pages.
  - `layout.tsx` – global layout, imports `globals.css`.
  - `page.tsx` – homepage (cinematic hero, navigation, mission cards).
  - `missions/apollo-17/` – route for the Apollo 17 experience.
    - `page.tsx` – wrapper that mounts the 3‑D Canvas and UI overlays.
    - `ApolloViewer.tsx` – Canvas setup, lighting, model loading, camera controls.
    - `StoryOverlay.tsx` – DOM overlay that displays chapter text, navigation buttons, source badge, etc.
    - Additional components: `CameraController.tsx`, `LunarModule.tsx`, `LunarTerrain.tsx`, `EarthSphere.tsx` – reusable 3‑D pieces.
- **`public/models/`** – GLB assets (e.g., `apollo-lunar-module.glb`).
- **`scripts/build-styles.js`** – custom Tailwind generation and additional CSS (scrollbars, utility classes).
- **`app/globals.css`** – compiled Tailwind output plus project‑specific styles.

## 4. Important Folders & Files
| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Global HTML skeleton, imports `globals.css` and sets font/metadata. |
| `app/globals.css` | Tailwind utilities + custom CSS (scrollbars, `.chapter-scroll-area`). |
| `app/page.tsx` | Home page markup and styling (hero, nav, mission cards). |
| `app/missions/apollo-17/` | All Apollo 17 route assets. |
| `app/missions/apollo-17/ApolloViewer.tsx` | Three.js Canvas, model loading, scene composition. |
| `app/missions/apollo-17/StoryOverlay.tsx` | UI overlay for story panels, navigation, source badge. |
| `scripts/build-styles.js` | Tailwind build script, custom CSS definitions. |
| `public/models/` | Stores GLB files (Apollo Lunar Module, optional terrain meshes). |

## 5. Existing Homepage Features
- Dark space‑themed background with subtle stars.
- Fixed navigation bar (SILENT EXPLORERS, Archive, Missions, About).
- Hero section with dramatic heading *“THE MACHINES WE LEFT BEHIND.”*
- Intro paragraph describing the mission concept.
- Three mission cards (Apollo 17, Opportunity, DART) with hover effects and links to their pages.
- Footer with subtle scrolling animation.
- Fully responsive layout (flex, Tailwind breakpoints).

## 6. Apollo 17 3‑D Environment & Interactions
- **Canvas** uses `@react-three/fiber` with a `Suspense` fallback.
- **Lighting:** Directional sunlight mimicking the Sun, ambient dim lighting, subtle sky color.
- **Lunar Surface:** Procedurally generated terrain with craters and regolith.
- **Earth Sphere:** Small Earth model placed in the distant sky.
- **Spacecraft:** NASA‑sourced GLB of the Apollo Lunar Module positioned on the surface.
- **Hotspots:** Clickable meshes trigger chapter changes via React state.
- **Camera Controls:** Custom `CameraController` enables free orbit, locked cinematic shots per chapter, and smooth transitions.
- **Overlay UI:** Story text, navigation buttons, source‑badge, and a credits disclaimer rendered **outside** the Canvas to avoid React root conflicts.

## 7. Storytelling Structure
- **Five chapters** covering launch, lunar descent, surface operations, return, and legacy.
- Each chapter consists of:
  1. Title & brief narrative.
  2. One or more interactive hotspots.
  3. Navigation “Next Chapter” button.
- Text panels are scrollable (`.chapter-scroll-area`) with custom thin scrollbar.
- State is kept in `StoryOverlay` and passed to `ApolloViewer` to adjust camera presets.

## 8. Design Philosophy & Visual Direction
- Dark navy / black space background with cyan‑accented UI.
- Minimalist glass‑panel style for overlays (blur, semi‑transparent background).
- Subtle glow / atmospheric lighting to evoke a cinematic documentary feel.
- Hover and transition animations for cards, buttons, and 3‑D objects.
- Mobile‑first responsive design; UI scales gracefully on small screens.

## 9. Completed Development Tasks
- **Phase 1 (Apollo 17 Scrolling Issue Resolved):**
  - Identified layout overflow where the right-side artifact selector was a flex-column sibling stealing vertical height, pushing the bottom story panel up to 270px below the viewport on 768px and mobile screens.
  - Decoupled the right-hand artifact selector into an independent floating element (`fixed right-3 sm:right-6 top-1/2 -translate-y-1/2`).
  - Constrained the story panel with dynamic viewport bounds (`max-h-[calc(100dvh-100px)] sm:max-h-[calc(100dvh-90px)]`), keeping the card header (`shrink-0`) and bottom navigation footer (`shrink-0`) permanently visible.
  - Enabled native internal scrolling (`chapter-scroll-area`) on the story body container with `overscroll-contain` and wheel propagation isolation.
  - Removed window-level wheel event listener that hijacked mouse-wheel/trackpad inputs and caused accidental scene jumps, allowing OrbitControls zooming over the 3D canvas and smooth text scrolling over the story card.
  - Verified across all 5 chapters on both 1366 × 768 desktop and 390 × 844 mobile viewports.
- **Phase 2 (DART Featured Story Enhancement):**
  - Elevated the DART mission card with an electric-cyan border, glowing `★ FEATURED MISSION` badge, and prominent Call to Action (`Inspect Featured DART Dispatch →`).
  - Added compelling and accurate copy: 6.1 km/s (14,000 mph) hypersonic kinetic collision with asteroid moonlet Dimorphos on Sept 26, 2022, shifting its orbital period by 33 minutes in humanity's first full-scale planetary defense demonstration (clarifying that Dimorphos was not on a collision course with Earth and was not destroyed).
  - Built a dedicated **Featured Mission Spotlight Section** (`#dart-spotlight`) featuring deep-space telemetry panels and official NASA DART archive links without compromising overall homepage balance.
- **Phase 3 (Opportunity Mars Exploration Experience):**
  - Created `/missions/opportunity` with dynamic client-side WebGL loading and responsive DOM overlays.
  - Downloaded and integrated the official NASA Mars Exploration Rover (MER) GLB 3D model (`public/models/opportunity_rover.glb`, 11.9 MB) with historically accurate winged solar array, Pancam mast, rocker-bogie wheels, robotic arm, and steerable high-gain antenna.
  - Built procedural reddish Martian regolith terrain (`MarsTerrain.tsx`) featuring rolling dunes, Endeavour crater rim walls, scattered basalt rocks, and Opportunity's dual wheel tracks.
  - Built dynamic Martian atmosphere (`MarsSky.tsx`) with suspended dust particles, small sun disk with bluish twilight glow, and a dynamic darkening transition for the June 2018 global dust storm (tau > 10.8).
  - Modeled an interactive sedimentary rock outcrop (`MartianRockOutcrop.tsx`) displaying hematite spherules ("Martian blueberries") formed by ancient groundwater.
  - Implemented 5 curated storytelling chapters for 12–15-year-old students (The 90-Day Promise, The Clue in the Rocks, The Rover That Kept Going, When the Sun Disappeared, The Last Signal).
  - Integrated Mission Journal, Mission Timeline (2003–2019), and NASA MER source badge.
  - Linked the Opportunity card on the homepage to `/missions/opportunity`.
- **Quality Verification:**
  - Build verified (`npm run build`) with zero errors across all static routes (`/`, `/missions/apollo-17`, `/missions/opportunity`).
  - ESLint verified (`npm run lint`) with 0 errors and 0 warnings.
  - Headless browser verification confirmed end-to-end functionality at 1366 × 768 and 390 × 844 viewports.

## 10. Known Bugs / Open Issues
- None remaining for Apollo 17, DART, or Opportunity core experiences.
- Planned future mission expansion: DART dedicated 3D asteroid encounter route.

## 11. Planned Features & Next Steps
- Add dedicated 3D asteroid encounter page for DART (Dimorphos / Didymos).
- Implement audio narration and optional subtitles.
- Introduce AR/VR mode using `@react-three/xr`.
- Analytics integration to track student engagement (privacy-first).
- Optional user-generated "mission journal" stored locally with `localStorage`.

## 12. Running the Project Locally
```bash
# Prerequisites
Node.js 20+ (recommended LTS)
# Install dependencies
npm install
# Build Tailwind & custom CSS (runs automatically before dev/start)
npm run dev   # starts `next dev` on http://localhost:3000
# Production build
npm run build && npm start
```
- The `predev` and `prebuild` scripts automatically execute `scripts/build-styles.js` to generate `globals.css`.
- No environment variables are required for the current features.

## 13. Repository Information
- **GitHub (placeholder):** `https://github.com/your-org/silent-explorers`
- The repository contains the full Next.js source, the `public/models/` assets, and the Tailwind build script.
- Branch `main` holds the production‑ready code; feature branches may be used for new missions.

---
*Document generated by Antigravity in response to the hand‑off request. It reflects the state of the codebase as of 2026‑11‑12.*
