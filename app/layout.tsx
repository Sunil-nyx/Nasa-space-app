import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SILENT EXPLORERS — The Machines Humanity Left Behind",
  description:
    "A cinematic archive honoring the robotic pioneers, landers, and orbiters permanently stationed across the solar system.",
  keywords: [
    "space exploration",
    "Mars rovers",
    "Apollo",
    "DART",
    "spacecraft",
    "lunar landers",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
