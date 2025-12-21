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
