"use client";
import { Case } from "@/types";
import { ISbStoryData } from "storyblok-js-client";
import { useMediaTexture } from "./useMediaTexture";
import { Mesh, Vector3 } from "three";
import * as THREE from "three";
import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CUBEDEPTH, CUBEHEIGHT, CUBEWIDTH } from "@/data/constants";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import { formatDatasourceNames } from "@/utils/formatDatasourceNames";
import Tag from "@/components/atoms/Tag";
import Link from "next/link";
import IconButton from "@/components/atoms/IconButton";

type CaseCardProps = {
  case: ISbStoryData<Case>;
  position: Vector3;
  rotation: Vector3;
  visible: boolean;
  active: boolean;
  setActive: (id: string | null) => void;
};

export default function CaseCube({
  case: caseData,
  position,
  rotation,
  setActive,
  active,
  visible,
}: CaseCardProps) {
  const cubeRef = useRef<RapierRigidBody>(null);
  const router = useRouter();
  // console.log(caseData);
  const meshRef = useRef<Mesh>(null);

  const frontUrl = caseData.content.cubeCover.filename;
  // console.log(frontUrl);
  const { texture: frontTexture } = useMediaTexture(frontUrl ?? "");

  const materials = new THREE.MeshBasicMaterial({
    map: frontTexture,
  });

  //TODO: ADD IMAGE FILL SPACE CALCULATION

  // lifting effect
  useEffect(() => {
    if (!active) return;
    if (!cubeRef.current) return;
    // console.log("applying impulse to cube", caseData.uuid);
    if (active) {
      cubeRef.current.setLinvel({ x: 0, y: 15, z: 0 }, true);
    } else {
      cubeRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  }, [active]);

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const [setInitialPosition] = useState(position);
  if (!frontTexture) return null;

  return (
    <RigidBody
      ref={cubeRef}
      type="dynamic"
      colliders="cuboid"
      position={setInitialPosition}
      rotation={[rotation.x, rotation.y, rotation.z]}
      // continuous collision detection -> prevents object passing through one anoter
      ccd
      // set these to false first for load then change to true later after delay
      // enabledRotations={[false,false,false]}
      // this is to prevent movement
      // enabledTranslations={[false,false,false]}
      // this is falling due to gravity
      gravityScale={10}
      mass={1}
      friction={0.8}
      //bounciness of the cube
      restitution={0}
      // could add damping for stability
      angularDamping={0.4}
      linearDamping={0.3}
    >
      <Html
        position={[10, 10, 0]}
        // tabIndex={0}
        center
        distanceFactor={80}
        style={{
          pointerEvents: isTouchDevice ? "auto" : "none",
          display: active ? "block" : "none",
          // transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div
          role="region"
          aria-label={`Case: ${caseData.name}. Services: ${caseData.content.services.join(", ")}`}
          className="flex w-fit flex-col rounded-sm bg-white p-2 shadow-md"
        >
          <div className="flex justify-between">
            <h3 className="text-[16px]">{caseData.name}</h3>
            <IconButton
              icon="closeIcon"
              className={isTouchDevice ? "block" : "hidden"}
              onClick={() => setActive(null)}
              aria-label="Close Case short details"
            />
          </div>
          <ul className="flex max-w-[75vw] flex-wrap gap-2 sm:flex-nowrap">
            {caseData.content.services.map((service, index) => {
              if (typeof service != "string") return null;
              // console.log("service", caseData);
              const formattedService = formatDatasourceNames(service);
              return (
                <Tag
                  key={index}
                  label={formattedService}
                  className="text-[12px]"
                />
              );
            })}
          </ul>
          {isTouchDevice && (
            <Link
              href={`${caseData.full_slug}`}
              className={"pt-4 text-[12px] underline"}
              aria-label={`View details for case ${caseData.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`${caseData.full_slug}`);
                }
              }}
            >
              View Details
            </Link>
          )}
        </div>
      </Html>
      {!isTouchDevice && (
        <Html
          role="region"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
            border: 0,
            padding: 0,
            margin: 0,
          }}
        >
          <div
            role="region" 
            aria-label={`Short intro to case called: ${caseData.name}`}>
            <div>
              <h3 className="text-[16px]" aria-label={`${caseData.name}`}>{caseData.name}</h3>
            </div>
            <ul aria-label={`List of services for case ${caseData.name}:`}>
              {caseData.content.services.map((service, index) => {
                if (typeof service != "string") return null;
                // console.log("service", caseData);
                const formattedService = formatDatasourceNames(service);
                return (
                  <Tag
                    key={index}
                    aria-label={`Service: ${formattedService}`}
                    label={formattedService}
                    className="text-[12px]"
                  />
                );
              })}
            </ul>
            <Link
              href={`${caseData.full_slug}`}
              className={"pointer-events-none opacity-0"}
              aria-label={`View details for case for the brand called ${caseData.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`${caseData.full_slug}`);
                }
              }}
            >
              View Details
            </Link>
          </div>
        </Html>
      )}

      <mesh
        ref={meshRef}
        visible={visible}
        material={materials}
        castShadow
        receiveShadow
        onClick={(e) => {
          // this is so that the click only gets to the card and not the whole canvas (stop bubbling)
          e.stopPropagation();
          document.body.style.cursor = "default";
          // for touch devices
          if (isTouchDevice) {
            setActive(active ? null : caseData.uuid);
            return;
          }

          router.push(`${caseData.full_slug}`);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!isTouchDevice) {
            document.body.style.cursor = "pointer";
            setActive(caseData.uuid);
          }
        }}
        onPointerLeave={() => {
          if (!isTouchDevice) {
            document.body.style.cursor = "default";
            setActive(null);
          }
        }}
      >
        <boxGeometry args={[CUBEWIDTH, CUBEHEIGHT, CUBEDEPTH]} />
      </mesh>
    </RigidBody>
  );
}
