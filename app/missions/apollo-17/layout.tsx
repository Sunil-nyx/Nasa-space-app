import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apollo 17 — The Machines We Left Behind | SILENT EXPLORERS",
  description:
    "An immersive WebGL 3D museum experience exploring the Apollo 17 Challenger lunar landing site, the Taurus-Littrow valley, and the machines left behind on the Moon.",
};

export default function Apollo17Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
