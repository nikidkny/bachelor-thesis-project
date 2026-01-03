import { Case } from "@/types";
import { ISbStoryData } from "storyblok-js-client";
import { Vector3 } from "three";

export function calculateCubeRotations(fullListofCases: ISbStoryData<Case>[]) {
  const rotations: Record<string, Vector3> = {};
  fullListofCases.forEach((cube, index) => {
    if (typeof cube === "string") return;
    const angle = (((index - 1) % 5) / 5) * Math.PI * 2;
    rotations[cube.uuid] = new Vector3(0, angle, 0);
  });
  return rotations;
}
