import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStoryblokStory } from "@/lib/storyblok/fetch";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { draftMode } from "next/headers";

interface PaageProps {
   params: Promise<{ slug: string }> 
}


export async function generateStaticParams() {
  return [{ slug: "contact" }, { slug: "about" }];
}

export async function generateMetadata({params}: PaageProps): Promise<Metadata> {
    const { slug } = await params;
  const draft = await draftMode();
  const { data } = await fetchStoryblokStory(slug, draft.isEnabled);
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


export default async function ContactPage({params}: PaageProps) {
  const { slug } = await params;
  const draft = await draftMode();
  const { data } = await fetchStoryblokStory(slug, draft.isEnabled);
  if (!data?.story) notFound();

  return <StoryblokStory story={data.story} />;
}
