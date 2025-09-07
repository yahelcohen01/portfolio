import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars, useProgress } from "@react-three/drei";
import { Iss } from "./Iss";
import { Earth } from "./Earth";
import { Suspense, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";

// Lighting Setup Component
const SceneLighting = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
    </>
  );
};

// Stars Background Component
const SpaceBackground = () => {
  return (
    <Stars
      radius={300}
      depth={60}
      count={20000}
      factor={7}
      saturation={0}
      fade={true}
    />
  );
};

// Camera Controls Component
const CameraControls = () => {
  return (
    <OrbitControls
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      zoomSpeed={0.6}
      panSpeed={0.5}
      rotateSpeed={0.4}
      minDistance={3}
      maxDistance={20}
    />
  );
};

// UI Overlay Component
const UIOverlay = (issData: {
  lat: number;
  lon: number;
  altKm: number;
  speedKmh: number;
  positionKm: {
    x: number;
    y: number;
    z: number;
  };
}) => {
  return (
    <>
      {/* Header */}
      <div className="absolute top-0 left-0 z-10 p-4 md:p-6 w-full bg-black/30 backdrop-blur-sm flex justify-between items-center">
        <div>
          <Breadcrumbs autoGenerate showHomeIcon={false} />
          <h1 className="text-xl md:text-3xl font-bold tracking-wider">
            International Space Station Tracker
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Watch the ISS orbiting Earth in real-time!
          </p>
        </div>
        <Link
          href="https://github.com/yahelcohen01/portfolio/tree/main/app/iss"
          className="flex items-center hover:underline transition text-white"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </Link>
      </div>

      {/* Controls Info */}
      <div className="absolute bottom-0 left-0 z-10 p-4 md:p-6 w-full bg-black/30 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm font-mono">
          <p>
            <strong>Lat:</strong> {issData.lat.toFixed(4)}
          </p>
          <p>
            <strong>Lon:</strong> {issData.lon.toFixed(4)}
          </p>
          <p>
            <strong>Altitude:</strong> {issData.altKm.toFixed(2)} km
          </p>
          <p>
            <strong>Velocity:</strong> {issData.speedKmh.toFixed(2)} km/h
          </p>
        </div>
      </div>
    </>
  );
};

function Loader() {
  const { progress, item } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center text-lg font-mono">
        <p>{Math.round(progress)}% loaded</p>
        {item && <p>Loading: {item}</p>}
      </div>
    </Html>
  );
}

// Main Scene Component
export const EarthScene = () => {
  const [issInfo, setIssInfo] = useState({
    lat: 0,
    lon: 0,
    altKm: 0,
    speedKmh: 0,
    positionKm: { x: 0, y: 0, z: 0 },
  });

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* UI Overlay */}
      <UIOverlay {...issInfo} />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
      >
        {/* Lighting Setup */}
        <SceneLighting />

        {/* Space Background */}
        <SpaceBackground />

        <Suspense fallback={<Loader />}>
          {/* Earth */}
          <Earth />
        </Suspense>

        <Suspense fallback={<Loader />}>
          {/* Orbiting 3D Model */}
          <Iss setIssInfo={setIssInfo} />
        </Suspense>

        {/* Camera Controls */}
        <CameraControls />
      </Canvas>
    </div>
  );
};
