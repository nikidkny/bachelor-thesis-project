import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";
import { notFound } from "next/navigation";

export default async function CasesPage() {
  const { data } = await fetchStoryblokStory("cases");

  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
