// import { ISbLinksResult } from "storyblok-js-client";

import type { DataSourceEntryType } from "@/types";
import getStoryblokApi from "./api";

export type State = "INIT" | "LOADING" | "RESULTS" | "NO_RESULTS" | "ERROR";

// fetch a single story
export async function fetchStoryblokStory(slug: string) {
  const storyblokApi = getStoryblokApi();
  try {
    return await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "published",
    });
  } catch (error) {
    console.log("Failed to fetch a story", slug, error);
    return { data: null };
  }
}

// fetch all stories
export async function fetchStoryblokStories() {
  const storyblokApi = getStoryblokApi();
  try {
    return await storyblokApi.get("cdn/stories/", {
      starts_with: "cases/",
      version: "published",
    });
  } catch (error) {
    console.log("Failed to fetch all stories", error);
    return { data: null };
  }
}
