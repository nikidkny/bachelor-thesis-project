import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const { slug } = await params;

  const currentSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const { data } = await fetchStoryblokStory(currentSlug);
  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
