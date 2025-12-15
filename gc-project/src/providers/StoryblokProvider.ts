"use client";

import getStoryblokApi from "@/lib/storyblok/api";

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  getStoryblokApi();
  return children;
}

export default StoryblokProvider;
