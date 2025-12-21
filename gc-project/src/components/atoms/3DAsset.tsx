"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { CanvasProps } from "@react-three/fiber";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { useEffect } from "react";
import { Group } from "three";

// props for the Model itself
type ModelProps = {
  url: string;
  onLoad?: (scene: Group) => void;
} & Omit<ThreeElements["primitive"], "object">;

// props for the Asset3D that include canvas
type Asset3DProps = {
  url: string;
  env?: string;
  modelProps?: Omit<ThreeElements["primitive"], "object">;
} & CanvasProps;

// load render 3D model
function Model({ url, onLoad, ...primitiveProps }: ModelProps) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    onLoad?.(scene);
  }, [scene, onLoad]);
  return <primitive object={scene} {...primitiveProps} />;
}

export default function ModelAsset({
  url,
  env,
  modelProps,
  ...CanvasProps
}: Asset3DProps) {
  return (
    <Canvas {...CanvasProps}>
      <Model url={url} {...modelProps} />
      <Environment files={env} />
    </Canvas>
  );
}
