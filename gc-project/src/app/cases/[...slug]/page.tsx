import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";
import { notFound } from "next/navigation";

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const { slug } = await params;

  const currentSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const { data } = await fetchStoryblokStory("cases/" + currentSlug);
  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
