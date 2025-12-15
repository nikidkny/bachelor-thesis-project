// import { ISbLinksResult } from "storyblok-js-client";

import type { DataSourceEntryType } from "@/types";
import getStoryblokApi from "./api";

export type State = "INIT" | "LOADING" | "RESULTS" | "NO_RESULTS" | "ERROR";

export const resolveRelations = ["CaseOverview.cases"];

// fetch a single story
export async function fetchStoryblokStory(slug: string, preview: boolean) {
  const storyblokApi = getStoryblokApi(preview);
  try {
    return await storyblokApi.get(`cdn/stories/${slug}`, {
      version: preview ? "draft" : "published",
      resolve_relations: resolveRelations,
    });
  } catch (error) {
    console.log("Failed to fetch a story", slug, error);
    return { data: null };
  }
}

// fetch all stories
export async function fetchStoryblokStories(slugs: "cases", preview: boolean) {
  const storyblokApi = getStoryblokApi(preview);
  try {
    return await storyblokApi.get("cdn/stories/", {
      starts_with: "cases/",
      version: preview ? "draft" : "published",
    });
  } catch (error) {
    console.log("Failed to fetch all stories", error);
    return { data: null };
  }
}
