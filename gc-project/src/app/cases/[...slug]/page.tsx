import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";
import { notFound } from "next/navigation";

export default async function CasePage({
  params,
}: {
  params: { slug: string[] };
}) {

  const currentSlug = params.slug.join("/");
  const { data } = await fetchStoryblokStory("cases/" + currentSlug);
  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
