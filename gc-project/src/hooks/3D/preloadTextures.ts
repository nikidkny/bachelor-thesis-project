import { Case } from "@/types";
import { useTexture } from "@react-three/drei";
import { ISbStoryData } from "storyblok-js-client";

export function preloadTextures(cases: ISbStoryData<Case>[]) {
  const filenames = cases.map((c) => c.content.cubeCover.filename);
  const filteredFilenames = filenames.filter(Boolean);

  const urlMapped = filteredFilenames.map((filename) =>
    filename?.replace("a.storyblok", "a2.storyblok"),
  );

  const uniqueUrls = Array.from(new Set(urlMapped));


  uniqueUrls.forEach((url) => useTexture.preload(url!));
}
