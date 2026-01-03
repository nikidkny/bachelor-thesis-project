import { ISbStoryData } from "storyblok-js-client";
import CaseCube from "./CaseCube";
import { Case } from "@/types";
import {  useMemo, useState } from "react";
import { calculateCubePositions } from "./calculateCubePositions";
import { calculateCubeRotations } from "./calculateCubeRotations";

type ScatteredCubesProps = {
  filteredCases: ISbStoryData<Case>[];
  fullListofCases: ISbStoryData<Case>[];
};



export default function ScatteredCubes({
  filteredCases,
  fullListofCases,
}: ScatteredCubesProps) {
  const cubes = fullListofCases.filter((item) => typeof item !== "string");
  // to store the active cube id
  const [activeCubeId, setActiveCubeId] = useState<string | null>(null);
  const cubePositions = useMemo(() => calculateCubePositions(fullListofCases), [fullListofCases]);
  const cubeRotations = useMemo(() => calculateCubeRotations(fullListofCases), [fullListofCases]);

  return (
    <group position={[8, 0, 5]}>
      {cubes.map((cube) => {
        return (
          <CaseCube
            key={cube.uuid}
            case={cube}
            rotation={cubeRotations[cube.uuid]}
            position={cubePositions[cube.uuid]}
            active={activeCubeId === cube.uuid}
            setActive={setActiveCubeId}
            visible={filteredCases.includes(cube)}
          />
        );
      })}
    </group>
  );
}
