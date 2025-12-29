// import { ISbLinksResult } from "storyblok-js-client";

import { StoryblokDatasourceEntryType } from "@/types";
import getStoryblokApi from "./api";

export type State = "INIT" | "LOADING" | "RESULTS" | "NO_RESULTS" | "ERROR";

export const resolveRelations = ["CaseOverview.cases"];

// fetch a single story
export async function fetchStoryblokStory(slug: string) {
  const storyblokApi = getStoryblokApi();
  try {
    return await storyblokApi.get(`cdn/stories/${slug}`, {
      // version: preview ? "draft" : "published",
      resolve_relations: resolveRelations,
    });
  } catch (error) {
    console.log("Failed to fetch a story", slug, error);
    return { data: null };
  }
}

// fetch all stories
export async function fetchStoryblokStories(slugs: string) {
  const storyblokApi = getStoryblokApi();
  try {
    return await storyblokApi.get("cdn/stories/", {
      starts_with: slugs,
      // version: preview ? "draft" : "published",
    });
  } catch (error) {
    console.log("Failed to fetch all stories", error);
    return { data: null };
  }
}

// fetch storyblok datasource entries
export async function fetchStoryblokDatasource(
  datasource: "services",){
  const storyblokApi = getStoryblokApi();
  try {
    const response = await storyblokApi.get("cdn/datasource_entries/", {
      datasource
    });
    return response.data.datasource_entries as StoryblokDatasourceEntryType[];
  } catch (error) {
   // TODO: handle error
     console.error("Failed to fetch datasources:", error);
    return [];
  }
}