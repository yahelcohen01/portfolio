import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars, useProgress } from "@react-three/drei";
import { Iss } from "./Iss";
import { Earth } from "./Earth";
import { Suspense, useState } from "react";

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
      <div className="absolute top-0 left-0 z-10 p-4 md:p-6 w-full bg-black/30 backdrop-blur-sm">
        <h1 className="text-xl md:text-3xl font-bold tracking-wider">
          International Space Station Tracker
        </h1>
        <p className="text-sm md:text-base text-gray-300">
          Watch the ISS orbiting Earth in real-time!
        </p>
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
