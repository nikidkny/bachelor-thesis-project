import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

export default async function CasesPage() {
  const draft = await draftMode();
  const { data } = await fetchStoryblokStory("cases", draft.isEnabled);

  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
