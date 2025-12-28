"use client";

import { MAXTOWERHEIGHT, TOTALCARDHEIGHT, TOWERGAP } from "@/data/constants";
import CaseTower from "@/hooks/3D/CaseTower";
import { CaseOverview as CaseOverviewType } from "@/types";
import { calculateTowerLayot, getCameraPosition } from "@/utils/towerLayout";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import Link from "next/dist/client/link";
import { Suspense } from "react";
import IconButton from "./IconButton";
import { useData } from "@/providers/DataProvider";
import Icon from "./Icon";

export default function CaseOverview({ blok }: { blok: CaseOverviewType }) {
  /* TODO: ADD CHECKBOX INSTEAD OF ICON BUTTONS AND MAKE THE ACTUAL FILTERING WORK */
  const totalCards = blok.cases.filter(
    (item) => typeof item !== "string",
  ).length;
  const { datasourceObject } = useData();
  const services = datasourceObject.services.map((service) => ({
    label: service.name,
    value: service.value,
  }));

  const towers = calculateTowerLayot(totalCards, MAXTOWERHEIGHT);
  const maxHeightOfTowers = Math.max(...towers.map((tower) => tower.height));

  const cameraPosition = getCameraPosition(towers.length, maxHeightOfTowers);
  return (
    <div className="h-screen pt-[10vh]">
      <Canvas camera={{ position: cameraPosition, fov: 30 }}>
        <OrbitControls target={[0, 0, 0]} />
        <Suspense>
          <ambientLight intensity={1} />
          <directionalLight position={[20, 30, 10]} intensity={1} castShadow />
          <Physics>
            <RigidBody type="fixed" colliders="cuboid">
              <mesh>
                <boxGeometry args={[150, 1, 150]} />
                <meshStandardMaterial color="#EAFFB4" />
              </mesh>
            </RigidBody>
            <CaseTower blok={blok} />
          </Physics>
        </Suspense>
      </Canvas>

      <div className="fixed bottom-4 left-4">
        <div className="rounded-md bg-white p-4">
          <div className="flex col-flex items-center gap-8">

          <h3>What services are you looking for?</h3>
          {/* <Icon id="chevronDownIcon" /> */}
          </div>

          <ul>
            {services.map((service, index) => (
              <li key={index}>
                <IconButton
                  icon="chevronDownIcon"
                  label={service.label}
                  trailingIcon={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
