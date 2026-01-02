import { BreakpointsValues } from "@/types";

export const IMAGE_SIZES = {
  full: "100vw",
  half: "(min-width: 768px) 50vw, 100vw",
  third: "(min-width: 768px) 33vw, 100vw",
} as const;

/* Breakpoints */
export const BREAKPOINTS: Required<BreakpointsValues<number>>  = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// 3D Cube Constants
export const CUBEHEIGHT = 8;
export const CUBEWIDTH = 8;
export const CUBEDEPTH = 8;
export const GAP = 0.01;
export const TOTALCUBEHEIGHT = CUBEHEIGHT + GAP;
export const TOWERGAP= CUBEWIDTH + GAP;

// 3D Layout constants
export const GROUND_SIZE = 140;
export const CUBES_SPAWN_HEIGHT= 6;
export const MAX_CUBE_TO_CUBE_DISTANCE = 6;
