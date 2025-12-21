import { IMAGE_SIZES } from "@/data/constants";

// Constants
export type ImageSizePresets = keyof typeof IMAGE_SIZES;
// Breakpoints
export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ObjectFit = "cover" | "contain" | "fill";

export type BreakpointsValues<T, WithMax extends boolean = false> = {
  [K in WithMax extends true
    ? Breakpoints | `max-${Breakpoints}`
    : Breakpoints]?: T;
};

export type BreakpointsMatches<WithMax extends boolean = false> =
  WithMax extends true
    ? Record<Breakpoints | `max-${Breakpoints}`, boolean>
    : Record<Breakpoints, boolean>;

// Datasource entry type
export interface StoryblokDatasourceEntryType {
  id: number;
  name: string;
  value: string;
  dimension_value: null | string; 
}


export interface StoryblokDatasourceObjectType {
  services:StoryblokDatasourceEntryType[]
}
