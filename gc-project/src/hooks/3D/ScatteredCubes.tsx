import { ISbStoryData } from "storyblok-js-client";
import CaseCube from "./CaseCube";
import { Case } from "@/types";
import { Vector3 } from "three";
import { useEffect, useMemo, useState } from "react";
import { CUBES_SPAWN_HEIGHT, CUBEWIDTH } from "@/data/constants";

type ScatteredCubesProps = {
  filteredCases: ISbStoryData<Case>[];
  fullListofCases: ISbStoryData<Case>[];
};

// example "uuid": "660452d2-1a68-4493-b5b6-2f03b6fa722b",
function cubeHashToFloat(str: string, index: number, min = 0, max = 1) {
  let hash = 0;
  const includeCubeIndexInHash = str + "-" + index;
  for (let i = 0; i < includeCubeIndexInHash.length; i++) {
    const char = includeCubeIndexInHash.charCodeAt(i);
    // create hash 31
    const hashTimes31 = hash * 32 - hash;
    hash = hashTimes31 + char;
    hash |= 0; // 32bit integer
  }
  const normalised = (hash % 1000) / 1000; // normalise to 0-1
  return min + normalised * (max - min);
}

export default function ScatteredCubes({
  filteredCases,
  fullListofCases,
}: ScatteredCubesProps) {
  const cubes = fullListofCases.filter((item) => typeof item !== "string");

  // to store the active cube id
  const [activeCubeId, setActiveCubeId] = useState<string | null>(null);



  const cubePositions = useMemo(() => {
    const positions: Record<string, Vector3> = {};
    fullListofCases.forEach((cube, index) => {
      if (typeof cube === "string") return;
      const CUBES_PER_RING = 6;
      // ring amount increases every 6 cubes
      // how many rings away from center
      const ring = Math.ceil(index / CUBES_PER_RING);
      const radius = 10 + ring * 8;
      // position of the cube in the ring
      const slot = index % CUBES_PER_RING;
      // get the angle around the ring
      const angle = (slot / CUBES_PER_RING) * Math.PI * 2;
      // make sure identical input produce identical output
      const offsetX = cubeHashToFloat(
        cube.uuid + "x",
        index,
        -CUBEWIDTH * 1.5,
        CUBEWIDTH * 1.5,
      );
      const offsetZ = cubeHashToFloat(
        cube.uuid + "z",
        index,
        -CUBEWIDTH * 1.5,
        CUBEWIDTH * 1.5,
      );
      const spawnY = CUBES_SPAWN_HEIGHT + ring * CUBEWIDTH;
      positions[cube.uuid] = new Vector3(
        Math.sin(angle) * radius + offsetX,
        spawnY,
        Math.cos(angle) * radius + offsetZ,
      );
    });
    return positions;
  }, [fullListofCases]);

  const cubeRotations = useMemo(() => {
    const rotations: Record<string, Vector3> = {};
    fullListofCases.forEach((cube, index) => {
      if (typeof cube === "string") return;
      const angle = (((index - 1) % 5) / 5) * Math.PI * 2;
      rotations[cube.uuid] = new Vector3(0, angle, 0);
    });
    return rotations;
  }, [fullListofCases]);

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
