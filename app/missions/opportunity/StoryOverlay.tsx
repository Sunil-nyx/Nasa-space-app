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
// STORY CHAPTERS (12–15 YEARS OLD FOCUS)
// ─────────────────────────────────────────────

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    chapter: "CHAPTER 01 // THE 90-DAY PROMISE",
    title: "The 90-Day Promise",
    hudCoordinates: "MERIDIANI PLANUM // 1.9462° S, 354.4734° E",
    dateStr: "LANDING: JANUARY 25, 2004 — EAGLE CRATER",
    intro:
      "On January 25, 2004, a parachute blossomed in the thin Martian sky and an airbag-cushioned cocoon slammed into the red desert, bouncing dozens of times before rolling to a stop. When the protective petals unfolded, Opportunity sat inside a small impact crater in the flat expanse of Meridiani Planum. Engineers at NASA gave the solar-powered robot an official warranty of just 90 Martian sols.",
    question: "What could a golf-cart-sized rover discover on an alien world in just ninety sols?",
    choices: [
      {
        id: "inspect-opportunity",
        label: "MEET THE ROVER",
        icon: "⬡",
        actionType: "hotspot",
        targetId: "solar-panels",
        story:
          "Opportunity was a 185-kilogram marvel of autonomous robotics. Perched on six aluminum wheels with rocker-bogie suspension, it was powered by black solar wings that generated roughly 900 watt-hours of electricity per Martian sol—about enough power to run a standard lightbulb for nine hours. In the freezing Martian night, when temperatures plunged to −100°C, survival electric heaters kept its electronic brain alive inside an insulated box.",
        fact:
          "VERIFIED FACT: A Martian solar day is called a 'sol'. One sol lasts 24 hours, 39 minutes, and 35 seconds—just slightly longer than an Earth day.",
      },
      {
        id: "interplanetary-hole-in-one",
        label: "THE HOLE-IN-ONE",
        icon: "◎",
        actionType: "camera",
        targetId: "survey-meridiani",
        story:
          "Mission scientists called Opportunity's landing an 'interplanetary hole-in-one'. After traveling 456 million kilometers through interplanetary space, the landing cocoon bounced straight into Eagle Crater—a 22-meter-wide depression. Right in front of the rover stood something planetary scientists had searched for for decades: bright layered bedrock exposed in the crater rim.",
        fact:
          "VERIFIED FACT: Unlike the flat sand plains surrounding it, Eagle Crater exposed ancient geological layers that had been sheltered from dust for millions of years.",
      },
      {
        id: "warranty-mystery",
        label: "THE 90-SOL LIMIT",
        icon: "⏳",
        actionType: "story",
        story:
          "Why did NASA predict Opportunity would last only 90 sols? Because Martian dust constantly settles out of the thin atmosphere. Engineers calculated that dust accumulating on the glass solar panels would reduce power generation below the level needed to keep the rover's heaters running. The mission was designed as a sprint against the ticking clock of dust.",
        fact:
          "VERIFIED FACT: Opportunity was twin to Spirit, which landed three weeks earlier on the other side of Mars in Gusev Crater.",
      },
    ],
  },

  {
    id: 2,
    chapter: "CHAPTER 02 // THE CLUE IN THE ROCKS",
    title: "The Clue in the Rocks",
    hudCoordinates: "EAGLE CRATER // SULFATE BEDROCK OUTCROP",
    dateStr: "FEBRUARY 2004 — FIRST SCIENTIFIC CAMPAIGN",
    intro:
      "Opportunity rolled forward to the crater wall and pointed its microscopic camera at the bedrock. When the first high-resolution pictures flashed onto screens at NASA's Jet Propulsion Laboratory, geologists gasped. Embedded throughout the reddish rock were thousands of strange, dark, perfectly round beads—resembling blueberries scattered in a muffin.",
    question: "Could these tiny spheres be evidence of ancient Martian water?",
    choices: [
      {
        id: "investigate-blueberries",
        label: "INSPECT THE BLUEBERRIES",
        icon: "◍",
        actionType: "hotspot",
        targetId: "blueberries",
        story:
          "The beads measured only a few millimeters across. They were not volcanic lava bubbles, nor were they rounded by wind. Using its Mössbauer and Alpha Particle X-Ray spectrometers, Opportunity identified them as grey hematite—an iron-oxide mineral that almost exclusively crystallizes from mineral-saturated liquid groundwater soaking through porous sedimentary rock.",
        fact:
          "VERIFIED FACT: These hematite spherules formed inside ancient subterranean water tables billions of years ago when liquid water saturated the crust of Meridiani Planum.",
      },
      {
        id: "deploy-robotic-arm",
        label: "DEPLOY ROBOTIC ARM",
        icon: "🦾",
        actionType: "hotspot",
        targetId: "arm",
        story:
          "Opportunity reached out with its 5-jointed Instrument Deployment Device (IDD). At the end of the arm was the Rock Abrasion Tool (RAT)—a diamond-tipped grinder that shaved away the weathered surface of the rock, allowing the Microscopic Imager to photograph pristine mineral grains and cross-bedded sand structures left behind by ancient flowing water.",
        fact:
          "VERIFIED FACT: The microscopic camera revealed cross-bedding ripples—sedimentary patterns identical to ripples created by flowing water in streams on Earth.",
      },
      {
        id: "water-confirmation",
        label: "THE WATER DISCOVERY",
        icon: "💧",
        actionType: "story",
        story:
          "In March 2004, NASA announced a major finding: Opportunity had uncovered compelling evidence that liquid water once existed at Meridiani Planum. The ancient environment had been salty and acidic—a shallow groundwater system—with sulfate-rich evaporite rocks pointing to water that was briny rather than fresh. This was strong in-situ geological evidence that Mars once hosted liquid water, though the exact conditions and extent remain a subject of ongoing research.",
        fact:
          "VERIFIED FACT: This was the first in-situ chemical and geological confirmation of ancient liquid water on the surface of another planet, based on hematite spherules, sulfate bedrock, and cross-bedding sedimentary structures.",
      },
    ],
  },

  {
    id: 3,
    chapter: "CHAPTER 03 // THE ROVER THAT KEPT GOING",
    title: "The Rover That Kept Going",
    hudCoordinates: "TOTAL TRAVERSE: 45.16 KM // 5,000+ SOLS",
    dateStr: "2004 — 2018 // THE PLANETARY MARATHON",
    intro:
      "Sol 90 came and went. Opportunity showed zero sign of stopping. Sol 500. Sol 1,000. Sol 4,000. Month after month, unexpected atmospheric gusts called 'cleaning events'—Martian dust devils sweeping across the plains—blew thick dust off the solar panels, restoring power to maximum. The machine engineered for a three-month sprint had become an interplanetary marathon runner.",
    question: "How far could a robot drive across an uncharted alien wilderness?",
    choices: [
      {
        id: "follow-odometer",
        label: "FOLLOW THE 45.16 KM TRAIL",
        icon: "→",
        actionType: "camera",
        targetId: "rover-trail",
        story:
          "From Eagle Crater, Opportunity drove south across miles of rippling sand dunes. It navigated deep into Endurance Crater (130 m wide), traversed the treacherous dunes of Victoria Crater (750 m wide), and finally arrived at the rim of Endeavour Crater—a gigantic impact basin 22 kilometers across. On March 24, 2015, Opportunity passed the 42.195 km mark—completing the first official off-Earth marathon. By the end of the mission it had driven 45.16 km total—a record that stood for over 8 years before NASA's Perseverance rover surpassed it in October 2026, reaching approximately 45.22 km.",
        fact:
          "HISTORICAL RECORD: Opportunity drove 45.16 km (28.06 miles)—the longest off-Earth journey in human exploration history at the time. That record was surpassed by NASA's Perseverance rover in October 2026. Opportunity's achievement remains a landmark in planetary exploration.",
      },
      {
        id: "inspect-wheels",
        label: "INSPECT THE 6 WHEELS",
        icon: "⚙",
        actionType: "hotspot",
        targetId: "wheels",
        story:
          "Opportunity's six aluminum wheels were carved with spiral cleats for traction in loose basalt dust. Each wheel had its own independent electric motor. When the right-front steering actuator failed in 2005, NASA engineers drove the rover backward to preserve the remaining motors, turning a mechanical setback into another decade of exploration.",
        fact:
          "VERIFIED FACT: The rocker-bogie suspension system allowed the rover to climb over rocks taller than its wheel diameter (25 cm) without tipping over.",
      },
      {
        id: "explore-pancam",
        label: "EXAMINE STEREO PANCAM",
        icon: "👁",
        actionType: "hotspot",
        targetId: "pancam",
        story:
          "Sitting atop the 1.5-meter mast were the twin Panoramic Cameras (Pancam). Spaced roughly the same distance apart as human eyes, they provided stereoscopic color vision, returning over 217,000 raw scientific images to Earth and allowing students and scientists to experience Mars in true 3D perspective.",
        fact:
          "VERIFIED FACT: The camera mast was built at human eye-level (1.5 m) specifically so photographs would match what a human geologist walking on Mars would see.",
      },
    ],
  },

  {
    id: 4,
    chapter: "CHAPTER 04 // WHEN THE SUN DISAPPEARED",
    title: "When the Sun Disappeared",
    hudCoordinates: "PERSEVERANCE VALLEY // ATMOSPHERIC DUST STORM",
    dateStr: "JUNE 2018 // TAU OPACITY: >10.8 (EXTREME)",
    intro:
      "In late May 2018, Opportunity was exploring Perseverance Valley along the western rim of Endeavour Crater. Weather satellites in orbit detected a localized dust storm beginning thousands of kilometers away. Within days, the storm exploded into a planet-encircling tempest, blotting out the Martian sky from pole to pole.",
    question: "What happens to a solar-powered explorer when the Sun is swallowed by darkness?",
    choices: [
      {
        id: "witness-darkness",
        label: "WITNESS THE DUST STORM",
        icon: "🌪",
        actionType: "camera",
        targetId: "pancam",
        story:
          "Dust grains suspended in the thin CO₂ atmosphere absorbed sunlight until the sky turned pitch black at high noon. Atmospheric opacity—measured as 'tau'—climbed beyond 10.8, the highest level ever recorded on Mars. For a rover that required direct sunlight to recharge its batteries, it was an existential emergency.",
        fact:
          "VERIFIED FACT: Opportunity's power dropped precipitously from over 640 watt-hours per sol to under 22 watt-hours—not even enough electricity to keep its master clock running.",
      },
      {
        id: "survival-heaters",
        label: "THE BATTLE AGAINST FREEZING",
        icon: "❄",
        actionType: "hotspot",
        targetId: "solar-panels",
        story:
          "The greatest danger on Mars is not dust; it is cold. Without battery power to run internal survival heaters, the bitter −90°C Martian night threatens to freeze electronic soldering, crack quartz crystals inside timers, and permanently destroy the rover's computer boards. Opportunity shut down all instruments and entered automated deep-sleep stasis.",
        fact:
          "VERIFIED FACT: A solar-powered rover needs a minimum threshold of power just to wake up its computer and listen for incoming radio commands.",
      },
      {
        id: "last-engineering-call",
        label: "THE FINAL TELEMETRY",
        icon: "📡",
        actionType: "hotspot",
        targetId: "antenna",
        story:
          "On June 10, 2018 (Sol 5111), Opportunity transmitted its final engineering packet to Earth via the Deep Space Network antenna in Goldstone, California. The message contained stark data: the battery voltage was dropping dangerously low and atmospheric darkness was near absolute. After that transmission, the radio fell completely silent.",
        fact:
          "VERIFIED FACT: While an internet meme claimed the rover said 'My battery is low and it's getting dark', those were not actual spoken words; they were a popular translation of the raw engineering telemetry.",
      },
    ],
  },

  {
    id: 5,
    chapter: "CHAPTER 05 // THE LAST SIGNAL",
    title: "The Last Signal",
    hudCoordinates: "PERSEVERANCE VALLEY // PERMANENT SURFACE OUTPOST",
    dateStr: "FEBRUARY 13, 2019 — MISSION COMPLETE",
    intro:
      "For eight long months after the dust cleared, NASA engineers beamed more than a thousand recovery commands to Mars through the Deep Space Network. They played wake-up songs over mission control radios. They listened for the faintest whisper on emergency backup frequencies. But Opportunity never responded.",
    question: "When an exploration machine falls silent on another world, what does it leave behind?",
    choices: [
      {
        id: "mission-conclusion",
        label: "THE OFFICIAL FAREWELL",
        icon: "⭐",
        actionType: "camera",
        targetId: "pancam",
        story:
          "On February 13, 2019, inside the Space Flight Operations Facility at NASA JPL, mission manager John Callas officially declared Opportunity's mission complete. The rover's last confirmed contact was Sol 5111 (June 10, 2018)—approximately 14 years and 136 days after landing on January 25, 2004. The final song played over mission control speakers was 'I'll Be Seeing You' by Billie Holiday, NASA's farewell transmission on February 12, 2019.",
        fact:
          "VERIFIED FACT: Opportunity was designed for a 90-sol mission. It operated for 5,111 sols—over 55 times its planned lifetime—before the 2018 dust storm ended its mission.",
      },
      {
        id: "permanent-sanctuary",
        label: "RESTING IN PERSEVERANCE VALLEY",
        icon: "🏜",
        actionType: "hotspot",
        targetId: "solar-panels",
        story:
          "Today, Opportunity rests on the gentle slope of Perseverance Valley, overlooking the vast expanse of Endeavour Crater. A fine veil of reddish dust coats its solar panels and camera lenses. Mars has a thin CO₂ atmosphere—too thin to breathe but enough to carry dust and cause slow weathering over geological timescales. Opportunity will remain on that hillside for an extraordinarily long time, changing far more slowly than any artifact left on Earth.",
        fact:
          "VERIFIED FACT: NASA's Curiosity and Perseverance rovers later built upon Opportunity's discoveries, carrying nuclear power generators (RTGs) so global dust storms can never silence them.",
      },
      {
        id: "lasting-discoveries",
        label: "THE SCIENTIFIC LEGACY",
        icon: "📜",
        actionType: "story",
        story:
          "Opportunity fundamentally advanced human understanding of Mars. At Meridiani Planum, it found strong evidence that ancient Mars once hosted liquid water—acidic and briny—that soaked the crust and left behind hematite spherules and sulfate-rich evaporite rocks. This was not the whole story of Mars: later missions like Curiosity and Perseverance explored different sites with evidence of more varied aqueous environments. But Opportunity's discoveries were the first definitive in-situ proof that liquid water once existed on another planet.",
        fact:
          "VERIFIED FACT: Hundreds of peer-reviewed scientific papers have been published directly using data gathered by Opportunity's instruments, reshaping the field of Mars geology.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// HOTSPOT DOSSIER DATA
// ─────────────────────────────────────────────

export const HOTSPOT_DATA: Record<string, HotspotDetail> = {
  pancam: {
    title: "Pancam Stereo Camera Mast",
    category: "MULTISPECTRAL STEREOSCOPIC VISION SYSTEM",
    identity:
      "A 1.5-meter-tall mast mounting twin high-resolution CCD cameras with 16 selectable color filters and stereo separation.",
    functionality:
      "Captured true-color 3D panoramas, measured atmospheric dust opacity, identified mineral targets, and planned safe navigation paths across boulder fields.",
    missionSignificance:
      "It gave humanity its first human-eye-level color vision on Mars, returning over 217,000 iconic images of Martian terrain.",
    specs: [
      { label: "Mast Height", value: "1.5 m (Eye level of human geologist)" },
      { label: "Camera Baseline", value: "30 cm stereoscopic separation" },
      { label: "Resolution", value: "1024 x 1024 pixels per image" },
      { label: "Filters", value: "16 spectral geology & solar filters" },
    ],
    quote:
      "Through Pancam, scientists on Earth could construct precise 3D terrain maps of Mars, guiding the rover around dangerous sand dunes — the closest thing to standing on another planet.",
    details:
      "Pancam's stereo separation mimics human binocular vision, allowing scientists on Earth to construct precise 3D terrain maps to guide the rover around dangerous sand dunes.",
  },

  "solar-panels": {
    title: "Triple-Junction Solar Array Wings",
    category: "PHOTOVOLTAIC POWER GENERATION SYSTEM",
    identity:
      "Multifaceted winged panels of gallium arsenide triple-junction photovoltaic cells covering 1.3 square meters across the rover's chassis.",
    functionality:
      "Converted Martian sunlight into electrical energy to charge two 8-amp-hour lithium-ion batteries and run survival heaters.",
    missionSignificance:
      "Originally warrantied for 90 sols due to dust accumulation, periodic Martian dust devils swept the panels clean, extending the mission to over 14 years. The 2018 global dust storm reduced solar input to nearly zero (tau >10), triggering the fault that ultimately ended the mission.",
    specs: [
      { label: "Array Area", value: "1.3 m² (14 sq ft)" },
      { label: "Peak Clean Output", value: "~900 Watt-hours per sol" },
      { label: "Terminal Output", value: "<22 Watt-hours (2018 Dust Storm)" },
      { label: "Cell Technology", value: "Triple-Junction Gallium Arsenide" },
    ],
    quote:
      "Every time engineers thought dust accumulation would end the mission, a Martian dust devil swept the panels clean — unexpectedly extending the rover's productive life time and again.",
    details:
      "The solar panels were configured like folding wings during landing and deployed after touchdown. Dust devils unexpectedly cleaned the panels dozens of times during the mission.",
  },

  wheels: {
    title: "Rocker-Bogie 6-Wheel Mobility",
    category: "AUTONOMOUS TERRAIN TRAVERSE SYSTEM",
    identity:
      "Six independently driven cleated aluminum wheels mounted on an articulated rocker-bogie titanium suspension linkage.",
    functionality:
      "Maintained equal ground pressure across all six wheels without springs, allowing the rover to climb over 25-centimeter obstacles and traverse 30-degree slopes.",
    missionSignificance:
      "Carried Opportunity across 45.16 kilometers (28.06 miles) — the longest off-Earth journey in human exploration history at the time. That record was surpassed by NASA's Perseverance rover in October 2026.",
    specs: [
      { label: "Wheel Diameter", value: "25 cm (10 inches)" },
      { label: "Wheel Material", value: "Machined aircraft-grade aluminum" },
      { label: "Total Distance", value: "45.16 km (Former off-Earth record)" },
      { label: "Top Speed", value: "5 cm/sec (0.18 km/h)" },
    ],
    quote:
      "45 kilometers on wheels designed for a 600-meter warranty — Opportunity's aluminum cleats traced a path across Mars that no machine had ever matched, a record it held for over 8 years.",
    details:
      "Each wheel was equipped with spiral cleats for biting into soft drift sand. In April–June 2005, the rover was trapped for approximately 6 weeks (38 Martian sols) in a sandy ripple nicknamed 'Purgatory Dune' before engineers carefully extracted it.",
  },

  arm: {
    title: "Instrument Deployment Device (IDD)",
    category: "5-AXIS GEOLOGICAL ROBOTIC MANIPULATOR",
    identity:
      "A 5-degree-of-freedom robotic arm carrying a four-instrument science turret at its wrist.",
    functionality:
      "Positioned the Microscopic Imager, Mössbauer Spectrometer, Alpha Particle X-Ray Spectrometer (APXS), and diamond-tipped Rock Abrasion Tool (RAT) directly against rocks.",
    missionSignificance:
      "Grinded open ancient sulfate rocks in Eagle and Endurance craters, uncovering the chemical fingerprint of past Martian liquid water.",
    specs: [
      { label: "Degrees of Freedom", value: "5 articulated joints" },
      { label: "Payload Turret", value: "RAT, APXS, Mössbauer, Microscopic Imager" },
      { label: "Grinder Bit", value: "Diamond-impregnated resin wheel" },
      { label: "Microscope Resolution", value: "30 microns per pixel" },
    ],
    quote:
      "The robotic arm was Opportunity's geologist hand — scraping, sensing, and magnifying ancient Martian rock to reveal the chemical fingerprints of a wetter past.",
    details:
      "The Rock Abrasion Tool ground 5-centimeter-diameter holes up to 5 mm deep into rocks, removing billions of years of dust to reveal fresh interior crystals.",
  },

  antenna: {
    title: "High-Gain Steerable Dish Antenna",
    category: "DEEP SPACE COMMUNICATIONS TERMINAL",
    identity:
      "A 28-centimeter steerable parabolic dish antenna operating on X-band frequencies (7–8 GHz).",
    functionality:
      "Pointed directly at Earth to transmit telemetry and scientific data directly to NASA's Deep Space Network dishes in California, Spain, and Australia.",
    missionSignificance:
      "Beamed over 217,000 photos and the final Sol 5111 engineering transmission across 100+ million kilometers of interplanetary space.",
    specs: [
      { label: "Dish Diameter", value: "28 cm (11 inches)" },
      { label: "Frequency Band", value: "X-band (Deep Space Network)" },
      { label: "Direct-to-Earth Rate", value: "Up to 28,000 bits per second" },
      { label: "Final Signal Date", value: "June 10, 2018 (Sol 5111)" },
    ],
    quote:
      "For 14 years, the X-band carrier signal from across the solar system connected a small robot on Mars to a team of engineers on Earth — one of the longest-running deep-space conversations in history.",
    details:
      "In addition to the steerable high-gain dish, Opportunity carried an omnidirectional low-gain antenna and a UHF antenna for relaying data through Mars Odyssey and MRO satellites.",
  },

  blueberries: {
    title: "Hematite Spherules ('Martian Blueberries')",
    category: "IN-SITU WATER-FORMED GEOLOGICAL CONCRETIONS",
    identity:
      "Millimeter-sized spherical beads of crystalline grey hematite (Fe2O3) weathered out of sulfate-rich sedimentary rocks.",
    functionality:
      "Served as natural mineral barometers recording the presence of ancient, acidic, mineral-rich groundwater in Mars's early history.",
    missionSignificance:
      "Provided humanity's first undisputed chemical and physical evidence that ancient acidic liquid water once existed on Mars at Meridiani Planum.",
    specs: [
      { label: "Average Size", value: "1 to 5 mm in diameter" },
      { label: "Composition", value: "Crystalline Grey Hematite" },
      { label: "Formation Mechanism", value: "Groundwater sediment precipitation" },
      { label: "Discovery Site", value: "Eagle Crater, Meridiani Planum" },
    ],
    quote:
      "These tiny iron spheres are the calling card of liquid water on Mars — formed in ancient, acidic, mineral-rich groundwater that once soaked the bedrock of Meridiani Planum.",
    details:
      "On Earth, identical hematite concretions form when groundwater rich in dissolved iron flows through porous sandstone. As the rock erodes away, the hard iron beads accumulate on the ground like loose marbles.",
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
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#140806] border border-amber-500/30 shadow-[0_0_80px_rgba(245,158,11,0.2)] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2 font-mono text-[11px] tracking-[0.25em] text-amber-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          MARS INVESTIGATION LOG
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">Mission Journal</h3>
        <p className="text-xs text-slate-400 font-mono mb-5">
          Opportunity Reconstructed Field Records • {discoveredHotspots.length} of {totalItems} Discoveries Logged
        </p>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
            style={{
              width: `${Math.round((discoveredHotspots.length / totalItems) * 100)}%`,
              boxShadow: "0 0 10px #f59e0b",
            }}
          />
        </div>

        {/* Artifact list */}
        <div className="space-y-3 mb-6">
          {Object.entries(HOTSPOT_DATA).map(([id, h]) => {
            const isUnlocked = discovered.has(id);
            return (
              <div
                key={id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isUnlocked
                    ? "bg-amber-950/30 border-amber-500/35 text-white"
                    : "bg-white/[0.02] border-white/5 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-base ${isUnlocked ? "text-amber-400" : "text-slate-600"}`}>
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
                    className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[10px] font-mono uppercase tracking-wider text-amber-300 cursor-pointer"
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
          Return to Mars Exploration
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SOURCES & FACT-CHECK MODAL
// ─────────────────────────────────────────────

interface SourcesModalProps {
  onClose: () => void;
}

function SourcesModal({ onClose }: SourcesModalProps) {
  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#140806] border border-amber-500/30 shadow-[0_0_80px_rgba(245,158,11,0.2)] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2 font-mono text-[11px] tracking-[0.25em] text-amber-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          SOURCES &amp; FACT CHECKS
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">References</h3>
        <p className="text-xs text-slate-400 font-mono mb-5">
          Fact-checked: 14 November 2026 — All content cross-referenced against NASA primary sources.
        </p>

        <div className="space-y-4 mb-6">
          {/* Primary source */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-400/25">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold mb-1">
              PRIMARY SOURCE
            </div>
            <div className="text-xs font-semibold text-white mb-1">
              NASA Opportunity Mission Archive
            </div>
            <a
              href="https://www.nasa.gov/mission/mars-exploration-rover-opportunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline break-all"
            >
              https://www.nasa.gov/mission/mars-exploration-rover-opportunity/
            </a>
            <p className="text-[10px] text-slate-400 mt-1 font-sans">
              Mission history, telemetry records, instrument specifications, and science findings for the Mars Exploration Rover Opportunity (MER-B).
            </p>
          </div>

          {/* Driving record update */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-400/25">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold mb-1">
              DRIVING RECORD UPDATE — OCTOBER 2026
            </div>
            <div className="text-xs font-semibold text-white mb-1">
              NASA Perseverance Surpasses Off-Earth Driving Record
            </div>
            <a
              href="https://www.nasa.gov/mars-exploration/perseverance/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline break-all"
            >
              https://www.nasa.gov/mars-exploration/perseverance/
            </a>
            <p className="text-[10px] text-slate-400 mt-1 font-sans">
              On approximately 11 October 2026, NASA&apos;s Perseverance rover reached ~45.22 km (28.10 miles), surpassing Opportunity&apos;s record of 45.16 km (28.06 miles) that had stood for over 8 years. Opportunity remains the former record holder.
            </p>
          </div>

          {/* Key facts verified */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-400/25">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold mb-2">
              KEY FACTS VERIFIED
            </div>
            <ul className="space-y-1.5 text-[10px] font-sans text-slate-300">
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Landing: January 25, 2004 — Eagle Crater, Meridiani Planum</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Planned mission: 90 Martian sols (~92 Earth days)</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Final contact: June 10, 2018 (Sol 5111) — global dust storm</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Mission declared complete: February 13, 2019 (after 1,000+ unanswered contact attempts)</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Total operating time: approximately 14 years, 136 days (Sol 5111 operated)</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Total distance driven: 45.16 km (28.06 miles)</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Marathon milestone (42.195 km): March 24, 2015</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Purgatory Dune entrapment: April–June 2005, ~38 Martian sols (~6 weeks)</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Peak solar output: ~900 watt-hours per sol</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Water evidence: acidic, briny ancient groundwater at Meridiani Planum (not freshwater)</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Mars atmosphere: thin CO₂, ~0.6% of Earth&apos;s pressure — not airless</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">✓</span> Final farewell song: &quot;I&apos;ll Be Seeing You&quot; by Billie Holiday, played February 12, 2019</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <p className="text-[10px] font-mono text-slate-400 leading-relaxed">
              <span className="text-amber-300 font-semibold">Educational Project — </span>
              Silent Explorers is an independent educational project. Content is not affiliated with or endorsed by NASA.
              Quotations in this experience are paraphrased educational narration, not verbatim statements, unless explicitly cited.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer"
        >
          Return to Mars Exploration
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN STORY OVERLAY FOR OPPORTUNITY
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
  const [showSources, setShowSources] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set(["solar-panels"]));

  const scene = STORY_SCENES.find((s) => s.id === currentScene) || STORY_SCENES[0];
  const hotspot = activeHotspot && HOTSPOT_DATA[activeHotspot] ? HOTSPOT_DATA[activeHotspot] : null;

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoiceId(choice.id);
    if (choice.targetId) {
      setDiscovered((prev) => new Set([...prev, choice.targetId!]));
      onSelectHotspot(choice.targetId);
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
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl backdrop-blur-xl bg-[#140806]/85 border border-white/10 hover:border-amber-400/50 hover:bg-[#200d09] transition-all text-white no-underline group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <span className="text-amber-400 group-hover:-translate-x-1 transition-transform">←</span>
          <div className="text-left font-mono leading-none">
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 block mb-0.5 hidden sm:block">
              SILENT EXPLORERS
            </span>
            <span className="text-xs font-bold text-slate-100 tracking-wider block group-hover:text-amber-300">
              <span className="hidden sm:inline">Return to </span>Catalog
            </span>
          </div>
        </Link>

        {/* Center Mission Badge */}
        <div className="hidden md:flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-xl bg-[#140806]/85 border border-amber-500/30 font-mono text-xs text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-bold tracking-widest text-white">OPPORTUNITY</span>
          <span className="text-white/20">|</span>
          <span className="tracking-wider text-slate-300">MERIDIANI PLANUM</span>
          <span className="text-white/20">|</span>
          <span className="text-amber-400/90">{scene.hudCoordinates}</span>
        </div>

        {/* Right Header Section: Controls & NASA Source Badge */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5">
          {/* Mission Journal */}
          <button
            onClick={() => setShowJournal(true)}
            className="relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl backdrop-blur-xl bg-[#140806]/85 border border-white/10 hover:border-amber-400/50 hover:bg-[#200d09] text-[11px] sm:text-xs font-mono tracking-wider text-slate-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <span className="hidden sm:inline">Mission </span>Journal
            {discovered.size > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-[9px] font-black text-slate-950 shadow-[0_0_8px_#f59e0b]">
                {discovered.size}
              </span>
            )}
          </button>

          {/* Timeline Modal Toggle */}
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="hidden sm:block px-3.5 py-2 rounded-xl backdrop-blur-xl bg-[#140806]/85 border border-white/10 hover:border-amber-400/50 hover:bg-[#200d09] text-xs font-mono tracking-wider text-slate-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            Timeline
          </button>

          {/* Free Orbit Toggle */}
          <button
            onClick={onToggleFreeOrbit}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl backdrop-blur-xl border text-[11px] sm:text-xs font-mono tracking-wider transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
              freeOrbit
                ? "bg-amber-500/25 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                : "bg-[#140806]/85 border-white/10 text-slate-300 hover:border-amber-400/40"
            }`}
          >
            {freeOrbit ? "Free Cam" : "Orbit"}
          </button>

          {/* ── NASA SOURCE IDENTIFICATION BADGE ─────── */}
          <div className="relative group">
            <a
              href="https://science.nasa.gov/mission/mer-opportunity/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Official NASA Opportunity Mission Records"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl backdrop-blur-xl bg-[#1a0a07]/90 border border-amber-400/40 hover:border-amber-400 hover:bg-[#2b100b] transition-all text-white no-underline shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-400 shrink-0"
              >
                <circle cx="12" cy="12" r="4" fill="#f59e0b" fillOpacity="0.3" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" stroke="#fcd34d" />
                <circle cx="19" cy="8.5" r="1.5" fill="#ffffff" />
              </svg>

              <div className="text-left font-mono leading-tight">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-amber-400 block font-semibold">
                  NASA SOURCE
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-200 tracking-wider flex items-center gap-1 group-hover:text-white">
                  RECORDS <span className="text-amber-400">↗</span>
                </span>
              </div>
            </a>

            {/* Disclaimer Tooltip */}
            <div className="absolute right-0 top-full mt-2 w-56 p-2.5 rounded-xl backdrop-blur-2xl bg-[#140806]/95 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-[10px] font-mono text-slate-400 leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              <span className="text-amber-300 font-semibold block mb-0.5">SOURCE ATTRIBUTION</span>
              Flight telemetry, hematite blueberry spectroscopy, and terrain records referenced from NASA Mars Exploration Rover archives.
              <div className="text-[9px] text-slate-500 mt-1 border-t border-white/5 pt-1">
                An independent educational project. Not affiliated with or endorsed by NASA.
              </div>
            </div>
          </div>

          {/* Sources & Fact Checks Button */}
          <button
            onClick={() => setShowSources(true)}
            className="hidden sm:block px-3.5 py-2 rounded-xl backdrop-blur-xl bg-[#140806]/85 border border-amber-400/30 hover:border-amber-400/60 hover:bg-[#200d09] text-xs font-mono tracking-wider text-amber-300 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            Sources
          </button>
        </div>
      </header>

      {/* ── RIGHT ARTIFACT SELECTOR PILLS (Floating absolute, non-intrusive) ─────────────────── */}
      <aside className="pointer-events-auto fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-1.5 max-w-xs">
        <div className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase text-right pr-2 mb-1">
          Examine Systems
        </div>
        {[
          { id: "pancam", label: "Pancam Stereo Mast" },
          { id: "solar-panels", label: "Solar Array Wings" },
          { id: "wheels", label: "Rocker-Bogie 6-Wheels" },
          { id: "arm", label: "Robotic Arm & RAT" },
          { id: "antenna", label: "High-Gain Dish Antenna" },
          { id: "blueberries", label: "Hematite Blueberries" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setDiscovered((prev) => new Set([...prev, item.id]));
              onSelectHotspot(item.id);
            }}
            className={`text-right px-3.5 py-1.5 rounded-lg backdrop-blur-md text-xs font-mono transition-all cursor-pointer border ${
              activeHotspot === item.id
                ? "bg-amber-500/25 border-amber-400 text-amber-200 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                : discovered.has(item.id)
                ? "bg-black/50 border-amber-400/30 text-slate-300 hover:border-amber-400/60 hover:text-white"
                : "bg-black/50 border-white/10 text-slate-400 hover:border-amber-400/40 hover:text-white"
            }`}
          >
            {discovered.has(item.id) && activeHotspot !== item.id && (
              <span className="mr-1.5 text-amber-400 text-[10px]">✓</span>
            )}
            {item.label}
          </button>
        ))}
      </aside>

      {/* ── BOTTOM CINEMATIC STORY PANEL (Fixed bottom, bounded height, sticky controls) ──────────────────────── */}
      <footer className="pointer-events-auto fixed bottom-2.5 sm:bottom-5 left-2.5 sm:left-6 right-2.5 sm:right-auto sm:w-[680px] lg:w-[760px] max-w-[calc(100vw-20px)] sm:max-w-3xl z-40 story-panel-scroll">
        <div
          data-prevent-scene-wheel="true"
          className="rounded-2xl backdrop-blur-2xl bg-[#140806]/96 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative overflow-hidden flex flex-col h-auto max-h-[calc(100dvh-100px)] sm:max-h-[calc(100dvh-90px)] min-h-0"
        >
          {/* Top amber gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80 z-10 shrink-0" />

          {/* Sticky Header inside Chapter Panel */}
          <div className="p-3 sm:px-6 sm:pt-4 sm:pb-2.5 border-b border-white/[0.06] shrink-0 bg-[#140806]/90 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
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
                        ? "w-6 sm:w-8 bg-amber-400 shadow-[0_0_10px_#f59e0b]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-1.5">
              <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-tight">
                {scene.title}
              </h2>
              <span className="text-[9px] sm:text-[11px] font-mono text-slate-400 tracking-wider">
                {scene.dateStr}
              </span>
            </div>
          </div>

          {/* Scrollable Body */}
          <div
            className="p-3.5 sm:px-6 sm:py-3.5 overflow-y-auto chapter-scroll-area flex-1 min-h-0 overscroll-contain select-text"
            style={{ WebkitOverflowScrolling: "touch" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Intro paragraph */}
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3">
              {scene.intro}
            </p>

            {/* Suspense curiosity question */}
            <p className="text-amber-300 text-xs font-mono italic mb-4 pl-3 border-l-2 border-amber-400/50">
              {scene.question}
            </p>

            {/* Action buttons */}
            {!activeChoice && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                {scene.choices.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleChoiceClick(c)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left text-xs font-mono tracking-wide transition-all cursor-pointer ${
                      discovered.has(c.targetId || c.id)
                        ? "bg-amber-950/40 border-amber-400/40 text-amber-300 hover:border-amber-400 hover:bg-amber-950/60"
                        : "bg-white/5 border-white/10 text-slate-300 hover:border-amber-400/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-amber-400 text-base leading-none shrink-0">{c.icon}</span>
                    <span className="leading-tight font-semibold">{c.label}</span>
                    {discovered.has(c.targetId || c.id) && (
                      <span className="ml-auto text-amber-400 text-[10px]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Interactive Revelation Panel */}
            {activeChoice && (
              <div className="mb-2 rounded-xl bg-amber-950/25 border border-amber-400/30 p-3.5 sm:p-4 relative animate-fade-in">
                <button
                  onClick={() => setSelectedChoiceId(null)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-white text-xs font-mono cursor-pointer transition-colors"
                >
                  ✕ dismiss
                </button>

                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <span>{activeChoice.icon}</span> {activeChoice.label}
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-3 font-light">
                  {activeChoice.story}
                </p>

                <div className="rounded-lg bg-black/50 border border-amber-500/20 px-3 py-2">
                  <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block mb-0.5 font-bold">
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
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 hover:border-amber-400/50 bg-black/40 text-[10px] font-mono text-slate-300 hover:text-white cursor-pointer transition-all"
                      >
                        <span>{c.icon}</span> {c.label}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Persistent Fixed Footer inside Chapter Panel */}
          <div className="p-2.5 sm:px-6 sm:py-3 border-t border-white/[0.08] bg-[#100604]/98 shrink-0 flex items-center justify-between gap-2 sm:gap-3">
            <button
              onClick={() => handleSetScene(Math.max(1, currentScene - 1))}
              disabled={currentScene === 1}
              className={`px-3 sm:px-4 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                currentScene === 1
                  ? "opacity-30 border-white/5 cursor-not-allowed text-slate-500"
                  : "bg-white/5 border-white/10 hover:border-amber-400/50 text-slate-200 active:scale-95"
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
                  : "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-95"
              }`}
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </footer>

      {/* ── ARTIFACT DOSSIER MODAL ────────────────────────────── */}
      {hotspot && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="max-w-xl w-full rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#140806] border border-amber-500/40 shadow-[0_0_60px_rgba(245,158,11,0.25)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseHotspot}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase mb-1">
              {hotspot.category}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{hotspot.title}</h3>

            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-400/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-1">
                  1. Identification
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">{hotspot.identity}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-400/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-1">
                  2. Operational Function
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">{hotspot.functionality}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-400/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-1">
                  3. Mission Significance
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">{hotspot.missionSignificance}</p>
              </div>
            </div>

            <blockquote className="border-l-2 border-amber-400 pl-4 py-1 italic text-slate-300 text-xs mb-5 bg-amber-950/15 leading-relaxed">
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
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}

      {/* ── MISSION TIMELINE MODAL ───────────────────────────── */}
      {showTimeline && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8 backdrop-blur-2xl bg-[#140806] border border-amber-500/25 shadow-[0_0_80px_rgba(245,158,11,0.2)] relative">
            <button
              onClick={() => setShowTimeline(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center font-mono cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase mb-2">
              HISTORICAL MISSION TELEMETRY // 2003–2019
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">Opportunity Mission Timeline</h3>

            <div className="space-y-6 border-l-2 border-amber-500/30 pl-6 ml-2 font-mono">
              <div>
                <div className="text-xs text-amber-400 font-bold">JULY 7, 2003</div>
                <div className="text-sm text-white font-semibold mb-1">Launch from Cape Canaveral</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  A Boeing Delta II Heavy rocket launched MER-B on a 456-million-kilometer interplanetary cruise to Mars.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">JANUARY 25, 2004 — 05:05 UTC</div>
                <div className="text-sm text-white font-semibold mb-1">Touchdown in Eagle Crater</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Airbag bouncing landing in Meridiani Planum, scoring a direct &ldquo;hole-in-one&rdquo; inside a 22-meter crater.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">FEBRUARY–MARCH 2004</div>
                <div className="text-sm text-white font-semibold mb-1">Discovery of Hematite Blueberries</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Confirmation of ancient acidic liquid groundwater evidence, completing primary science objectives in under 60 sols.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">APRIL–JUNE 2005</div>
                <div className="text-sm text-white font-semibold mb-1">Purgatory Dune Entrapment</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Opportunity became stuck in a sandy ripple (&ldquo;Purgatory Ripple&rdquo;) for approximately 38 Martian sols (~6 weeks) before engineers extracted it.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">SEPTEMBER 2006 — AUGUST 2008</div>
                <div className="text-sm text-white font-semibold mb-1">Victoria Crater Campaign</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Two-year exploration of a 750-meter-wide crater, descending hazardous cliff slopes to study ancient sedimentary layers.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">AUGUST 2011</div>
                <div className="text-sm text-white font-semibold mb-1">Arrival at Endeavour Crater</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Reached the massive 22-kilometer ancient impact basin, discovering gypsum veins formed in neutral water.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">MARCH 24, 2015</div>
                <div className="text-sm text-white font-semibold mb-1">First Off-Earth Marathon (42.195 km)</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  Became the first vehicle to drive a marathon distance beyond Earth, passing 42.195 km after 11 years on Mars.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">JUNE 10, 2018 (SOL 5111)</div>
                <div className="text-sm text-white font-semibold mb-1">Final Telemetry Transmission</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  A planet-encircling global dust storm reduced solar input to nearly zero (tau &gt;10), silencing the rover in Perseverance Valley.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">FEBRUARY 13, 2019</div>
                <div className="text-sm text-white font-semibold mb-1">Mission Declared Complete</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  After sending over 1,000 recovery signals, NASA concluded the mission, celebrating approximately 14 years and 136 days of groundbreaking exploration.
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-400 font-bold">OCTOBER 2026</div>
                <div className="text-sm text-white font-semibold mb-1">Perseverance Surpasses Opportunity&apos;s Driving Record</div>
                <div className="text-xs text-slate-400 font-sans font-light">
                  NASA&apos;s Perseverance rover reached approximately 45.22 km (28.10 miles), surpassing Opportunity&apos;s record of 45.16 km that had stood for over 8 years. Opportunity remains the former record holder and a landmark in planetary exploration.
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

      {/* ── SOURCES & FACT CHECKS MODAL ──────────────────────── */}
      {showSources && <SourcesModal onClose={() => setShowSources(false)} />}
    </div>
  );
}
