import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DART (Dimorphos) — The Kinetic Impactor | SILENT EXPLORERS",
  description:
    "An immersive WebGL 3D museum experience exploring NASA's Double Asteroid Redirection Test (DART), the Didymos binary asteroid system, and humanity's first planetary defense collision.",
};

export default function DartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
