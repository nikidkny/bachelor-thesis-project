import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const { slug } = await params;
 if (!slug) {
    notFound();
  }
  const currentSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const draft = await draftMode();
  const { data } = await fetchStoryblokStory("cases/" + currentSlug,draft.isEnabled);
  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
