import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  return [{ slug: "home" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const draft = await draftMode();
  const { data } = await fetchStoryblokStory("home", draft.isEnabled);
  if (!data?.story) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
  return {
    title: data.story.name,
    description: data.story.content?.meta_description,
  };
}
export default async function HomePage() {
  const draft = await draftMode();
  const { data } = await fetchStoryblokStory("home", draft.isEnabled);
  if (!data?.story) notFound();

  return <StoryblokStory story={data.story} />;
}
