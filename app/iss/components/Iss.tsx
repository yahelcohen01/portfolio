import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as satellite from "satellite.js";
import * as THREE from "three";
import { useIssTle } from "@shared/hooks";
import { useIssStore } from "../stores/iss.store";

interface IssProps {
  modelUrl?: string;
  earthSceneRadius?: number; // scene units (your Earth sphere radius, default 2)
  orbitWindowMinutes?: number; // how many minutes ahead to draw the path
  orbitSampleSeconds?: number; // sample step in seconds
}

export const Iss = ({
  modelUrl = "/models/ISS_stationary.glb",
  earthSceneRadius = 2,
  orbitWindowMinutes = 90,
  orbitSampleSeconds = 15,
}: IssProps) => {
  console.log("Rendering ISS");
  const { scene: issScene } = useGLTF(modelUrl) as any;
  const issRef = useRef<THREE.Object3D | null>(null);

  const { tleLoaded, satrec } = useIssTle();

  const R_EARTH_KM = 6371;
  const scale = earthSceneRadius / R_EARTH_KM;

  const orbitGeomRef = useRef<THREE.BufferGeometry | null>(null);
  const orbitPositionsRef = useRef<Float32Array | null>(null);
  const orbitSampleCountRef = useRef<number>(0);

  // init orbit geometry
  useEffect(() => {
    const windowSeconds = orbitWindowMinutes * 60;
    const samples = Math.ceil(windowSeconds / orbitSampleSeconds) + 1;
    orbitSampleCountRef.current = samples;

    const positions = new Float32Array(samples * 3);
    orbitPositionsRef.current = positions;

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setDrawRange(0, 0);
    orbitGeomRef.current = geom;
  }, [orbitWindowMinutes, orbitSampleSeconds]);

  const recomputeOrbitPath = () => {
    const geom = orbitGeomRef.current;
    const positions = orbitPositionsRef.current;
    if (!satrec || !geom || !positions) return;

    const windowSeconds = orbitWindowMinutes * 60;
    const samples = Math.ceil(windowSeconds / orbitSampleSeconds) + 1;

    // ensure positions buffer big enough
    if (positions.length < samples * 3 && orbitGeomRef.current) {
      orbitPositionsRef.current = new Float32Array(samples * 3);
      orbitGeomRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(orbitPositionsRef.current, 3)
      );
    }

    const now = new Date();
    let written = 0;
    // lastValid will be used to fill gaps
    const lastValid = new THREE.Vector3(Number.NaN, Number.NaN, Number.NaN);

    for (let i = 0; i < samples; i++) {
      const t = new Date(now.getTime() + i * orbitSampleSeconds * 1000);
      const prop = satellite.propagate(satrec, t);
      if (!prop || !prop.position) {
        // invalid propagation: if we have a last valid sample, copy it; otherwise skip
        if (
          Number.isFinite(lastValid.x) &&
          Number.isFinite(lastValid.y) &&
          Number.isFinite(lastValid.z)
        ) {
          const base = written * 3;
          positions[base] = lastValid.x;
          positions[base + 1] = lastValid.y;
          positions[base + 2] = lastValid.z;
          written++;
        }
        continue;
      }

      const gmst = satellite.gstime(t);
      const posEcf = satellite.eciToEcf(prop.position, gmst);
      const x = posEcf.x * scale;
      const y = posEcf.z * scale;
      const z = -posEcf.y * scale;

      // guard against NaN/infinite values
      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
        console.warn("skipping invalid sample at index", i);
        if (
          Number.isFinite(lastValid.x) &&
          Number.isFinite(lastValid.y) &&
          Number.isFinite(lastValid.z)
        ) {
          const base = written * 3;
          positions[base] = lastValid.x;
          positions[base + 1] = lastValid.y;
          positions[base + 2] = lastValid.z;
          written++;
        }
        continue;
      }

      lastValid.set(x, y, z);
      const base = written * 3;
      positions[base] = x;
      positions[base + 1] = y;
      positions[base + 2] = z;
      written++;
    }

    // don't call computeBoundingSphere if nothing valid
    if (written === 0) {
      geom.setDrawRange(0, 0);
      return;
    }

    geom.setDrawRange(0, written);
    const attr = geom.getAttribute("position") as THREE.BufferAttribute;
    attr.needsUpdate = true;
    // compute bounding sphere now that we have valid values
    geom.computeBoundingSphere();
    (geom as any).__orbitSampleCount = written;
  };

  // Start recompute interval once TLE loaded
  useEffect(() => {
    if (!tleLoaded) return;
    // compute immediately
    recomputeOrbitPath();
    const id = window.setInterval(() => {
      recomputeOrbitPath();
    }, 1000 * 1); // every 1s
    return () => clearInterval(id);
  }, [tleLoaded, orbitWindowMinutes, orbitSampleSeconds]);

  // Live update ISS position each frame
  useFrame(() => {
    if (!satrec || !issRef.current) return;

    const now = new Date();
    const prop = satellite.propagate(satrec, now);
    if (!prop) return;
    const positionEci = prop.position;
    const velocityEci = prop.velocity;
    if (!positionEci || !velocityEci) return;

    const gmst = satellite.gstime(now);
    const posEcf = satellite.eciToEcf(positionEci, gmst);
    const velEcf = satellite.eciToEcf(velocityEci, gmst);

    const geo = satellite.eciToGeodetic(positionEci, gmst);
    const latDeg = (geo.latitude * 180) / Math.PI;
    const lonDeg = (geo.longitude * 180) / Math.PI;
    const altKm = geo.height;

    const velKmPerS =
      Math.sqrt(
        velocityEci.x * velocityEci.x +
          velocityEci.y * velocityEci.y +
          velocityEci.z * velocityEci.z
      ) || 0;
    const speedKmh = velKmPerS * 3600;

    // map to three coords
    const xThree = posEcf.x * scale;
    const yThree = posEcf.z * scale;
    const zThree = -posEcf.y * scale;

    if (
      Number.isFinite(xThree) &&
      Number.isFinite(yThree) &&
      Number.isFinite(zThree)
    ) {
      issRef.current.position.set(xThree, yThree, zThree);
    } else {
      console.warn("Received invalid ISS position this frame, skipping.");
    }

    // orient model
    const vxThree = velEcf.x * scale;
    const vyThree = velEcf.z * scale;
    const vzThree = -velEcf.y * scale;
    const velVec = new THREE.Vector3(vxThree, vyThree, vzThree);
    if (velVec.length() > 0.000001) {
      const up = new THREE.Vector3(0, 1, 0);
      const m = new THREE.Matrix4();
      m.lookAt(new THREE.Vector3(0, 0, 0), velVec.clone().normalize(), up);
      const q = new THREE.Quaternion();
      q.setFromRotationMatrix(m);
      issRef.current.quaternion.copy(q);
    }

    useIssStore.getState().setInfo({
      lat: latDeg,
      lon: lonDeg,
      altKm,
      speedKmh,
      positionKm: {
        x: posEcf.x,
        y: posEcf.y,
        z: posEcf.z,
      },
    });
  });

  return (
    <>
      <group ref={issRef} scale={[0.002, 0.002, 0.002]}>
        <primitive object={issScene} />
      </group>

      {orbitGeomRef.current && (
        <primitive
          object={
            new THREE.Line(
              orbitGeomRef.current,
              new THREE.LineBasicMaterial({
                color: 0x4a90e2,
                transparent: true,
                opacity: 0.95,
                linewidth: 2,
              })
            )
          }
          frustumCulled={false}
          renderOrder={1}
        />
      )}
    </>
  );
};
