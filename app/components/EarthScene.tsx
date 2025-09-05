import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Iss } from "./Iss";
import { Earth } from "./Earth";

// Lighting Setup Component
const SceneLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
    </>
  );
};

// Stars Background Component
const SpaceBackground: React.FC = () => {
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
const CameraControls: React.FC = () => {
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
const UIOverlay: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
          Earth & Satellite System
        </h1>
        <p className="text-lg text-gray-300 text-center mt-2">
          Explore our planet with an orbiting 3D satellite model in space
        </p>
      </div>

      {/* Controls Info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
            <p className="text-center">
              🖱️ Drag to orbit • 🎯 Scroll to zoom • ⌨️ Right-click to pan
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Scene Component
export const EarthScene = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* UI Overlay */}
      <UIOverlay />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
      >
        {/* Lighting Setup */}
        <SceneLighting />

        {/* Space Background */}
        <SpaceBackground />

        {/* Earth */}
        <Earth />

        {/* Orbiting 3D Model */}
        <Iss />

        {/* Camera Controls */}
        <CameraControls />
      </Canvas>
    </div>
  );
};
