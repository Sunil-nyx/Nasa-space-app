import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opportunity (MER-B) — The Machine That Refused to Stop | SILENT EXPLORERS",
  description:
    "An immersive WebGL 3D museum experience exploring NASA's Mars Exploration Rover Opportunity in Meridiani Planum, hematite blueberries, and 14 years of Martian exploration.",
};

export default function OpportunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
