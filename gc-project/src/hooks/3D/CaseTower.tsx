"use client";
import { useMemo } from "react";
import CaseCard from "./CaseCard";
import { CaseOverview as CaseOverviewType } from "@/types";
import { Vector3 } from "three";
import { calculateTowerLayot, getBuildingXPosition } from "@/utils/towerLayout";
import { MAXTOWERHEIGHT, TOTALCARDHEIGHT } from "@/data/constants";

type CaseTowerProps = {
  blok: CaseOverviewType;
};
// TODO: KEEP TOWERS AS "SQUARE" AS POSSIBLE AND MAKE SURE THAT IT FITS IN THE SCREEN

export default function CaseTower({ blok }: CaseTowerProps) {
  const cards = useMemo(
    () => blok.cases.filter((item) => typeof item !== "string"),
    [blok.cases],
  );
  const towers = useMemo(
    () => calculateTowerLayot(cards.length, MAXTOWERHEIGHT),
    [cards.length],
  );

  const xPositions = getBuildingXPosition(towers.length);

//   console.log("towers", towers);
//   console.log("xPositions", xPositions);

  let cardIndex = 0;
  return (
    <group>
      {towers.map((tower, index) => (
        <group key={index} position={[xPositions[index], 5, 0]}>
          {Array.from({ length: tower.height }).map((_, storey) => {
            const card = cards[cardIndex++];
            if (!card) return null;

            return (
              <CaseCard
                key={card.uuid}
                case={card}
                position={new Vector3(0, storey * TOTALCARDHEIGHT, 0)}
                rotation={new Vector3(0, 0, 0)}
              />
            );
          })}
        </group>
      ))}
    </group>
  );
}
