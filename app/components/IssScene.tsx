"use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Line, useGLTF } from "@react-three/drei";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { EARTH_RADIUS_M, ecefFromTleNow, IssTle } from "@/app/lib/orbit";
// import * as THREE from "three";

// function useIssTle() {
//   const [tle, setTle] = useState<IssTle | null>(null);
//   useEffect(() => {
//     let active = true;
//     const load = async () => {
//       const res = await fetch("/api/tle");
//       const data = await res.json();
//       if (active && data.tle1 && data.tle2)
//         setTle({ tle1: data.tle1, tle2: data.tle2 });
//     };
//     load();
//     const id = setInterval(load, 1000 * 60 * 30); // refresh TLE every 30 min
//     return () => {
//       active = false;
//       clearInterval(id);
//     };
//   }, []);
//   return tle;
// }

// function Earth() {
//   // Simple Earth sphere with basic texture (optional: add night lights, clouds)
//   const texture = useMemo(
//     () => new THREE.TextureLoader().load("/textures/earth_day_4k.jpg"),
//     []
//   );
//   return (
//     <mesh>
//       <sphereGeometry args={[EARTH_RADIUS_M, 64, 64]} />
//       <meshStandardMaterial map={texture} />
//     </mesh>
//   );
// }

// function IssModel({ position }: { position: THREE.Vector3 }) {
//   const gltf = useGLTF("/models/ISS_stationary.glb") as { scene: THREE.Group };
//   const ref = useRef<THREE.Group>(null!);

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.position.copy(position);
//       // Rough orientation tweak so solar arrays look sensible
//       ref.current.lookAt(new THREE.Vector3(0, 0, 0));
//       ref.current.rotateX(Math.PI / 2);
//       ref.current.scale.setScalar(100); // scale glTF (model units vary)
//     }
//   });

//   return <primitive object={gltf.scene} ref={ref} />;
// }
// useGLTF.preload("/models/ISS_stationary.glb");

// function IssTracker() {
//   const tle = useIssTle();
//   const [pos, setPos] = useState<THREE.Vector3>(new THREE.Vector3());
//   const trailRef = useRef<THREE.Vector3[]>([]);
//   const [trail, setTrail] = useState<THREE.Vector3[]>([]);

//   // Update ISS position every animation frame using SGP4
//   useFrame(() => {
//     if (!tle) return;
//     const ecef = ecefFromTleNow(tle, new Date());
//     if (!ecef) return;

//     const v = new THREE.Vector3(ecef.x, ecef.y, ecef.z);
//     setPos(v);

//     // Maintain a short trail (e.g., last ~300 samples)
//     const arr = trailRef.current;
//     arr.push(v.clone());
//     if (arr.length > 300) arr.shift();
//     // Update the state less frequently to avoid rerender spam
//     if (arr.length % 5 === 0) setTrail([...arr]);
//   });

//   return (
//     <>
//       <ambientLight intensity={1.2} />
//       <directionalLight position={[1e7, 1e7, 1e7]} intensity={1.2} />

//       <Earth />
//       <IssModel position={pos} />

//       {/* Trail */}
//       {trail.length > 2 && (
//         <Line
//           points={trail}
//           linewidth={2}
//           worldUnits={true}
//           dashed={false}
//           opacity={0.9}
//           transparent
//         />
//       )}

//       <OrbitControls enablePan={false} />
//     </>
//   );
// }

// export function IssScene() {
//   // Fit the whole Earth in view
//   const camPos = EARTH_RADIUS_M * 3;
//   return (
//     <Canvas
//       camera={{ position: [camPos, camPos * 0.5, camPos], near: 1, far: 1e9 }}
//     >
//       <color attach="background" args={["#020617"]} />
//       <IssTracker />
//     </Canvas>
//   );
// }

import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";

// --- Type Definitions ---
interface ISSPosition {
  latitude: number;
  longitude: number;
  altitude: number;
}

interface ISSData extends ISSPosition {
  velocity: number;
  visibility: string;
  timestamp: number;
}

// --- Constants ---
const EARTH_RADIUS = 6371; // km
const ISS_ALTITUDE_SCALE = 1.05; // Slightly exaggerate altitude for visibility
const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";
const TRAIL_LENGTH = 200;

// --- Helper Functions ---
/**
 * Converts latitude and longitude to a 3D vector position.
 * The formula is adjusted for Three.js's coordinate system (Y-up).
 */
const latLonToVector3 = (
  lat: number,
  lon: number,
  radius: number
): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// --- React Components ---

/**
 * A custom loader component displayed via Suspense fallback.
 * It shows the loading progress of all assets.
 */
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

/**
 * The 3D model of the Earth, with day and night textures.
 */
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!);

  // Use absolute paths from the /public directory for local assets.
  const [dayMap] = useLoader(THREE.TextureLoader, [
    "/textures/earth_day_4k.jpg",
    "/textures/2k_earth_nightmap.jpg",
  ]);

  // Rotate the Earth to simulate day/night cycle
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    // A slow rotation for visualization
    earthRef.current.rotation.y = elapsed * 0.05;
  });

  return (
    <mesh ref={earthRef} scale={[2, 2, 2]}>
      {/* <sphereGeometry args={[1, 64, 64]} /> */}
      {/* Use MeshStandardMaterial for more realistic lighting */}
      {/* A second mesh for the night side with an emissive map */}
      <mesh
        rotation={
          earthRef.current?.rotation ? earthRef.current.rotation : [0, 0, 0]
        }
      >
        <meshStandardMaterial map={dayMap} metalness={0.2} roughness={0.7} />
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          emissive={new THREE.Color(0xaaaaaa)}
          emissiveMap={dayMap}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </mesh>
  );
}

/**
 * The 3D model of the ISS, its trail, and smooth position updates.
 */
function ISS({ position }: { position: ISSPosition }) {
  const { scene } = useGLTF("/models/ISS_stationary.glb");
  const issRef = useRef<THREE.Group>(null!);

  useGLTF.preload("/models/ISS_stationary.glb");

  // Preallocate buffer for trail
  const trailPositions = useMemo(() => new Float32Array(TRAIL_LENGTH * 3), []);
  const trailGeometryRef = useRef<THREE.BufferGeometry>(null!);
  const trailIndex = useRef(0);
  const pointCount = useRef(0);

  useFrame(() => {
    if (!issRef.current || !position || !trailGeometryRef.current) return;

    // Scale Earth radius
    const scaledRadius =
      ((2 * (EARTH_RADIUS + position.altitude)) / EARTH_RADIUS) *
      ISS_ALTITUDE_SCALE;
    const targetPosition = latLonToVector3(
      position.latitude,
      position.longitude,
      scaledRadius
    );

    // Smooth movement
    issRef.current.position.lerp(targetPosition, 0.1);
    issRef.current.lookAt(0, 0, 0);

    // Store position in preallocated buffer
    trailPositions[trailIndex.current * 3 + 0] = issRef.current.position.x;
    trailPositions[trailIndex.current * 3 + 1] = issRef.current.position.y;
    trailPositions[trailIndex.current * 3 + 2] = issRef.current.position.z;

    trailIndex.current = (trailIndex.current + 1) % TRAIL_LENGTH;
    pointCount.current = Math.min(pointCount.current + 1, TRAIL_LENGTH);

    // Update geometry attributes directly
    if (trailGeometryRef.current.attributes.position) {
      const posAttr = trailGeometryRef.current.attributes
        .position as THREE.BufferAttribute;
      posAttr.array.set(trailPositions);
      posAttr.needsUpdate = true;
      trailGeometryRef.current.setDrawRange(0, pointCount.current);
    }
  });

  return (
    <group ref={issRef}>
      <primitive object={scene} scale={0.003} rotation={[0, -Math.PI / 2, 0]} />
      <line>
        <bufferGeometry ref={trailGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="white" />
      </line>
    </group>
  );
}

/**
 * Main 3D scene component containing lights, models, and controls.
 */
function Scene({ issPosition }: { issPosition: ISSPosition | null }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Suspense fallback={<Loader />}>
        <Earth />
      </Suspense>

      <Suspense fallback={<Loader />}>
        {issPosition && <ISS position={issPosition} />}
      </Suspense>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        minDistance={2.5}
        maxDistance={20}
        zoomSpeed={0.8}
      />
    </>
  );
}

/**
 * The main application component that fetches data and renders the UI.
 */
export default function ISS_Tracker_App() {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        const data: ISSData = await response.json();
        setIssData(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        console.error("Failed to fetch ISS data:", err);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <main className="w-screen h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <header className="absolute top-0 left-0 z-10 p-4 md:p-6 w-full bg-black/30 backdrop-blur-sm">
        <h1 className="text-xl md:text-3xl font-bold tracking-wider">
          International Space Station Tracker
        </h1>
        <p className="text-sm md:text-base text-gray-300">
          Real-time 3D visualization
        </p>
      </header>

      <div className="flex-grow w-full h-full">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <Scene issPosition={issData} />
        </Canvas>
      </div>

      <footer className="absolute bottom-0 left-0 z-10 p-4 md:p-6 w-full bg-black/30 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm font-mono">
          {error ? (
            <div className="col-span-full text-red-400">Error: {error}</div>
          ) : issData ? (
            <>
              <p>
                <strong>Lat:</strong> {issData.latitude.toFixed(4)}
              </p>
              <p>
                <strong>Lon:</strong> {issData.longitude.toFixed(4)}
              </p>
              <p>
                <strong>Altitude:</strong> {issData.altitude.toFixed(2)} km
              </p>
              <p>
                <strong>Velocity:</strong> {issData.velocity.toFixed(2)} km/h
              </p>
            </>
          ) : (
            <p className="col-span-full">Fetching ISS data...</p>
          )}
        </div>
      </footer>
    </main>
  );
}
