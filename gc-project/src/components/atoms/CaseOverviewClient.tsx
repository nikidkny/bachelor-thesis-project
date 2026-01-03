"use client";

import * as THREE from "three";
import { Case, CaseOverview as CaseOverviewType } from "@/types";
// import { calculateTowerLayot, getCameraPosition } from "@/utils/tower";
import { OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useMemo, useState } from "react";
import { useData } from "@/providers/DataProvider";
import CheckboxInput from "./CheckboxInput";
import { ISbStoryData } from "storyblok-js-client";
import IconButton from "./IconButton";
import ScatteredCubes from "@/hooks/3D/ScatteredCubes";
import Button from "./Button";
import classNames from "classnames";

export default function CaseOverview({ blok }: { blok: CaseOverviewType }) {
  /* TODO: ADD CHECKBOX INSTEAD OF ICON BUTTONS AND MAKE THE ACTUAL FILTERING WORK */
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [allCases] = useState(blok.cases);
  const [openFilter, setOpenFilter] = useState(false);
  const { datasourceObject } = useData();

  const toggleServiceCheckbox = (serviceValue: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceValue)
        ? prev.filter((sV) => sV != serviceValue)
        : [...prev, serviceValue],
    );
  };

  const services = datasourceObject.services.map((service) => ({
    label: service.name,
    value: service.value,
  }));
  // useMemo so that it only reruns if selectedServices changes
  const filteredCases = useMemo(
    () =>
      allCases.filter(
        // make sure that caseItem is the ISbStoryData<Case> type
        (caseItem): caseItem is ISbStoryData<Case> =>
          typeof caseItem !== "string" &&
          (selectedServices.length === 0 ||
            caseItem.content.services.some((service) =>
              selectedServices.includes(String(service)),
            )),
      ),
    [allCases, selectedServices],
  );
  // make the all cases also of type ISbStoryData<Case>[]
  const allCasesChosen = allCases.filter(
    (caseItem): caseItem is ISbStoryData<Case> => typeof caseItem !== "string",
  );

  function onKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
    serviceValue: string,
  ) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggleServiceCheckbox(serviceValue);
    }
  }
  return (
    <div className="h-screen pt-[10vh]">
      <Canvas
        camera={{ position: [10, 100, 120], fov: 30 }}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
      >
        <OrbitControls
          target={[0, 0, 0]}
          minDistance={40}
          maxDistance={200}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
        />
        <Suspense>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 30, 10]} intensity={1} castShadow />
          <Physics>
            <Suspense fallback={null}>
              <RigidBody type="fixed" friction={1}>
                <mesh receiveShadow position={[0, 0, 0]}>
                  <boxGeometry args={[175, 4, 175]} />
                  <meshStandardMaterial color="#EAFFB4" />
                </mesh>
              </RigidBody>
              <ScatteredCubes
                fullListofCases={allCasesChosen}
                filteredCases={filteredCases}
              />
              <Preload all />
            </Suspense>
          </Physics>
        </Suspense>
      </Canvas>
      <div className="fixed right-4 bottom-4 left-4 text-black sm:bottom-10 sm:w-1/2 md:right-0 md:bottom-16 md:w-1/3">
        <IconButton
          icon="filterIcon"
          onClick={() => setOpenFilter(!openFilter)}
          label="Filter"
          trailingIcon
          variant="filter"
          className="w-full"
          aria-label="Open filters"
          aria-expanded={openFilter}
        />
      </div>
      {openFilter && (
        <div className="fixed right-4 bottom-17 left-4 sm:bottom-24 sm:w-1/2 md:bottom-29 md:w-1/3">
          <div className="flex w-full flex-col gap-2 rounded-md bg-white p-6">
            <div className="flex flex-col">
              <div className="col-flex flex items-center justify-between gap-8">
                <h3 className="text-[20px]">What services are you looking for?</h3>
                <IconButton
                  icon="closeIcon"
                  onClick={() => setOpenFilter(false)}
                  variant="secondary"
                  aria-label="Close filters"
                />
              </div>
              <div className="flex items-start">
                <Button
                  variant="justText"
                  type="button"
                  className={classNames(
                    "flex w-full justify-start",
                    selectedServices.length === 0
                      ? "pointer-events-none text-black no-underline! opacity-50"
                      : "cursor-pointer !text-[#141414a8]",
                  )}
                  onClick={() => setSelectedServices([])}
                >
                  Clear filters
                </Button>
              </div>
            </div>
            <div className="group">
              <ul className="flex max-h-50 flex-col gap-1 overflow-y-auto">
                {services.map((service, index) => (
                  <li key={index} className="py-1">
                    <CheckboxInput
                      label={service.label}
                      name={service.value}
                      checked={selectedServices.includes(service.value)}
                      onChange={() => toggleServiceCheckbox(service.value)}
                      onKeyDown={(e) => onKeyDown(e, service.value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
