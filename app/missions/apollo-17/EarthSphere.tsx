"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function EarthSphere() {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.02;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.026;
    }
  });

  return (
    // Earth positioned high in the lunar sky (~50 degrees elevation from Taurus-Littrow)
    <group position={[60, 48, -70]}>
      {/* Main Earth Body */}
      <group ref={earthRef} rotation={[0.4, 0.2, 0.2]}>
        <mesh>
          <sphereGeometry args={[7, 36, 36]} />
          <meshStandardMaterial
            color="#1d4ed8"
            roughness={0.65}
            metalness={0.1}
          />
        </mesh>

        {/* Continents overlay styling */}
        <mesh scale={[1.002, 1.002, 1.002]}>
          <sphereGeometry args={[7, 24, 24]} />
          <meshStandardMaterial
            color="#15803d"
            roughness={0.8}
            wireframe={false}
            transparent={true}
            opacity={0.7}
          />
        </mesh>

        {/* Clouds sphere */}
        <mesh ref={cloudsRef} scale={[1.015, 1.015, 1.015]}>
          <sphereGeometry args={[7, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.35}
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* Atmospheric Rayleigh Limb Glow */}
      <mesh scale={[1.08, 1.08, 1.08]}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent={true}
          opacity={0.22}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Subtle outer glow halo */}
      <mesh scale={[1.22, 1.22, 1.22]}>
        <sphereGeometry args={[7, 24, 24]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent={true}
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
