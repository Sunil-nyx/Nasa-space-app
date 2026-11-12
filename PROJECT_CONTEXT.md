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

## 9. Completed Development Tasks (this session & earlier)
- Implemented homepage with mission cards and cinematic styling.
- Added Apollo 17 route with full 3‑D scene, loading overlay, and UI.
- Integrated Tailwind custom CSS via `scripts/build-styles.js`.
- Fixed scrolling bug that hid navigation buttons:
  - Added dedicated scrollable container (`.chapter-scroll-area`).
  - Updated global wheel listener to ignore events from the story panel.
  - Added custom scrollbar styling.
- Refactored `StoryOverlay` to a flex column with sticky header/footer.
- Verified production build (`npm run build`) succeeds.
- Created source‑badge component with NASA attribution link.

## 10. Known Bugs / Open Issues
- **Mobile touch scrolling:** Works on most devices but edge‑case small viewports may clip the footer; further testing recommended.
- **Performance:** Large GLB models cause initial load delay; consider lazy‑loading or LOD in future.
- **Accessibility:** ARIA labels and keyboard navigation are minimal; enhancements planned.
- **Future content:** Additional missions (Opportunity, DART) and richer hotspot interactions are pending.

## 11. Planned Features & Next Steps
- Add Mission pages for Opportunity (Mars) and DART (Dimorphos) with their own 3‑D scenes.
- Implement audio narration and optional subtitles.
- Introduce AR/VR mode using `@react-three/xr`.
- Improve mobile performance (asset compression, progressive loading).
- Enhance accessibility (focus management, screen‑reader support).
- Analytics integration to track student engagement (privacy‑first).
- Optional user‑generated “mission journal” stored locally with `localStorage`.

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
