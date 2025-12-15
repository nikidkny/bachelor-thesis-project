// Breakpoints
export type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl";
//
export type BreakpointsValues<T, WithMax extends boolean = false> = {
  [K in WithMax extends true
    ? Breakpoints | `max-${Breakpoints}`
    : Breakpoints]?: T;
};

export type BreakpointsMatches<WithMax extends boolean = false> =
  WithMax extends true
    ? Record<Breakpoint | `max-${Breakpoints}`, boolean>
    : Record<Breakpoint, boolean>;
