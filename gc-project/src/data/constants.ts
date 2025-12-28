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


export const CARDHEIGHT = 8;
export const CARDWIDTH = 8;
export const CARDDEPTH = 8;
export const GAP = 0.01;
export const TOTALCARDHEIGHT = CARDHEIGHT + GAP;
export const TOWERGAP= CARDWIDTH + 1.5;
export const MAXTOWERHEIGHT= 6;