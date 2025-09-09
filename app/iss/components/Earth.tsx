import { useLoader } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface EarthProps {
  textureUrl?: string;
}

export const Earth = ({
  textureUrl = "/textures/earth_day_4k.jpg",
}: EarthProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const earthTexture = useLoader(THREE.TextureLoader, textureUrl);

  const earthMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 0.1,
    });
  }, [earthTexture]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <primitive object={earthMaterial} attach="material" />
    </mesh>
  );
};
