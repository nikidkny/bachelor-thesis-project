import { GAP, TOWERGAP, CARDHEIGHT, CARDWIDTH } from "@/data/constants";

// calculate the layout of a tower of cases
// prefer visually close to square towers
// make sure it can handle any number of cases
type TowerLayot = {
  height: number;
};

export function calculateTowerLayot(
  totalCards: number,
  maxTowerHeight: number,
): TowerLayot[] {
  if (totalCards <= 0) return [];

  // find the square root of total cards and round down as we need whole cards
  let towerNumber = Math.floor(Math.sqrt(totalCards));

  // but the towers cannot be taller than maxTowerHeight to make sure they fit in screen
  while (Math.ceil(totalCards / towerNumber) > maxTowerHeight) {
    towerNumber++;
  }

  // distribute cards into towers evenishly
  // each tower gets at least baseHeight cards, the first 'remainder' towers get one extra card
  const baseHeight = Math.floor(totalCards / towerNumber);
  const remainder = totalCards % towerNumber;

  // create the tower layout array
  const towers: TowerLayot[] = [];
  // fill the towers
  for (let i = 0; i < towerNumber; i++) {
    towers.push({
      height: baseHeight + (i < remainder ? 1 : 0),
    });
  }
  return towers;
}

// center horisonatlly the building layout in the space

export function getBuildingXPosition(towerNumber: number) {
  // create array of x positions
  const positions: number[] = [];
  // remove the gap at the edges times the gap+ the cardwidth
  const totalWidth = (towerNumber - 1) * TOWERGAP;

  const offsetX = totalWidth / 2;

  for (let i = 0; i < towerNumber; i++) {
    const x = i * TOWERGAP - offsetX;
    positions.push(x);
  }
  return positions;
}

// get the camera position based on the tower layout
export function getCameraPosition(towerNumbers: number, maxHeight: number):[number,number,number] {
  const witdthOfLayout = towerNumbers * TOWERGAP;
  const heightOfLayout = maxHeight * CARDHEIGHT;
  // if the layout is wider than taller then the camera should move back based on with
  // if the layout is taller than wider then camera moves based on height
  const distance = Math.max(witdthOfLayout, heightOfLayout) * 3;
  return [distance, distance * 0.75, distance];
}
