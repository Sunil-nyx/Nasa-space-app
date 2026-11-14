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
  targetId?: string; // Links to a hotspot ID or camera target
  story: string;
  fact: string;
}

export interface HotspotDetail {
  title: string;
  category: string;
  specs: { label: string; value: string }[];
  quote: string;
  details: string;
  identity: string; // What the component is
  functionality: string; // What it does
  missionSignificance: string; // Why it mattered to the mission
}

// ─────────────────────────────────────────────
// STORY CHAPTERS (Dynamic, high-suspense for ages 12–15)
// ─────────────────────────────────────────────

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    chapter: "CHAPTER 01 // A WORLD WITHOUT WIND",
    title: "A World Without Wind",
    hudCoordinates: "LUNAR DESCENT // ALTITUDE: 15 KM",
    dateStr: "DECEMBER 11, 1972 — TAURUS-LITTROW VALLEY",
    intro:
      "You are dropping through the vacuum of space toward a deep, narrow canyon flanked by mountains taller than the Swiss Alps. Below, a desert of powdered glass and smashed basalt has rested in absolute stillness for over three billion years. There is no air. No weather. No sound. Even a whispered breath cannot exist beyond a space helmet.",
    question: "What would you expect to find where humans once walked?",
    choices: [
      {
        id: "survey-landing-site",
        label: "SURVEY THE LANDING SITE",
        icon: "◎",
        actionType: "camera",
        targetId: "survey-site",
        story:
          "The camera pans across the floor of the Taurus-Littrow valley. In every direction, the landscape is sculpted by countless meteorite impacts, ranging from massive prehistoric depressions to tiny micro-craters. In the distance, the North and South Massifs climb sharply into the pitch-black sky. In this vacuum, there is no atmospheric haze—distant mountains 20 kilometres away appear as sharp and razor-edged as rocks right at your feet.",
        fact:
          "VERIFIED FACT: Because the Moon has no atmosphere to scatter light or soften horizons, human depth perception is distorted. Astronauts frequently guessed boulders were a few hundred metres away when they were actually kilometres distant.",
      },
      {
        id: "inspect-craters",
        label: "INSPECT THE CRATERS",
        icon: "◍",
        actionType: "camera",
        targetId: "survey-site",
        story:
          "Look closely at the crater rims. With no wind, water, or volcanic activity to wear down the terrain, every crater rim is a frozen snapshot of an explosive meteorite impact. The powdery grey dust covering them—called regolith—is razor-sharp because it has never been smoothed by flowing water or blowing breeze.",
        fact:
          "VERIFIED FACT: Lunar regolith clings electrostatically to spacesuits and machinery like fine charcoal dust, chewing into mechanical joints and helmet visors.",
      },
      {
        id: "approach-preserved",
        label: "SEARCH FOR HUMAN TRACES",
        icon: "▽",
        actionType: "hotspot",
        targetId: "descent-stage",
        story:
          "As your instruments scan the valley floor, an artificial geometric shape emerges from the natural wilderness of grey rock. Sunlight glints violently off multifaceted gold and amber foil. It is the landing site of Apollo 17—an abandoned human outpost preserved in crystalline vacuum.",
        fact:
          "VERIFIED FACT: Footsteps, tire treads, and dropped tools remain virtually unchanged since December 1972. Barring a direct micrometeorite strike, they will remain intact for millions of years.",
      },
    ],
  },

  {
    id: 2,
    chapter: "CHAPTER 02 // THE MACHINE CALLED CHALLENGER",
    title: "The Machine Called Challenger",
    hudCoordinates: "TAURUS-LITTROW // 20.1908° N, 30.7717° E",
    dateStr: "TOUCHDOWN: DEC 11, 1972 — 19:55 GMT",
    intro:
      "Standing alone on the stark regolith is the Lunar Module Challenger. It doesn't look like an airplane or an aerodynamic rocket—because in the vacuum of space, aerodynamics do not matter. It is a spider-like survival capsule engineered strictly from the inside out, built so thin in places that a dropped screwdriver could puncture its skin.",
    question: "Why does it look like the top has been removed?",
    choices: [
      {
        id: "inspect-descent-stage",
        label: "EXAMINE DESCENT STAGE",
        icon: "⬡",
        actionType: "hotspot",
        targetId: "descent-stage",
        story:
          "You move closer to the octagonal base of the spacecraft. It is swathed in shimmering crinkled sheets of aluminized Kapton and Mylar foil. These paper-thin blankets shielded vital propellants and instruments from searing +120°C solar radiation and frigid -150°C shadows. It was the descent stage that brought Commander Gene Cernan and Harrison Schmitt alive to the floor of the valley.",
        fact:
          "VERIFIED FACT: The descent stage served as a self-contained descent ship, cargo carrier, and planetary habitat, and ultimately became an immovable launch pad when the mission ended.",
      },
      {
        id: "inspect-landing-legs",
        label: "INSPECT LANDING LEGS",
        icon: "⬢",
        actionType: "hotspot",
        targetId: "legs",
        story:
          "Beneath the golden chassis, four spider-like legs branch outward into broad round footpads. Each strut was packed with crushable honeycomb aluminium designed to absorb the kinetic shock of slamming into the lunar surface at several metres per second. Protruding beneath three of the footpads were 1.7-metre blue spring probes that touched the surface first to signal engine shutdown.",
        fact:
          "VERIFIED FACT: The contact sensing probes triggered a blue indicator light on the cockpit instrument panel reading 'LUNAR CONTACT', prompting Cernan to cut the descent engine a split-second before touchdown.",
      },
      {
        id: "inspect-rocket-engine",
        label: "EXAMINE DESCENT ENGINE",
        icon: "◈",
        actionType: "hotspot",
        targetId: "engine",
        story:
          "Tucked right up into the centre of the descent frame is the rocket nozzle of the TRW Descent Propulsion Engine. Unlike early ballistic missiles whose engines fired only at maximum thrust, this engine was throttleable between 10% and 60% power. This gave the commander the flight control of a helicopter to hover, brake, and search for a flat landing pad amidst treacherous crater fields.",
        fact:
          "VERIFIED FACT: Throttling a hypergolic rocket in real time was one of the greatest aerospace breakthroughs of the Apollo era. It operated smoothly using nitrogen tetroxide and Aerozine 50 fuel.",
      },
      {
        id: "inspect-ascent-cabin",
        label: "INSPECT THE ASCENT STAGE",
        icon: "↑",
        actionType: "hotspot",
        targetId: "ascent-stage",
        story:
          "Perched atop the descent stage was the crew cabin—the Ascent Stage. This was the astronauts' pressurized sanctuary. It contained no seats; the two astronauts flew standing up, strapped into tension cables to save weight and maximize visibility through triangular downward-angled windows.",
        fact:
          "VERIFIED FACT: When the surface stay was complete, the ascent stage ignited its own rocket, lifting the crew back into orbit to rendezvous with America, intentionally severing all umbilical cables with explosive guillotine blades.",
      },
    ],
  },

  {
    id: 3,
    chapter: "CHAPTER 03 // THE TRACKS THAT NEVER FADE",
    title: "The Tracks That Never Fade",
    hudCoordinates: "TRAVERSE DISTANCE: 35.7 KM // 110 KG SAMPLES",
    dateStr: "EXPEDITIONS: DEC 11–13, 1972",
    intro:
      "Branching away from Challenger are dual parallel ribbons of crushed regolith. They trace a 35-kilometre voyage across boulders, hills, and crater rims. Those tracks were carved by the ultimate planetary scout vehicle: the Lunar Roving Vehicle (LRV).",
    question: "Where do the tracks lead across the valley?",
    choices: [
      {
        id: "follow-rover-tracks",
        label: "FOLLOW THE ROVER TRACKS",
        icon: "→",
        actionType: "camera",
        targetId: "rover-path",
        story:
          "The camera glides along the tire tracks winding across the desolate valley floor toward Shorty Crater. Over three days, Cernan and Schmitt drove this electric buggy across boulder fields and steep slopes at up to 18 km/h. At Shorty Crater, Schmitt made one of the most stunning discoveries in planetary history: a brilliant streak of vivid orange soil amidst the monochrome grey.",
        fact:
          "VERIFIED FACT: The 'orange soil' wasn't rust or moss—it was microscopic beads of volcanic pyroclastic glass, erupted in ancient fire-fountains 3.6 billion years ago and preserved in the pristine lunar vacuum.",
      },
      {
        id: "examine-rover-wheels",
        label: "INSPECT THE WIRE WHEELS",
        icon: "⊡",
        actionType: "hotspot",
        targetId: "lrv-bay",
        story:
          "Conventional rubber tires would have exploded or become brittle and shattered like glass in the intense vacuum and sub-zero cold of space. Instead, engineers hand-wove the rover's tires from flexible zinc-coated steel piano wire, studded with titanium chevrons for grip on loose, powdery soil.",
        fact:
          "VERIFIED FACT: Each wheel was independently driven by its own 1/4-horsepower electric motor, allowing the rover to climb 25-degree inclines even if one motor failed.",
      },
      {
        id: "discover-rover-parking",
        label: "FIND WHERE IT WAS PARKED",
        icon: "◧",
        actionType: "hotspot",
        targetId: "lrv-bay",
        story:
          "At the end of their third excursion, Cernan drove LRV-3 to a position 150 metres east of Challenger and pointed its colour television camera back at the lander. Why? So Mission Control engineer Ed Fendell in Houston could remotely operate the camera and track Challenger's liftoff live as humanity departed.",
        fact:
          "VERIFIED FACT: Because radio signals take 1.3 seconds each way between Earth and the Moon, Fendell had to tilt the camera upward in anticipation before the ascent stage actually moved.",
      },
    ],
  },

  {
    id: 4,
    chapter: "CHAPTER 04 // THE GREAT DEPARTURE",
    title: "The Great Departure",
    hudCoordinates: "ASCENT ENGINE IGNITION // DEC 14, 1972",
    dateStr: "LIFTOFF: 22:54:37 GMT // 75 HOURS ON LUNAR SURFACE",
    intro:
      "This is the central secret of the landing site. The Lunar Module was never meant to return as one machine. It was designed as two separate spacecraft locked together until the final heartbeat of the mission.",
    question: "What does it mean to leave half of yourself behind on another world?",
    choices: [
      {
        id: "witness-departure",
        label: "WITNESS THE SEPARATION",
        icon: "🚀",
        actionType: "camera",
        targetId: "ascent-stage",
        story:
          "December 14, 1972. Gene Cernan and Harrison Schmitt enter the Ascent Stage, pressurize the cabin, and seal the hatch. At T-zero, explosive pyrotechnic guillotines slice through mechanical links and wiring harnesses. The 3,500-pound-thrust Ascent Engine ignites instantly without flame in the vacuum, launching the crew cabin into lunar orbit. Below, the descent stage absorbs the blast, remaining unmoving and eternal on the desert floor.",
        fact:
          "VERIFIED FACT: The Ascent Engine had no backup and could not be restarted. It utilized hypergolic fuel chemicals that ignite on contact without an electric spark plug. Failure meant instant stranding.",
      },
      {
        id: "cernan-final-words",
        label: "HEAR CERNAN'S LAST WORDS",
        icon: "◎",
        actionType: "hotspot",
        targetId: "plaque",
        story:
          "Before ascending the ladder for the final time, Eugene Cernan stood beside the front landing strut and traced his nine-year-old daughter Tracy's initials—TDC—into the dust with his glove. Then, speaking into his helmet microphone to the people of Earth, he promised: 'We leave as we came, and, God willing, as we shall return, with peace and hope for all mankind.'",
        fact:
          "VERIFIED FACT: Those initials TDC still exist untouched at Taurus-Littrow. No wind, rain, or biological decay exists to disturb them.",
      },
      {
        id: "stage-fate",
        label: "THE ASCENT STAGE'S DESTINY",
        icon: "☄",
        actionType: "story",
        story:
          "The Ascent Stage did not return to Earth. After docking in orbit and transferring the two astronauts and 110 kg of moonrocks into America, the Ascent Stage was released and deliberately commanded to crash into the Moon. Its violent impact reverberated through the lunar crust, ringing the Moon like a bell for the seismic sensors on the ground.",
        fact:
          "VERIFIED FACT: Apollo seismologists used the known impact energy and coordinates of discarded ascent stages and Saturn V rocket boosters to map the thickness and density of the lunar crust.",
      },
    ],
  },

  {
    id: 5,
    chapter: "CHAPTER 05 // WHAT REMAINS",
    title: "What Remains",
    hudCoordinates: "HISTORICAL MONUMENT // 50+ YEARS IN STASIS",
    dateStr: "PRESENT DAY // PERMANENT MONUMENT",
    intro:
      "More than half a century has passed since the rocket exhaust cleared from Taurus-Littrow. The valley is silent again. But this valley is no longer an untouched natural world. It is humanity's most distant historical sanctuary, sheltering the silent machines we left behind.",
    question:
      "If you could leave one message beside the machines humanity left on the Moon, what would it say?",
    choices: [
      {
        id: "discover-what-remains",
        label: "DISCOVER WHAT WAS LEFT BEHIND",
        icon: "◈",
        actionType: "camera",
        targetId: "left-behind",
        story:
          "What remains on the Moon today? The golden descent stage resting upon its four footpads. The Lunar Roving Vehicle parked with its antenna pointed toward Earth. Scientific seismometers and heat flow drills. Jettisoned life-support backpacks. And hundreds of human footprints pressed into the ancient dust. Together, they represent humanity's first fragile step into the cosmos.",
        fact:
          "VERIFIED FACT: Over 90 distinct human artifacts remain at the Apollo 17 site alone. Multiple nations and NASA guidelines now treat these sites as protected extraterrestrial historical landmarks.",
      },
      {
        id: "examine-alsep-package",
        label: "EXAMINE SCIENCE EQUIPMENT",
        icon: "⚛",
        actionType: "hotspot",
        targetId: "alsep",
        story:
          "Walk 100 metres west of the lander to the ALSEP station. Powered by a small plutonium atomic thermoelectric generator, these instruments continuously measured moonquakes, recorded meteorite bombardments, and measured solar wind particles for nearly five years until NASA turned off receiver stations on Earth in 1977.",
        fact:
          "VERIFIED FACT: The lunar laser ranging reflectors placed by Apollo missions are still in active use today. Scientists on Earth fire high-power lasers at them to measure the distance to the Moon down to the millimetre.",
      },
      {
        id: "read-eternal-plaque",
        label: "READ COMMEMORATIVE PLAQUE",
        icon: "▭",
        actionType: "hotspot",
        targetId: "plaque",
        story:
          "Bolted securely to the ladder strut is a plate of polished stainless steel. It reads: 'Here Man completed his first exploration of the Moon, December 1972, A.D. May the spirit of peace in which we came be reflected in the lives of all mankind.' Beneath the words are the etched signatures of Gene Cernan, Ronald Evans, Harrison Schmitt, and the President of the United States.",
        fact:
          "VERIFIED FACT: Because there is zero atmospheric oxygen or moisture on the Moon, this steel plaque will never rust or fade. It will remain perfectly legible for millions of years.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// HOTSPOT DOSSIER DATA (Components, Function, Importance)
// ─────────────────────────────────────────────

export const HOTSPOT_DATA: Record<string, HotspotDetail> = {
  "descent-stage": {
    title: "Challenger Descent Stage",
    category: "PROPULSION & PERMANENT SURFACE STRUCTURE",
    identity:
      "The octagonal lower half of the Apollo Lunar Module, framed in lightweight titanium and covered in multilayered thermal insulation blankets.",
    functionality:
      "It carried the throttleable descent engine, 8,200 kg of liquid rocket propellant, the lunar roving vehicle, the scientific equipment packages, and surface exploration gear down to the lunar surface.",
    missionSignificance:
      "It served as the immovable launch pad from which the astronauts escaped the Moon. Today it remains the permanent, unmoving monument of Apollo 17 on the valley floor.",
    specs: [
      { label: "Dry Mass", value: "2,134 kg (4,705 lb)" },
      { label: "Propellant Capacity", value: "8,165 kg (Aerozine 50 & N2O4)" },
      { label: "Thermal Shield", value: "Kapton & Aluminized Mylar (25 layers)" },
      { label: "Current Status", value: "Permanent Lunar Base (Intact)" },
    ],
    quote:
      "\"Okay, Houston, the Challenger has landed!\" — Eugene Cernan, Commander, Dec 11, 1972",
    details:
      "The descent stage was designed to operate once and remain behind. Its four quadrant bays held the Lunar Roving Vehicle folded like origami, the ALSEP nuclear science station, tool carriers, and water tanks. Its golden foil reflects 95% of solar radiation in space.",
  },

  "legs": {
    title: "Landing Gear & Footpads",
    category: "SHOCK ABSORPTION & SURFACE STABILIZATION",
    identity:
      "Four deployable tripod landing struts made of aircraft-grade titanium and aluminium alloys, terminating in 37-inch-diameter inverted dish footpads.",
    functionality:
      "Absorbed the touchdown kinetic shock using crushable aluminium honeycomb cartridges inside the telescoping primary struts, preventing the spacecraft from toppling on boulders or crater slopes.",
    missionSignificance:
      "Without these shock-absorbing legs, any uneven touchdown would have cracked the propellant tanks or tipped the vehicle over, stranding the astronauts with zero rescue possibility.",
    specs: [
      { label: "Span Across Diagonal", value: "9.4 metres (31 feet)" },
      { label: "Footpad Diameter", value: "94 cm (37 inches)" },
      { label: "Shock Medium", value: "Crushable aluminium honeycomb" },
      { label: "Contact Sensors", value: "1.7-metre blue spring probes" },
    ],
    quote:
      "\"Contact light! Engine stop.\" — Lunar landing callout procedure",
    details:
      "Three of the four footpads were equipped with 1.7-metre flexible contact probes that extended below the pads. When a probe touched the regolith, a contact light illuminated on the instrument panel, instructing the commander to cut the engine so backpressure would not rupture the nozzle.",
  },

  "engine": {
    title: "Descent Rocket Engine (DPS)",
    category: "THROTTLEABLE ROCKET PROPULSION",
    identity:
      "A gimballed, hypergolic liquid rocket engine built by TRW Systems, positioned in the centre well of the descent stage.",
    functionality:
      "Fired against the spacecraft's orbital velocity to decelerate from 5,800 km/h in lunar orbit down to zero, with a throttle range between 1,050 and 9,870 pounds of thrust for pinpoint hovering.",
    missionSignificance:
      "It enabled the first precision soft-landings on another world. Its revolutionary throttleable pintle injector design is the direct ancestor of the engines used today on SpaceX Falcon 9 and Starship.",
    specs: [
      { label: "Max Thrust", value: "43.9 kN (9,870 lbf)" },
      { label: "Min Throttle", value: "4.7 kN (1,050 lbf)" },
      { label: "Propellant Type", value: "Hypergolic (Self-igniting on contact)" },
      { label: "Nozzle Extension", value: "Columbium & titanium radiation-cooled bell" },
    ],
    quote:
      "\"We've got good thrust, Houston. Velocity checking out right down the line.\" — Dec 11, 1972",
    details:
      "Hypergolic propellants (nitrogen tetroxide and Aerozine-50) ignite spontaneously when mixed, eliminating the need for delicate electric ignition systems that could freeze or fail in vacuum. The engine was fired for over 12 continuous minutes during descent.",
  },

  "plaque": {
    title: "Challenger Commemorative Plaque",
    category: "PERMANENT HISTORICAL ARTIFACT",
    identity:
      "A curved stainless steel plate, 23 x 30 cm, coated in black enamel and mounted to the primary forward landing strut beneath the access ladder.",
    functionality:
      "Bears a permanent declaration of humanity's peaceful exploration of space and the signatures of the three Apollo 17 astronauts and the U.S. President.",
    missionSignificance:
      "Marks the conclusion of humanity's initial era of lunar exploration. Mounted to the descent stage so it remains on the Moon forever.",
    specs: [
      { label: "Material", value: "Type 304 Stainless Steel" },
      { label: "Mounting", value: "Front strut below egress ladder" },
      { label: "Signatories", value: "E. Cernan, R. Evans, H. Schmitt, R. Nixon" },
      { label: "Expected Lifespan", value: "Tens of millions of years in vacuum" },
    ],
    quote:
      "\"Here Man completed his first exploration of the Moon, December 1972, A.D. May the spirit of peace in which we came be reflected in the lives of all mankind.\"",
    details:
      "During flight, the plaque was protected from rocket exhaust by a thin sheet of stainless foil. On the lunar surface, Gene Cernan and Harrison Schmitt stripped away the cover and read its inscription aloud to Earth.",
  },

  "alsep": {
    title: "Apollo Lunar Surface Experiments Package (ALSEP)",
    category: "DEEP SPACE NUCLEAR SCIENCE STATION",
    identity:
      "A multi-instrument scientific station powered by a SNAP-27 Radioisotope Thermoelectric Generator (RTG) fueled by plutonium-238.",
    functionality:
      "Monitored seismic tremors, measured internal lunar heat escaping from the crust, detected cosmic dust and atmospheric particles, and measured variations in lunar gravity.",
    missionSignificance:
      "Provided continuous, real-time scientific telemetry about the interior structure and thermal evolution of the Moon for almost five years after the astronauts departed.",
    specs: [
      { label: "Power Unit", value: "SNAP-27 Atomic RTG (73 Watts continuous)" },
      { label: "Fuel", value: "3.8 kg of Plutonium-238" },
      { label: "Active Operations", value: "Dec 1972 – Sept 30, 1977" },
      { label: "Key Sensor", value: "Heat Flow & Lunar Surface Gravimeter" },
    ],
    quote:
      "\"Science is what we came here for. Taurus-Littrow is an open textbook.\" — Harrison 'Jack' Schmitt, Geologist",
    details:
      "Because solar panels would produce no power during the 14-day freezing lunar night, NASA equipped ALSEP with an atomic decay battery. The heat of radioactive plutonium rods warming thermocouples generated reliable electricity continuously.",
  },

  "lrv-bay": {
    title: "Lunar Roving Vehicle (LRV-3) Station",
    category: "SURFACE EXPLORATION MOBILITY SYSTEM",
    identity:
      "An electric planetary rover with four independently driven wire-mesh wheels, folded and deployed from Quadrant 1 of the descent stage.",
    functionality:
      "Carried two astronauts, life support gear, communications dish, colour television camera, and rock sample carriers across 35.7 kilometres of rugged lunar terrain.",
    missionSignificance:
      "Expanded the exploration range of astronauts from a few hundred metres around the lander to kilometers across massifs and craters, enabling the discovery of volcanic orange soil.",
    specs: [
      { label: "Dry Mass", value: "210 kg (460 lb on Earth / 77 lb on Moon)" },
      { label: "Total Distance Driven", value: "35.7 km (22.2 miles)" },
      { label: "Top Speed", value: "18.0 km/h (11.2 mph)" },
      { label: "Tire Construction", value: "Woven zinc-coated steel piano wire" },
    ],
    quote:
      "\"This rover is really something. It just climbs right up these hills without a quiver.\" — Gene Cernan",
    details:
      "LRV-3 is currently parked 150 metres east of Challenger. Its high-gain communications dish and television camera broadcast Challenger's liftoff live to Earth before its silver-zinc batteries eventually expired.",
  },

  "ascent-stage": {
    title: "Challenger Ascent Stage (Departed)",
    category: "CREW COMPARTMENT & RENDEZVOUS SPACECRAFT",
    identity:
      "The upper pressurized crew cabin of the Lunar Module, housing the guidance computers, life support systems, and the 3,500-lbf ascent rocket engine.",
    functionality:
      "Served as living quarters on the surface, then launched from the descent stage to bring the astronauts and samples back into lunar orbit to rendezvous with Command Module America.",
    missionSignificance:
      "The only component designed to return the astronauts from the surface. Without its successful ignition, the astronauts would have perished on the Moon.",
    specs: [
      { label: "Crew Capacity", value: "2 Astronauts (Standing configuration)" },
      { label: "Engine Thrust", value: "15.6 kN (3,500 lbf)" },
      { label: "Liftoff Date", value: "December 14, 1972 at 22:54 GMT" },
      { label: "Impact Date", value: "Dec 15, 1972 (Deliberately crashed for science)" },
    ],
    quote:
      "\"America, we're on our way!\" — Gene Cernan, Ascent Liftoff Callout",
    details:
      "The ascent stage had no seats to save mass—astronauts stood suspended by cords. After returning the crew to America, it was intentionally guided into an impact with the Moon to generate a seismic signal for ALSEP to record.",
  },
};

// ─────────────────────────────────────────────
// DISCOVERY JOURNAL MODAL
// ─────────────────────────────────────────────

interface DiscoveryLogProps {
  discovered: Set<string>;
  onClose: () => void;
  onJumpToHotspot: (id: string) => void;
}

function DiscoveryLog({ discovered, onClose, onJumpToHotspot }: DiscoveryLogProps) {
  const totalItems = Object.keys(HOTSPOT_DATA).length;
  const discoveredHotspots = Object.keys(HOTSPOT_DATA).filter((id) => discovered.has(id));

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#050a18] border border-cyan-500/30 shadow-[0_0_80px_rgba(56,189,248,0.2)] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2 font-mono text-[11px] tracking-[0.25em] text-cyan-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          INVESTIGATOR DOSSIER LOG
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">Mission Journal</h3>
        <p className="text-xs text-slate-400 font-mono mb-5">
          Taurus-Littrow Reconstructed Exploration Records • {discoveredHotspots.length} of {totalItems} Artifacts Investigated
        </p>

        {/* Progress tracker */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-cyan-400 rounded-full transition-all duration-500"
            style={{
              width: `${Math.round((discoveredHotspots.length / totalItems) * 100)}%`,
              boxShadow: "0 0 10px #38bdf8",
            }}
          />
        </div>

        {/* List of artifacts */}
        <div className="space-y-3 mb-6">
          {Object.entries(HOTSPOT_DATA).map(([id, h]) => {
            const isUnlocked = discovered.has(id);
            return (
              <div
                key={id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isUnlocked
                    ? "bg-cyan-950/20 border-cyan-500/30 text-white"
                    : "bg-white/[0.02] border-white/5 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-base ${isUnlocked ? "text-cyan-400" : "text-slate-600"}`}>
                    {isUnlocked ? "✓" : "○"}
                  </span>
                  <div>
                    <div className="text-xs font-mono font-bold tracking-wide">
                      {h.title}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {isUnlocked ? h.category : "Artifact Not Yet Inspected"}
                    </div>
                  </div>
                </div>

                {isUnlocked && (
                  <button
                    onClick={() => {
                      onClose();
                      onJumpToHotspot(id);
                    }}
                    className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-[10px] font-mono uppercase tracking-wider text-cyan-300 cursor-pointer"
                  >
                    View Dossier
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
        >
          Return to Exploration
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN STORY OVERLAY
// ─────────────────────────────────────────────

interface StoryOverlayProps {
  currentScene: number;
  onSetScene: (sceneId: number) => void;
  activeHotspot: string | null;
  onCloseHotspot: () => void;
  freeOrbit: boolean;
  onToggleFreeOrbit: () => void;
  onSelectHotspot: (id: string) => void;
}

export function StoryOverlay({
  currentScene,
  onSetScene,
  activeHotspot,
  onCloseHotspot,
  freeOrbit,
  onToggleFreeOrbit,
  onSelectHotspot,
}: StoryOverlayProps) {
  const [showTimeline, setShowTimeline] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set(["descent-stage"]));

  const scene = STORY_SCENES.find((s) => s.id === currentScene) || STORY_SCENES[0];
  const hotspot = activeHotspot && HOTSPOT_DATA[activeHotspot] ? HOTSPOT_DATA[activeHotspot] : null;

  // Handle choice interaction
  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoiceId(choice.id);
    if (choice.targetId) {
      setDiscovered((prev) => new Set([...prev, choice.targetId!]));
      if (choice.actionType === "hotspot") {
        onSelectHotspot(choice.targetId);
      } else if (choice.actionType === "camera") {
        // Trigger camera movement using the hotspot camera controller
        onSelectHotspot(choice.targetId);
      }
    }
  };

  const handleSetScene = (id: number) => {
    setSelectedChoiceId(null);
    onSetScene(id);
  };

  const activeChoice = scene.choices.find((c) => c.id === selectedChoiceId) || null;

  return (
    <div className="select-none">
      {/* ── TOP HEADER BAR ────────────────────────────────────── */}
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-40 p-2.5 sm:p-5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Return Button */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl backdrop-blur-xl bg-[#030714]/85 border border-white/10 hover:border-cyan-400/50 hover:bg-[#060f26] transition-all text-white no-underline group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <span className="text-cyan-400 group-hover:-translate-x-1 transition-transform">←</span>
          <div className="text-left font-mono leading-none">
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 block mb-0.5 hidden sm:block">
              SILENT EXPLORERS
            </span>
            <span className="text-xs font-bold text-slate-100 tracking-wider block group-hover:text-cyan-300">
              <span className="hidden sm:inline">Return to </span>Catalog
            </span>
          </div>
        </Link>

        {/* Center Mission Badge */}
        <div className="hidden md:flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-xl bg-[#030714]/85 border border-cyan-500/30 font-mono text-xs text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold tracking-widest text-white">APOLLO 17</span>
          <span className="text-white/20">|</span>
          <span className="tracking-wider text-slate-300">TAURUS-LITTROW</span>
          <span className="text-white/20">|</span>
          <span className="text-cyan-400/90">{scene.hudCoordinates}</span>
        </div>

        {/* Right Header Section: Controls & NASA Source Badge */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5">
          {/* Mission Journal */}
          <button
            onClick={() => setShowJournal(true)}
            className="relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl backdrop-blur-xl bg-[#030714]/85 border border-white/10 hover:border-cyan-400/50 hover:bg-[#060f26] text-[11px] sm:text-xs font-mono tracking-wider text-slate-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <span className="hidden sm:inline">Mission </span>Journal
            {discovered.size > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-cyan-400 text-[9px] font-black text-slate-950 shadow-[0_0_8px_#38bdf8]">
                {discovered.size}
              </span>
            )}
          </button>

          {/* Timeline Modal Toggle */}
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="hidden sm:block px-3.5 py-2 rounded-xl backdrop-blur-xl bg-[#030714]/85 border border-white/10 hover:border-cyan-400/50 hover:bg-[#060f26] text-xs font-mono tracking-wider text-slate-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            Timeline
          </button>

          {/* Free Orbit Toggle */}
          <button
            onClick={onToggleFreeOrbit}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl backdrop-blur-xl border text-[11px] sm:text-xs font-mono tracking-wider transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
              freeOrbit
                ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                : "bg-[#030714]/85 border-white/10 text-slate-300 hover:border-cyan-400/40"
            }`}
          >
            {freeOrbit ? "Free Cam" : "Orbit"}
          </button>

          {/* ── NASA SOURCE IDENTIFICATION BADGE ─────── */}
          <div className="relative group">
            <a
              href="https://www.nasa.gov/mission/apollo-17/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Official NASA Apollo 17 Mission Records"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl backdrop-blur-xl bg-[#030919]/90 border border-cyan-400/40 hover:border-cyan-400 hover:bg-[#071333] transition-all text-white no-underline shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]"
            >
              {/* Original orbital geometry icon */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-400 shrink-0"
              >
                <circle cx="12" cy="12" r="4" fill="#38bdf8" fillOpacity="0.3" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" stroke="#67e8f9" />
                <circle cx="19" cy="8.5" r="1.5" fill="#ffffff" />
              </svg>

              <div className="text-left font-mono leading-tight">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-cyan-400 block font-semibold">
                  NASA SOURCE
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-200 tracking-wider flex items-center gap-1 group-hover:text-white">
                  RECORDS <span className="text-cyan-400">↗</span>
                </span>
              </div>
            </a>

            {/* Educational Disclaimer Tooltip */}
            <div className="absolute right-0 top-full mt-2 w-56 p-2.5 rounded-xl backdrop-blur-2xl bg-[#040816]/95 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-[10px] font-mono text-slate-400 leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              <span className="text-cyan-300 font-semibold block mb-0.5">SOURCE ATTRIBUTION</span>
              Historical flight transcripts, coordinates, and 3D terrain reconstruction referenced from NASA Apollo 17 archives.
              <div className="text-[9px] text-slate-500 mt-1 border-t border-white/5 pt-1">
                An independent educational project. Not affiliated with or endorsed by NASA.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── RIGHT ARTIFACT SELECTOR PILLS (Floating absolute, non-intrusive) ─────────────────── */}
      <aside className="pointer-events-auto fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-1.5 max-w-xs">
        <div className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase text-right pr-2 mb-1">
          Examine Artifacts
        </div>
        {[
          { id: "descent-stage", label: "Descent Stage & Foil" },
          { id: "legs", label: "Landing Gear & Footpads" },
          { id: "engine", label: "Descent Rocket Engine" },
          { id: "plaque", label: "Challenger Plaque" },
          { id: "alsep", label: "ALSEP Science Package" },
          { id: "lrv-bay", label: "Rover LRV-3 Station" },
          { id: "ascent-stage", label: "Ascent Stage (Departed)" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setDiscovered((prev) => new Set([...prev, item.id]));
              onSelectHotspot(item.id);
            }}
            className={`text-right px-3.5 py-1.5 rounded-lg backdrop-blur-md text-xs font-mono transition-all cursor-pointer border ${
              activeHotspot === item.id
                ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                : discovered.has(item.id)
                ? "bg-black/50 border-cyan-400/30 text-slate-300 hover:border-cyan-400/60 hover:text-white"
                : "bg-black/50 border-white/10 text-slate-400 hover:border-cyan-400/40 hover:text-white"
            }`}
          >
            {discovered.has(item.id) && activeHotspot !== item.id && (
              <span className="mr-1.5 text-cyan-400 text-[10px]">✓</span>
            )}
            {item.label}
          </button>
        ))}
      </aside>

      {/* ── BOTTOM CINEMATIC STORY PANEL (Fixed bottom, bounded height, sticky controls) ──────────────────────── */}
      <footer className="pointer-events-auto fixed bottom-2.5 sm:bottom-5 left-2.5 sm:left-6 right-2.5 sm:right-auto sm:w-[680px] lg:w-[760px] max-w-[calc(100vw-20px)] sm:max-w-3xl z-40 story-panel-scroll">
        <div
          data-prevent-scene-wheel="true"
          className="rounded-2xl backdrop-blur-2xl bg-[#040816]/96 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative overflow-hidden flex flex-col h-auto max-h-[calc(100dvh-100px)] sm:max-h-[calc(100dvh-90px)] min-h-0"
        >
          {/* Top cyan gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 z-10 shrink-0" />

          {/* Sticky Header inside the Chapter Panel */}
          <div className="p-3 sm:px-6 sm:pt-4 sm:pb-2.5 border-b border-white/[0.06] shrink-0 bg-[#040816]/90 backdrop-blur-md">
            {/* Chapter header and navigation dots */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">
                {scene.chapter}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {STORY_SCENES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSetScene(s.id)}
                    aria-label={`Jump to ${s.title}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      s.id === currentScene
                        ? "w-6 sm:w-8 bg-cyan-400 shadow-[0_0_10px_#38bdf8]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Scene Title & Date */}
            <div className="flex flex-wrap items-baseline justify-between gap-1.5">
              <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-tight">
                {scene.title}
              </h2>
              <span className="text-[9px] sm:text-[11px] font-mono text-slate-400 tracking-wider">
                {scene.dateStr}
              </span>
            </div>
          </div>

          {/* Scrollable Body: Contains narrative, questions, and discovery cards */}
          <div
            className="p-3.5 sm:px-6 sm:py-3.5 overflow-y-auto chapter-scroll-area flex-1 min-h-0 overscroll-contain select-text"
            style={{ WebkitOverflowScrolling: "touch" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Intro Paragraph */}
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3">
              {scene.intro}
            </p>

            {/* Rhetorical Suspense Question */}
            <p className="text-cyan-300 text-xs font-mono italic mb-4 pl-3 border-l-2 border-cyan-400/50">
              {scene.question}
            </p>

            {/* Interactive Action Discovery Buttons (Part 3) */}
            {!activeChoice && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                {scene.choices.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleChoiceClick(c)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left text-xs font-mono tracking-wide transition-all cursor-pointer ${
                      discovered.has(c.targetId || c.id)
                        ? "bg-cyan-950/40 border-cyan-400/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/60"
                        : "bg-white/5 border-white/10 text-slate-300 hover:border-cyan-400/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-cyan-400 text-base leading-none shrink-0">{c.icon}</span>
                    <span className="leading-tight font-semibold">{c.label}</span>
                    {discovered.has(c.targetId || c.id) && (
                      <span className="ml-auto text-cyan-400 text-[10px]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Interactive Revelation Panel */}
            {activeChoice && (
              <div className="mb-2 rounded-xl bg-cyan-950/25 border border-cyan-400/30 p-3.5 sm:p-4 relative animate-fade-in">
                <button
                  onClick={() => setSelectedChoiceId(null)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-white text-xs font-mono cursor-pointer transition-colors"
                >
                  ✕ dismiss
                </button>

                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <span>{activeChoice.icon}</span> {activeChoice.label}
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-3 font-light">
                  {activeChoice.story}
                </p>

                <div className="rounded-lg bg-black/50 border border-cyan-500/20 px-3 py-2">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block mb-0.5 font-bold">
                    HISTORICAL DOCUMENTATION
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed italic">{activeChoice.fact}</p>
                </div>

                {/* Sub-pills to switch discoveries */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {scene.choices
                    .filter((c) => c.id !== selectedChoiceId)
                    .map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleChoiceClick(c)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 hover:border-cyan-400/50 bg-black/40 text-[10px] font-mono text-slate-300 hover:text-white cursor-pointer transition-all"
                      >
                        <span>{c.icon}</span> {c.label}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Persistent Fixed Footer inside Chapter Panel — Never pushed out of viewport */}
          <div className="p-2.5 sm:px-6 sm:py-3 border-t border-white/[0.08] bg-[#030714]/98 shrink-0 flex items-center justify-between gap-2 sm:gap-3">
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
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:brightness-110 active:scale-95"
              }`}
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </footer>

      {/* ── ARTIFACT DOSSIER MODAL ────────────────────────────── */}
      {hotspot && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="max-w-xl w-full rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#060c1e] border border-cyan-500/40 shadow-[0_0_60px_rgba(56,189,248,0.25)] relative max-h-[90vh] overflow-y-auto">
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

            {/* Three Pillar Breakdown: What it is, What it does, Why it mattered */}
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

            {/* Quote excerpt */}
            <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 italic text-slate-300 text-xs mb-5 bg-cyan-950/15 leading-relaxed">
              {hotspot.quote}
            </blockquote>

            {/* Technical Specs Grid */}
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
              Close Artifact Dossier
            </button>
          </div>
        </div>
      )}

      {/* ── MISSION TIMELINE MODAL ───────────────────────────── */}
      {showTimeline && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#050a18] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] relative">
            <button
              onClick={() => setShowTimeline(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase mb-2">
              HISTORICAL FLIGHT LOG // 1972
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">Apollo 17 Mission Timeline</h3>

            <div className="space-y-6 border-l-2 border-white/10 pl-6 ml-2 font-mono">
              <div>
                <div className="text-xs text-cyan-400 font-bold">DECEMBER 7, 1972 — 05:33 GMT</div>
                <div className="text-sm text-white font-semibold mb-1">Night Launch of Saturn V</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  The only nighttime launch of the Apollo programme. The 363-foot rocket illuminated Florida skies for over 80 kilometres as it boosted the crew on translunar injection.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">DECEMBER 11, 1972 — 19:55 GMT</div>
                <div className="text-sm text-white font-semibold mb-1">Challenger Touchdown in Taurus-Littrow</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Landed within 200 metres of intended target in a narrow valley bordered by steep massifs rising 2,300 metres above the landing site.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">DECEMBER 11–13, 1972</div>
                <div className="text-sm text-white font-semibold mb-1">Three Surface Excursions (22h 04m)</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Longest surface stay of the Apollo program (75 hours) and longest rover traverse (35.7 km). Discovery of volcanic orange soil at Shorty Crater.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">DECEMBER 14, 1972 — 22:54 GMT</div>
                <div className="text-sm text-white font-semibold mb-1">Ascent Liftoff & Permanent Departure</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  The Ascent Stage ignited its engine, lifting Cernan and Schmitt back into lunar orbit. The descent stage, rover, and equipment remained in timeless stasis.
                </div>
              </div>

              <div>
                <div className="text-xs text-cyan-400 font-bold">DECEMBER 19, 1972 — 19:24 GMT</div>
                <div className="text-sm text-white font-semibold mb-1">Pacific Ocean Splashdown</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  America splashed down 650 km southeast of Samoa, recovered safely by USS Ticonderoga. Humanity has not landed on the Moon since.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowTimeline(false)}
              className="w-full mt-8 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Return to 3D Exploration
            </button>
          </div>
        </div>
      )}

      {/* ── MISSION JOURNAL MODAL ────────────────────────────── */}
      {showJournal && (
        <DiscoveryLog
          discovered={discovered}
          onClose={() => setShowJournal(false)}
          onJumpToHotspot={(id) => {
            onSelectHotspot(id);
          }}
        />
      )}
    </div>
  );
}
