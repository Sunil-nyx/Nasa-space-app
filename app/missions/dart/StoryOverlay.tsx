"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface StoryScene {
  id: number;
  chapter: string;
  title: string;
  hudCoordinates: string;
  dateStr: string;
  intro: string;
  question: string;
  choices: Choice[];
}

export interface Choice {
  id: string;
  label: string;
  icon: string;
  actionType: "camera" | "hotspot" | "story";
  targetId?: string;
  story: string;
  fact: string;
}

export interface HotspotDetail {
  title: string;
  category: string;
  identity: string;
  functionality: string;
  missionSignificance: string;
  specs: { label: string; value: string }[];
  quote: string;
  details: string;
}

// ─────────────────────────────────────────────
// STORY CHAPTERS (WRITTEN FOR AGES 12–15)
// ─────────────────────────────────────────────

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    chapter: "CHAPTER 01 // TWO WORLDS, ONE TARGET",
    title: "Two Worlds, One Target",
    hudCoordinates: "BINARY ASTEROID 65803 DIDYMOS // 11M KM FROM EARTH",
    dateStr: "DISCOVERED: 1996 & 2003 — BINARY NEAR-EARTH SYSTEM",
    intro:
      "Deep in interplanetary space, 11 million kilometers from Earth, two ancient cosmic rocks dance together in a silent gravitational waltz. The larger world is Didymos, an asteroid the size of a mountain (780 meters across) spinning like a giant top. Orbiting tightly around it is a smaller moonlet named Dimorphos, a loose rubble pile roughly the size of the Great Pyramid of Giza (160 meters across). Neither posed any danger of hitting Earth—which made them the ultimate cosmic laboratory.",
    question: "Why did humanity choose this harmless pair for our first planetary defense experiment?",
    choices: [
      {
        id: "inspect-dimorphos",
        label: "TARGET: DIMORPHOS",
        icon: "⬡",
        actionType: "hotspot",
        targetId: "dimorphos",
        story:
          "Dimorphos is a 'rubble pile' asteroid—not a solid boulder of iron or rock, but thousands of jagged rocks and boulders held together by weak gravity like a floating gravel pit. Because it orbited Didymos every 11 hours and 55 minutes, scientists could measure even the tiniest change in its orbit with Earth-based telescopes.",
        fact:
          "VERIFIED FACT: Dimorphos means 'having two forms' in Greek. It was named because it would soon be reshaped by humanity's impact.",
      },
      {
        id: "inspect-didymos",
        label: "PRIMARY: DIDYMOS",
        icon: "◎",
        actionType: "hotspot",
        targetId: "didymos",
        story:
          "Didymos is five times wider than its moonlet and spins once every 2.26 hours. That rapid spin throws dust and pebbles towards its equator, creating a distinct diamond-shaped ridge. DART was aimed exclusively at the moonlet Dimorphos, ensuring Didymos's orbit around the Sun would never be knocked towards Earth.",
        fact:
          "VERIFIED FACT: Targeting the moonlet was crucial for safety: changing Dimorphos's orbit around Didymos had zero chance of pushing the binary pair onto a collision course with Earth.",
      },
      {
        id: "why-planetary-defense",
        label: "THE 66M-YEAR LESSON",
        icon: "☄",
        actionType: "story",
        story:
          "66 million years ago, a 10-kilometer asteroid struck the Yucatan Peninsula, ending the reign of the dinosaurs. Dinosaurs had no space telescopes and no propulsion systems. Planetary defense is humanity's insurance policy: the science of finding threatening asteroids decades in advance and gently nudging them off course.",
        fact:
          "VERIFIED FACT: An asteroid as small as Dimorphos (160m) could destroy an entire metropolitan city and cause hundreds of billions of dollars in regional devastation if it struck Earth.",
      },
    ],
  },

  {
    id: 2,
    chapter: "CHAPTER 02 // THE SPACECRAFT BUILT TO CRASH",
    title: "The Spacecraft Built to Crash",
    hudCoordinates: "DART BUS // 610 KG KINETIC IMPACTOR",
    dateStr: "LAUNCH: NOVEMBER 24, 2021 — VANDENBERG SFB",
    intro:
      "Most spacecraft are built with gentle landing legs, parachutes, and heat shields designed to keep their delicate cameras intact. DART (Double Asteroid Redirection Test) was different. Built by Johns Hopkins Applied Physics Laboratory and NASA, DART was a precision kinetic impactor—a 610-kilogram robotic projectile designed to travel across the solar system for ten months and deliberately smash into an asteroid at extreme speed.",
    question: "What revolutionary technologies enabled a spacecraft to ram a moving target millions of kilometers away?",
    choices: [
      {
        id: "inspect-draco",
        label: "DRACO EYE",
        icon: "👁",
        actionType: "hotspot",
        targetId: "draco",
        story:
          "DART carried only one science instrument: DRACO (Didymos Reconnaissance and Asteroid Camera for Optical navigation). Featuring a 20.8-centimeter aperture telescope, DRACO took high-resolution pictures of the approaching asteroids and fed them directly into the guidance computer to steer the spacecraft.",
        fact:
          "VERIFIED FACT: In the final four hours, DRACO streamed raw images back to Earth once every second over an 11-million-kilometer radio link.",
      },
      {
        id: "inspect-smartnav",
        label: "SMART NAV AI",
        icon: "🧠",
        actionType: "hotspot",
        targetId: "bus",
        story:
          "Because radio signals took 38 seconds to travel between Earth and DART, human controllers could not pilot the spacecraft with a joystick. In the final hours, SMART Nav (Small-body Maneuvering Autonomous Real-Time Navigation) took full control. Using optical tracking algorithms, it distinguished Dimorphos from Didymos and autonomously fired hydrazine thrusters to stay locked on target.",
        fact:
          "VERIFIED FACT: Dimorphos was only a single pixel in DRACO's field of view until roughly an hour before impact.",
      },
      {
        id: "inspect-rosa",
        label: "ROSA WINGS",
        icon: "⚡",
        actionType: "hotspot",
        targetId: "rosa",
        story:
          "DART was powered by two Roll-Out Solar Arrays (ROSA). Instead of rigid panels that fold on hinges, ROSA arrays unroll like tape measures from compact carbon composite cylinders. Stretching 8.5 meters on each side, they generated 6.6 kilowatts of electrical power to run the spacecraft and its experimental NEXT-C ion engine.",
        fact:
          "VERIFIED FACT: ROSA technology proved so efficient that scaled-up versions are now installed on the International Space Station to boost its power grid.",
      },
      {
        id: "inspect-liciacube",
        label: "LICIACUBE COMPANION",
        icon: "🛰",
        actionType: "hotspot",
        targetId: "liciacube",
        story:
          "Fifteen days before impact, DART released a toaster-sized passenger: LICIACube, an Italian Space Agency 6-unit CubeSat. LICIACube drifted behind DART on a safe flyby path, using two specialized cameras (LUKE and LEIA) to photograph the impact plume and crater from just 55 kilometers away without crashing.",
        fact:
          "VERIFIED FACT: LICIACube captured humanity's first close-up images of an asteroid impact plume in deep space.",
      },
    ],
  },

  {
    id: 3,
    chapter: "CHAPTER 03 // THE FINAL APPROACH",
    title: "The Final Approach",
    hudCoordinates: "RELATIVE VELOCITY: 6.1 KM/S // 22,530 KM/H",
    dateStr: "SEPTEMBER 26, 2022 — 23:10 UTC",
    intro:
      "On September 26, 2022, DART entered its terminal approach phase. Hurtling through the vacuum of space at 6.1 kilometers per second (over 22,000 kilometers per hour or 14,000 mph), Dimorphos grew from a faint speck of light into an ominous, boulder-strewn alien world. Millions of people around Earth watched NASA's live stream in breathless silence as pictures updated second by second.",
    question: "What did DART see in its final seconds before communication went permanently dark?",
    choices: [
      {
        id: "speed-of-bullet",
        label: "HYPER-VELOCITY",
        icon: "⚡",
        actionType: "camera",
        story:
          "At 6.1 km/s, DART was traveling roughly nine times faster than a rifle bullet. At that extreme speed, covering the distance from New York to London would take less than 15 minutes. The kinetic energy carried by the 610-kg spacecraft equaled about 3 tons of TNT explosives.",
        fact:
          "VERIFIED FACT: At hypervelocity, material behaves like fluid on impact; the kinetic energy instantly vaporizes and shatters rock on contact.",
      },
      {
        id: "boulder-field",
        label: "SEA OF BOULDERS",
        icon: "🪨",
        actionType: "hotspot",
        targetId: "dimorphos",
        story:
          "As DART closed to within a few kilometers, DRACO revealed that Dimorphos was not smooth or sandy. It was covered in dozens of jagged boulders, some as large as school buses, resting loosely on top of one another. The landscape looked like a colossal pile of rubble suspended in the void.",
        fact:
          "VERIFIED FACT: Scientists had never seen a rubble pile asteroid up close at such razor-sharp resolution before DART's final frames.",
      },
      {
        id: "the-last-pixel",
        label: "THE LAST FULL FRAME",
        icon: "📡",
        actionType: "story",
        story:
          "DART's penultimate full image was taken at an altitude of just 12 kilometers (2 seconds before impact), showing rocks and gravel just centimeters across. Its final partial transmission captured the top portion of a frame before the antenna severed, leaving a red 'Lethal Signal Loss' screen in mission control.",
        fact:
          "VERIFIED FACT: Mission control erupted in cheers the moment the video feed froze and went red: loss of signal meant DART hit the exact center of Dimorphos!",
      },
    ],
  },

  {
    id: 4,
    chapter: "CHAPTER 04 // THE IMPACT",
    title: "The Kinetic Impact",
    hudCoordinates: "KINETIC IMPACT POINT // VAPORIZATION IN VACUUM",
    dateStr: "SEPTEMBER 26, 2022 — 23:14 UTC (GROUND ZERO)",
    intro:
      "At 23:14 UTC, DART slammed into the heart of Dimorphos between two massive boulders. There was no atmospheric roar and no fiery explosion—in the vacuum of space, kinetic energy instantly vaporized DART's metal frame into a white-hot flash of plasma, gouging a massive crater and blasting millions of kilograms of rock and dust into space in a glowing cone of debris.",
    question: "How did a small robot punch a massive punch into an asteroid?",
    choices: [
      {
        id: "kinetic-deflection",
        label: "PHYSICS OF IMPACT",
        icon: "💥",
        actionType: "hotspot",
        targetId: "impact-site",
        story:
          "When DART struck Dimorphos head-on, it didn't just transfer its own momentum. The asteroid's loose rubble was excavated violently and sprayed backwards into space like rocket exhaust. This debris spray acted like a secondary rocket thruster, multiplying DART's push by a factor of 3.6 (the momentum enhancement factor, beta).",
        fact:
          "VERIFIED FACT: Over 1 million kilograms (1,000 tons) of rock and dust were blown off Dimorphos—enough to fill dozens of train railcars!",
      },
      {
        id: "ejecta-tail",
        label: "THE 10,000-KM TAIL",
        icon: "☄",
        actionType: "camera",
        story:
          "Over the following days, the sun's solar wind and radiation pressure pushed the ejected debris into a luminous comet-like tail extending more than 10,000 kilometers behind the asteroid system. Hubble, James Webb Space Telescope, and amateur astronomers worldwide photographed this glowing tail for months.",
        fact:
          "VERIFIED FACT: Both the Hubble and James Webb Space Telescopes observed the impact simultaneously—their first coordinated target observation.",
      },
      {
        id: "boulder-ejection",
        label: "FLOATING GIANTS",
        icon: "🪨",
        actionType: "story",
        story:
          "Hubble photographs later revealed that the collision threw at least 37 massive boulders (ranging from 1 to 7 meters in diameter) clean off Dimorphos into independent orbits around Didymos. These colossal rocks are slowly drifting away at speeds of 1 kilometer per hour.",
        fact:
          "VERIFIED FACT: The kinetic collision was so powerful that it likely reshaped Dimorphos from an oblong ball into a flattened triaxial ellipsoid.",
      },
    ],
  },

  {
    id: 5,
    chapter: "CHAPTER 05 // DID IT WORK?",
    title: "Did It Work?",
    hudCoordinates: "ORBITAL PERIOD SHIFT: -33 MINUTES // SUCCESS",
    dateStr: "RESULTS CONFIRMED: OCTOBER 11, 2022 — NASA TELECON",
    intro:
      "Before impact, NASA established a baseline for mission success: shortening Dimorphos's 11-hour-and-55-minute orbit around Didymos by at least 73 seconds. On October 11, 2022, NASA Administrator Bill Nelson announced the definitive telescope measurements. The world was stunned: DART had shortened the orbit by an astonishing 33 minutes—exceeding the minimum requirement by more than 25 times!",
    question: "What does this triumph mean for the future survival of human civilization?",
    choices: [
      {
        id: "orbit-shift-data",
        label: "THE 33-MINUTE SHIFT",
        icon: "⏱",
        actionType: "camera",
        story:
          "Dimorphos's orbital period dropped from 11 hours 55 minutes down to 11 hours 22 minutes. The moonlet now orbits roughly 37 meters closer to Didymos. Because DART hit in the direction opposite to Dimorphos's orbital motion, it slowed the moon down, pulling its orbit inward.",
        fact:
          "VERIFIED FACT: An orbital change of 33 minutes translates to a trajectory deflection that, given years of advance warning, would steer a threatening asteroid thousands of miles away from Earth.",
      },
      {
        id: "upcoming-hera",
        label: "ESA HERA MISSION",
        icon: "🛰",
        actionType: "hotspot",
        targetId: "impact-site",
        story:
          "The DART story isn't over. In October 2024, the European Space Agency launched Hera, a detective spacecraft heading to Didymos. Arriving in late 2026, Hera will measure the exact mass of Dimorphos, inspect the impact crater up close, and deploy two CubeSats to land on the asteroid's surface.",
        fact:
          "VERIFIED FACT: Hera's measurements will turn DART's bold kinetic experiment into a repeatable, calibrated planetary defense technique for generations to come.",
      },
      {
        id: "planetary-shield",
        label: "HUMANITY'S SHIELD",
        icon: "🛡",
        actionType: "story",
        story:
          "For the first time in 4.5 billion years of planetary history, an intelligent species living on Earth deliberately altered the orbit of a celestial body in the solar system. We are no longer defenseless against cosmic collisions: we have demonstrated that with technology and cooperation, humanity can protect our home planet.",
        fact:
          "VERIFIED FACT: 'This mission shows that NASA is trying to be ready for whatever the universe throws at us.' — NASA Administrator Bill Nelson.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// DISCOVERY JOURNAL DOSSIERS
// ─────────────────────────────────────────────

export const HOTSPOT_DATA: Record<string, HotspotDetail> = {
  draco: {
    title: "DRACO Reconnaissance Camera",
    category: "SCIENTIFIC PAYLOAD // OPTICAL NAVIGATION",
    identity:
      "Didymos Reconnaissance and Asteroid Camera for Optical navigation (DRACO).",
    functionality:
      "High-resolution optical telescope based on New Horizons' LORRI imager. Features a 20.8-cm aperture Ritchey-Chretien Cassegrain optical system coupled to a 4-megapixel CMOS sensor. Streamed live images to Earth and fed real-time optical data to the SMART Nav guidance processor.",
    missionSignificance:
      "Provided the sole eyes of DART during approach. The camera operated autonomously under extreme dynamic range, tracking Dimorphos from a single sub-pixel faint point to filling the entire field of view with boulders seconds prior to impact.",
    specs: [
      { label: "Aperture", value: "20.8 cm (f/12.6)" },
      { label: "Field of View", value: "0.29° × 0.29°" },
      { label: "Sensor", value: "2048 × 2048 CMOS" },
      { label: "Image Cadence", value: "1 frame per second" },
    ],
    quote:
      "“DRACO’s final images showed us an alien world in breathtaking detail right up to the moment of kinetic collision.”",
    details:
      "The last full image returned by DRACO was snapped at an altitude of approximately 12 kilometers (about 2 seconds before impact) with a ground resolution of less than 3 centimeters per pixel.",
  },

  rosa: {
    title: "ROSA Roll-Out Solar Arrays",
    category: "SPACECRAFT SUBSYSTEM // POWER GENERATION",
    identity:
      "Twin 8.5-meter deployable Roll-Out Solar Arrays (ROSA) with embedded Transformational Solar Array concentrator cells.",
    functionality:
      "Unrolled from cylindrical composite mandrels upon reaching orbit. Generates approximately 6.6 kW of power at 1 AU to power the spacecraft bus, guidance avionics, communications, and the NEXT-C ion engine demonstration.",
    missionSignificance:
      "Demonstrated next-generation flexible solar array technology in deep space. ROSA arrays are substantially lighter and package into one-fourth the volume of traditional rigid solar panels, making interplanetary exploration faster and more capable.",
    specs: [
      { label: "Total Span", value: "19.0 meters (tip-to-tip)" },
      { label: "Wing Length", value: "8.5 meters each" },
      { label: "Power Output", value: "6.6 kW (at 1 AU)" },
      { label: "Technology", value: "Carbon-fiber roll-out booms" },
    ],
    quote:
      "“Flexible roll-out wings delivered the massive electrical power required for high-bandwidth telemetry and ion propulsion.”",
    details:
      "The experimental concentrator solar cells on the wing tips tested photovoltaic performance under deep space radiation conditions.",
  },

  bus: {
    title: "Main Bus & SMART Nav Guidance",
    category: "AVIONICS // AUTONOMOUS GUIDANCE SYSTEM",
    identity:
      "Primary hexagonal aluminum spacecraft structure, internal hydrazine propellant tanks, avionics deck, and SMART Nav processor.",
    functionality:
      "Hosted the central flight computer executing the Small-body Maneuvering Autonomous Real-Time Navigation (SMART Nav) algorithms. In the terminal phase, SMART Nav detected Dimorphos, calculated orbit offsets, and commanded reaction control thrusters without human intervention.",
    missionSignificance:
      "Enabled hitting a 160-meter asteroid moving at 6.1 km/s with an Earth round-trip light time of 76 seconds. Without autonomous AI navigation, intercepting the target would have been physically impossible.",
    specs: [
      { label: "Dry Mass", value: "550 kg (610 kg wet at launch)" },
      { label: "Dimensions", value: "1.2 m × 1.3 m × 1.3 m" },
      { label: "Reaction Control", value: "12 Hydrazine Monopropellant Thrusters" },
      { label: "Autonomy", value: "SMART Nav Optical Tracking" },
    ],
    quote:
      "“With an 11-million-kilometer radio lag, SMART Nav had to pilot the final 4 hours entirely on its own.”",
    details:
      "The bus also carried sun sensors, star trackers, and redundant inertial measurement units for three-axis stabilization throughout cruise.",
  },

  antenna: {
    title: "High-Gain RLSA Dish Antenna",
    category: "TELECOMMUNICATIONS // DEEP SPACE NETWORK",
    identity:
      "Radial Line Slot Array (RLSA) high-gain antenna operating in the X-band frequency range.",
    functionality:
      "Maintained ultra-reliable high-bandwidth radio communications with NASA's Deep Space Network (DSN) antennas in Goldstone, Madrid, and Canberra. Transmitted DRACO images in real-time right into mission control.",
    missionSignificance:
      "Transmitted the live video stream that allowed millions of people on Earth to witness the final seconds of DART's mission as it happened.",
    specs: [
      { label: "Type", value: "Radial Line Slot Array (RLSA)" },
      { label: "Bandwidth", value: "X-Band (8.4 GHz)" },
      { label: "Gain", value: "~32 dBi" },
      { label: "DSN Station Link", value: "70-meter dish at Goldstone" },
    ],
    quote:
      "“The RLSA antenna broadcasted every frame up to the final millisecond before impact severed the feed.”",
    details:
      "RLSA antennas provide high RF gain with a very flat profile, saving vital mass and volume inside the launch payload fairing.",
  },

  "next-c": {
    title: "NEXT-C Ion Propulsion System",
    category: "PROPULSION // DEMONSTRATION ENGINE",
    identity:
      "NASA Evolutionary Xenon Thruster - Commercial (NEXT-C) gridded electrostatic ion propulsion engine.",
    functionality:
      "Ionizes xenon propellant and accelerates ions electrostatically through charged grids at exhaust velocities exceeding 40 km/s, producing continuous high-efficiency low thrust.",
    missionSignificance:
      "Demonstrated commercial ion engine capabilities during deep space cruise, validating the engine for future multi-year planetary exploration and asteroid rendezvous missions.",
    specs: [
      { label: "Specific Impulse (Isp)", value: "4,190 seconds" },
      { label: "Maximum Thrust", value: "236 millinewtons" },
      { label: "Propellant", value: "Xenon gas" },
      { label: "Input Power", value: "up to 6.9 kW" },
    ],
    quote:
      "“Ion engines provide extraordinary fuel efficiency, opening up the outer solar system for future spacecraft.”",
    details:
      "While DART used hydrazine thrusters for terminal maneuvering, the NEXT-C engine fired during cruise to prove performance in the deep-space environment.",
  },

  liciacube: {
    title: "LICIACube Companion CubeSat",
    category: "ACCOMPANYING PROBE // DEPLOYED OBSERVER",
    identity:
      "Light Italian CubeSat for Imaging of Asteroids (LICIACube), built by the Italian Space Agency (ASI).",
    functionality:
      "Autonomous 6U CubeSat deployed 15 days before impact. Carried two cameras: LEIA (narrow-angle panchromatic) and LUKE (wide-angle RGB color). Passed Dimorphos 3 minutes after impact at a distance of 55 km.",
    missionSignificance:
      "Photographed the kinetic collision plume, shockwave, and non-impact side of Dimorphos, transmitting crucial visual confirmation that DART struck dead-center.",
    specs: [
      { label: "Form Factor", value: "6U CubeSat (~14 kg)" },
      { label: "Deploy Date", value: "Sept 11, 2022 (15 days pre-impact)" },
      { label: "Flyby Altitude", value: "55 kilometers" },
      { label: "Cameras", value: "LEIA (black & white), LUKE (color)" },
    ],
    quote:
      "“LICIACube gave humanity a front-row seat to the debris plume blasting from the impact crater.”",
    details:
      "LICIACube operated autonomously during its high-speed flyby, tracking the debris cloud without any real-time ground control.",
  },

  didymos: {
    title: "Asteroid (65803) Didymos",
    category: "TARGET SYSTEM // PRIMARY ASTEROID",
    identity:
      "Sub-kilometer binary asteroid discovered in 1996 by Spacewatch at Kitt Peak. Named after the Greek word for 'twin'.",
    functionality:
      "Gravitational anchor of the binary system. Rotates rapidly once every 2.26 hours, causing equatorial ridge bulging from centrifugal acceleration of surface regolith.",
    missionSignificance:
      "Served as the reference primary. Because Didymos was unaffected by DART's collision with Dimorphos, its sun-orbiting trajectory remained unchanged while Dimorphos's local orbit shifted.",
    specs: [
      { label: "Mean Diameter", value: "780 meters (~0.5 miles)" },
      { label: "Rotation Period", value: "2.2600 hours" },
      { label: "Density", value: "2,100 kg/m³" },
      { label: "Spectral Type", value: "S-type (silicate)" },
    ],
    quote:
      "“Didymos spins so fast that rocks at its equator are almost floating off into space.”",
    details:
      "Didymos and Dimorphos have been studied with radar and ground-based optical telescopes since 2003, giving scientists an extraordinarily accurate baseline before DART arrived.",
  },

  dimorphos: {
    title: "Asteroid Moonlet Dimorphos",
    category: "TARGET SYSTEM // KINETIC IMPACT TARGET",
    identity:
      "Secondary moonlet orbiting Didymos at a distance of 1.2 kilometers. Discovered in 2003 by Petr Pravec.",
    functionality:
      "Oblong rubble pile held together by fragile gravitational cohesion. Pre-impact orbital period around Didymos was 11 hours, 55 minutes, and 17 seconds.",
    missionSignificance:
      "The designated collision target for the world's first planetary defense test. Altering its orbit proved that humanity can divert hazardous asteroids.",
    specs: [
      { label: "Dimensions", value: "177 m × 174 m × 116 m" },
      { label: "Pre-Impact Orbit", value: "11 hours 55 minutes" },
      { label: "Post-Impact Orbit", value: "11 hours 22 minutes" },
      { label: "Orbital Shift", value: "-33 minutes (-32 min 42 s)" },
    ],
    quote:
      "“Dimorphos is not a solid rock, but a floating cosmic gravel heap that was radically reshaped by DART.”",
    details:
      "The impact altered Dimorphos's orbital period by 33 minutes and caused an estimated 10-20 meter excavation crater and global deformation.",
  },

  "impact-site": {
    title: "Ground Zero // Crater & Ejecta Site",
    category: "IMPACT PHYSICS // KINETIC CRATERING",
    identity:
      "Impact Ground Zero on Dimorphos between two massive surface boulders.",
    functionality:
      "Site where 610 kg of spacecraft aluminum, electronics, and propellant collided at 6.1 km/s, transferring ~10 gigajoules of kinetic energy.",
    missionSignificance:
      "Excavated over 1,000 tonnes of asteroid rock into space. The momentum enhancement factor (beta = 3.6) proved that ejected rubble acts like a natural rocket, amplifying the push on the asteroid.",
    specs: [
      { label: "Impact Velocity", value: "6.14 km/s (22,100 km/h)" },
      { label: "Kinetic Energy", value: "~10.8 Gigajoules (~2.6 tons TNT)" },
      { label: "Momentum Enhancement (β)", value: "2.2 to 4.9 (best estimate ~3.6)" },
      { label: "Excavated Mass", value: "> 1,000,000 kilograms" },
    ],
    quote:
      "“The debris blasting away from the crater acted like rocket thrust, pushing Dimorphos far harder than DART alone.”",
    details:
      "ESA's Hera spacecraft will arrive in late 2026 to inspect this exact crater, measure its precise depth and diameter, and reveal the interior structure of Dimorphos.",
  },
};

// ─────────────────────────────────────────────
// COMPONENT PROPS
// ─────────────────────────────────────────────

interface StoryOverlayProps {
  currentScene: number;
  onSelectScene: (id: number) => void;
  activeHotspot: string | null;
  onSelectHotspot: (id: string) => void;
  onCloseHotspot: () => void;
  freeOrbit: boolean;
  onToggleFreeOrbit: () => void;
  // Chapter 4 Impact Controls
  impactProgress: number;
  onImpactProgressChange: (p: number) => void;
  isImpactPlaying: boolean;
  onToggleImpactPlay: () => void;
  onReplayImpact: () => void;
  // Chapter 5 Orbit Shift Comparison
  orbitShiftComparison: boolean;
  onToggleOrbitShift: () => void;
}

export function StoryOverlay({
  currentScene,
  onSelectScene,
  activeHotspot,
  onSelectHotspot,
  onCloseHotspot,
  freeOrbit,
  onToggleFreeOrbit,
  impactProgress,
  onImpactProgressChange,
  isImpactPlaying,
  onToggleImpactPlay,
  onReplayImpact,
  orbitShiftComparison,
  onToggleOrbitShift,
}: StoryOverlayProps) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState<boolean>(false);
  const [showJournal, setShowJournal] = useState<boolean>(false);

  const scene = STORY_SCENES.find((s) => s.id === currentScene) || STORY_SCENES[0];
  const activeChoice = scene.choices.find((c) => c.id === selectedChoiceId) || null;
  const hotspot = activeHotspot ? HOTSPOT_DATA[activeHotspot] : null;

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoiceId(choice.id);
    if (choice.targetId) {
      onSelectHotspot(choice.targetId);
    }
  };

  const handleSetScene = (id: number) => {
    setSelectedChoiceId(null);
    onCloseHotspot();
    onSelectScene(id);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-3 sm:p-6 overflow-hidden">
      {/* ── TOP NAVIGATION BAR ─────────────────────────────────── */}
      <header className="flex items-start justify-between gap-3 w-full shrink-0">
        {/* Left: Mission Branding & Breadcrumb */}
        <div className="flex flex-col gap-1 pointer-events-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest bg-cyan-950/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 w-fit"
          >
            ← ALL MISSIONS
          </Link>
          <div className="mt-1">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              DART
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 tracking-widest uppercase">
                KINETIC DEFENSE
              </span>
            </h1>
            <p className="text-[11px] font-mono text-slate-400 tracking-wider hidden sm:block">
              {scene.hudCoordinates}
            </p>
          </div>
        </div>

        {/* Right: Actions, Journal, Timeline & Official NASA Badge */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Mission Journal Button */}
          <button
            onClick={() => setShowJournal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-slate-200 transition-all cursor-pointer backdrop-blur-md shadow-lg"
          >
            <span className="text-cyan-400">📖</span>
            <span className="hidden sm:inline">DISCOVERY</span> JOURNAL
          </button>

          {/* Timeline Button */}
          <button
            onClick={() => setShowTimeline(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-slate-200 transition-all cursor-pointer backdrop-blur-md shadow-lg"
          >
            <span className="text-cyan-400">⏳</span>
            TIMELINE
          </button>

          {/* Free Camera Toggle */}
          <button
            onClick={onToggleFreeOrbit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer backdrop-blur-md shadow-lg ${
              freeOrbit
                ? "bg-cyan-500 text-slate-950 border-cyan-300 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "bg-black/60 hover:bg-cyan-950/60 border-cyan-500/30 text-slate-200"
            }`}
          >
            <span>🎥</span>
            <span className="hidden sm:inline">{freeOrbit ? "LOCK CAM" : "FREE CAM"}</span>
          </button>

          {/* NASA Mission Source Badge (Original styling, opens official NASA DART page) */}
          <a
            href="https://science.nasa.gov/mission/dart/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open official NASA DART mission records in new tab"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#031526]/85 border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_22px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
          >
            {/* Original Orbital Symbol SVG */}
            <svg
              className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
            </svg>
            <div className="text-left font-mono">
              <div className="text-[9px] uppercase tracking-wider text-cyan-400 font-semibold leading-none">
                NASA MISSION SOURCE
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-200 group-hover:text-cyan-200 flex items-center gap-1 leading-tight mt-0.5">
                OFFICIAL RECORDS <span className="text-cyan-400">↗</span>
              </div>
            </div>
          </a>
        </div>
      </header>

      {/* ── CHAPTER 4 IMPACT CONTROL BAR (When on Chapter 4) ───── */}
      {currentScene === 4 && (
        <div className="pointer-events-auto self-center sm:self-end mt-2 mb-2 p-3 sm:p-4 rounded-2xl bg-[#031526]/90 border border-cyan-400/40 backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.25)] flex flex-col gap-2.5 max-w-sm w-full">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              IMPACT SEQUENCE PLAYBACK
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {(impactProgress * 100).toFixed(0)}%
            </span>
          </div>

          {/* Progress scrubber */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={impactProgress}
            onChange={(e) => onImpactProgressChange(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={onToggleImpactPlay}
              className={`flex-1 py-1.5 px-3 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                isImpactPlaying
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/50 hover:bg-amber-500/30"
                  : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
              }`}
            >
              {isImpactPlaying ? "⏸ Pause" : "▶ Play Sequence"}
            </button>

            <button
              onClick={onReplayImpact}
              className="py-1.5 px-3 rounded-lg font-mono text-xs uppercase bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-cyan-400 transition-all cursor-pointer"
            >
              🔄 Replay
            </button>
          </div>
        </div>
      )}

      {/* ── CHAPTER 5 ORBIT SHIFT TOGGLE (When on Chapter 5) ───── */}
      {currentScene === 5 && (
        <div className="pointer-events-auto self-center sm:self-end mt-2 mb-2 p-3 sm:p-4 rounded-2xl bg-[#031526]/90 border border-emerald-400/40 backdrop-blur-xl shadow-[0_0_35px_rgba(16,185,129,0.2)] flex flex-col gap-2.5 max-w-sm w-full">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ORBITAL DEFLECTION
            </span>
            <span className="text-emerald-300 font-mono text-[11px] font-bold">
              -33 MIN SHIFT
            </span>
          </div>

          <div className="text-[11px] text-slate-300 font-sans leading-relaxed">
            Toggle orbital paths to view pre-impact orbit (11h 55m) vs post-impact shifted orbit (11h 22m).
          </div>

          <button
            onClick={onToggleOrbitShift}
            className={`w-full py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              orbitShiftComparison
                ? "bg-emerald-500 text-slate-950 border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "bg-black/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/40"
            }`}
          >
            {orbitShiftComparison ? "✓ SHOWING DEFLECTED ORBIT (-33 MIN)" : "COMPARE ORBITS (BEFORE / AFTER)"}
          </button>
        </div>
      )}

      {/* ── BOTTOM CHAPTER CARD (FIXED HEADER & FOOTER, SCROLLABLE BODY) ── */}
      <footer className="pointer-events-auto max-w-xl w-full self-start">
        <div className="rounded-2xl backdrop-blur-2xl bg-[#031526]/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col max-h-[calc(100dvh-120px)] sm:max-h-[min(500px,calc(100dvh-140px))]">
          {/* Header inside Chapter Card */}
          <div className="p-3.5 sm:px-6 sm:py-3.5 border-b border-white/[0.08] bg-[#020b14]/90 shrink-0">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase mb-1">
              <span>{scene.chapter}</span>
              <span className="text-slate-400 font-normal">{scene.dateStr}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {scene.title}
            </h2>
          </div>

          {/* Scrollable Story Body */}
          <div
            className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed"
            onWheel={(e) => e.stopPropagation()}
          >
            <p className="font-light">{scene.intro}</p>

            {/* Prompt Question */}
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs font-medium">
              💡 <span className="font-semibold text-white">Investigate:</span> {scene.question}
            </div>

            {/* Interactive Decision / Exploration Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {scene.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceClick(choice)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 font-bold border-cyan-300 shadow-[0_0_14px_rgba(56,189,248,0.35)]"
                        : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-cyan-400/50 text-slate-200"
                    }`}
                  >
                    <span>{choice.icon}</span>
                    <span>{choice.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Discovery Content */}
            {activeChoice && (
              <div className="mt-3 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/30 space-y-2.5">
                <div className="flex items-center justify-between font-mono text-[10px] text-cyan-300 uppercase tracking-wider">
                  <span className="font-bold flex items-center gap-1">
                    <span>{activeChoice.icon}</span> {activeChoice.label}
                  </span>
                  <span>RECORD UNLOCKED</span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed font-normal">
                  {activeChoice.story}
                </p>
                <div className="pt-2 border-t border-cyan-500/20">
                  <p className="text-cyan-200 text-xs leading-relaxed italic">
                    {activeChoice.fact}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation Bar */}
          <div className="p-3 sm:px-6 sm:py-3.5 border-t border-white/[0.08] bg-[#020b14]/95 shrink-0 flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={() => handleSetScene(Math.max(1, currentScene - 1))}
              disabled={currentScene === 1}
              className={`px-3 sm:px-4 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                currentScene === 1
                  ? "opacity-30 border-white/5 cursor-not-allowed text-slate-500"
                  : "bg-white/5 border-white/10 hover:border-cyan-400/50 text-slate-200 active:scale-95"
              }`}
            >
              ← Previous
            </button>

            <span className="font-mono text-xs text-slate-400 font-semibold tracking-wider">
              CH. {currentScene} / {STORY_SCENES.length}
            </span>

            <button
              onClick={() => handleSetScene(Math.min(STORY_SCENES.length, currentScene + 1))}
              disabled={currentScene === STORY_SCENES.length}
              className={`px-3.5 sm:px-5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold border transition-all cursor-pointer ${
                currentScene === STORY_SCENES.length
                  ? "opacity-40 border-white/5 cursor-not-allowed text-slate-500"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:brightness-110 active:scale-95"
              }`}
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </footer>

      {/* ── ARTIFACT DOSSIER MODAL ────────────────────────────── */}
      {hotspot && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-xl w-full rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#031526] border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseHotspot}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase mb-1">
              {hotspot.category}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{hotspot.title}</h3>

            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-400/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold block mb-1">
                  1. Identification
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">{hotspot.identity}</p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-400/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold block mb-1">
                  2. Operational Function
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">{hotspot.functionality}</p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-400/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold block mb-1">
                  3. Mission Significance
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">{hotspot.missionSignificance}</p>
              </div>
            </div>

            <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 italic text-slate-300 text-xs mb-5 bg-cyan-950/15 leading-relaxed">
              {hotspot.quote}
            </blockquote>

            <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-xl bg-black/40 border border-white/5">
              {hotspot.specs.map((s, i) => (
                <div key={i} className="text-xs font-mono">
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider mb-0.5">{s.label}</div>
                  <div className="text-slate-200 font-semibold text-[11px]">{s.value}</div>
                </div>
              ))}
            </div>

            <button
              onClick={onCloseHotspot}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}

      {/* ── DISCOVERY JOURNAL MODAL ──────────────────────────── */}
      {showJournal && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#031526] border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.25)] relative">
            <button
              onClick={() => setShowJournal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase mb-2">
              DART SCIENTIFIC & TECHNICAL ARCHIVE
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">Discovery Journal</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {Object.entries(HOTSPOT_DATA).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => {
                    setShowJournal(false);
                    onSelectHotspot(key);
                  }}
                  className="text-left p-3.5 rounded-xl bg-white/5 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer group"
                >
                  <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    {data.category}
                  </div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-200 mb-1">
                    {data.title}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{data.functionality}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowJournal(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Return to Mission
            </button>
          </div>
        </div>
      )}

      {/* ── MISSION TIMELINE MODAL ───────────────────────────── */}
      {showTimeline && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#031526] border border-cyan-500/25 shadow-[0_0_80px_rgba(6,182,212,0.2)] relative">
            <button
              onClick={() => setShowTimeline(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase mb-2">
              HISTORICAL MISSION TELEMETRY // 2021–2026
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">DART Mission Timeline</h3>

            <div className="space-y-6 border-l-2 border-cyan-500/30 pl-6 ml-2 font-mono">
              <div>
                <div className="text-xs text-cyan-400 font-bold">NOVEMBER 24, 2021 — 06:21 UTC</div>
                <div className="text-sm text-white font-semibold mb-1">Launch from Vandenberg Space Force Base</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  A SpaceX Falcon 9 rocket launched DART into an escape trajectory heading towards the Didymos binary asteroid system.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">DECEMBER 2021</div>
                <div className="text-sm text-white font-semibold mb-1">DRACO First Light & Instrument Calibration</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  DRACO captured its first calibration image of stars in the constellation Messier 38, confirming flawless optical alignment.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">SEPTEMBER 11, 2022</div>
                <div className="text-sm text-white font-semibold mb-1">LICIACube Deployment</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  DART spring-released the Italian Space Agency&apos;s LICIACube 15 days before impact to trail safely and photograph the plume.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">SEPTEMBER 26, 2022 — 23:14 UTC</div>
                <div className="text-sm text-white font-semibold mb-1">Kinetic Impact at 6.1 km/s</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  SMART Nav autonomously guided DART into Dimorphos, transmitting images right until impact. Communication went dark upon impact.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">OCTOBER 11, 2022</div>
                <div className="text-sm text-white font-semibold mb-1">NASA Confirms 33-Minute Orbit Shift</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Ground-based optical and radar telescopes confirmed Dimorphos&apos;s orbit was shortened by 33 minutes—exceeding NASA&apos;s benchmark 25 times over.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">OCTOBER 7, 2024</div>
                <div className="text-sm text-white font-semibold mb-1">ESA Hera Mission Launches</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  The European Space Agency launched Hera from Cape Canaveral to rendezvous with Didymos and Dimorphos in late 2026 for close-up crater inspection.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowTimeline(false)}
              className="mt-8 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Close Timeline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
