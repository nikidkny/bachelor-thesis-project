// "use client";

// import { Case } from "@/types";
// import {
//   calculateTowerLayot,
//   getBuildingXPosition,
//   getCardsInWeakZone,
// } from "@/utils/tower";
// import {
//   MAXTOWERHEIGHT,
//   TOTALCARDHEIGHT,
//   TOWER_WEAK_ZONE,
// } from "@/data/constants";
// import { ISbStoryData } from "storyblok-js-client";
// import { Vector3 } from "three";
// import CaseCard from "./CaseCard";
// import { useEffect, useRef } from "react";
// import { RapierRigidBody } from "@react-three/rapier";

// type CaseTowerProps = {
//   cases: ISbStoryData<Case>[];
// };
// export default function CaseTower({ cases }: CaseTowerProps) {
//   const cards = cases.filter((item) => typeof item !== "string");
//   const towers = calculateTowerLayot(cards.length, MAXTOWERHEIGHT);
//   const xPositions = getBuildingXPosition(towers.length);

//   const cardRefs = useRef<RapierRigidBody[]>([]);

//   let cardIndex = 0;
//   return (
//     <group>
//       {towers.map((tower, index) => (
//         <group key={index} position={[xPositions[index], 5, 0]}>
//           {Array.from({ length: tower.height }).map((_, storey) => {
//             const currentIndex = cardIndex;
//             const card = cards[cardIndex++];
//             console.log("currentIndex", currentIndex, "cardIndex", cardIndex);
//             if (!card) return null;

//             return (
//               <CaseCard
//                 ref={(rb) => {
//                   if (rb) cardRefs.current[currentIndex] = rb;
//                 }}
//                 key={card.uuid}
//                 case={card}
//                 position={new Vector3(0, storey * TOTALCARDHEIGHT, 0)}
//                 rotation={new Vector3(0, 0, 0)}
//                 isWeak={getCardsInWeakZone(currentIndex, cards.length)}
//               />
//             );
//           })}
//         </group>
//       ))}
//     </group>
//   );
// }
