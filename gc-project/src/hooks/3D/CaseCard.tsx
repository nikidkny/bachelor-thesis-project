"use client";
import { Case } from "@/types";
import { ISbStoryData } from "storyblok-js-client";
import { useMediaTexture } from "./useMediaTexture";
import { Mesh, Vector3 } from "three";
import * as THREE from "three";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { CARDDEPTH, CARDHEIGHT, CARDWIDTH } from "@/data/constants";
import { RigidBody } from "@react-three/rapier";

type CaseCardProps = {
  case: ISbStoryData<Case>;
  position: Vector3;
  rotation: Vector3;
};

export default function CaseCard({
  case: caseData,
  position,
  rotation,
}: CaseCardProps) {
  const router = useRouter();
  console.log(caseData);
  const meshRef = useRef<Mesh>(null);

  const frontUrl = caseData.content.cubeCover.filename;
  console.log(frontUrl);
  const { texture: frontTexture } = useMediaTexture(frontUrl ?? "");

  const materials = new THREE.MeshStandardMaterial({
    map: frontTexture,
  });
  if (!frontTexture) return null;

  //TODO: ADD IMAGE FILL SPACE CALCULATION

  return (
    <RigidBody
      type="dynamic"
      colliders="cuboid"
      // set these to false first for load then change to true later after delay
      enabledRotations={[false,false,false]}
      // this is to prevent movement
      enabledTranslations={[false,false,false]}
      // this is to prevent falling due to gravity
      gravityScale={0}
      position={position}
      rotation={[rotation.x, rotation.y, rotation.z]}
      mass={1}
      friction={0.7}
      restitution={0.2}
      // could add damping for stability
    >
      <mesh
        ref={meshRef}
        material={materials}
        castShadow
        receiveShadow
        onClick={(e) => {
          // this is so that the click only gets to the card and not the whole canvas (stop bubbling)
          e.stopPropagation();
          router.push(`${caseData.full_slug}`);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[CARDWIDTH, CARDHEIGHT, CARDDEPTH]} />
      </mesh>
    </RigidBody>
  );
}
