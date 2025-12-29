import StoryblokProvider from "@/providers/StoryblokProvider";
import "../styles/globals.css";
import {
  fetchStoryblokDatasource,
  fetchStoryblokStory,
} from "@/lib/storyblok";
import {
  Case,
  StoryblokDatasourceEntryType,
  Settings,
  StoryblokDatasourceObjectType,
} from "@/types";
import DataProvider from "@/providers/DataProvider";
import NavBar from "@/components/organisms/NavBar";
import GradientBackground from "@/hooks/3D/GradientBackground";
import { ISbStoryData } from "@storyblok/react/ssr";
import { draftMode } from "next/headers";

export const metadata = {
  title: "Good City portfolio platform",
  description:
    "Good City portfolio platform built with Next.js, Storyblok, Three.js and Tailwind CSS",
};

// Generic function to match datasource entries with stories - in case there are other datasources in future
const getStoriesMatchedWithDatasource = <T extends { [key: string]: any }>(
  datasource: StoryblokDatasourceEntryType[],
  stories: ISbStoryData<T>[],
  matchFieldKey: keyof T,
) => {
  return datasource.map((service) => {
    const matchedStories = stories.filter((story) => {
      const field = story.content[matchFieldKey];
      return Array.isArray(field) ? field.includes(service.value) : false;
    });
    return {
      ...service,
      stories: matchedStories,
    };
  });
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const draft = await draftMode();

  // fetch settings with fetchStoryblokStory
  const settings = await fetchStoryblokStory("settings", draft.isEnabled);
  const typedSettings = settings.data.story as ISbStoryData<Settings>;

  // fetch all cases with fetchstoryblokStories
  const allCases = await fetchStoryblokStory("cases", draft.isEnabled);
  const casesData = allCases.data.story.content.cases as ISbStoryData<Case>[];

  const services = await fetchStoryblokDatasource("services");

  const servicesWithCases = getStoriesMatchedWithDatasource(
    services,
    casesData,
    "services",
  );

  const dataSourceObject: StoryblokDatasourceObjectType = {
    services: servicesWithCases,
  };
  return (
    <html lang="en">
      <body>
        <GradientBackground />
        <DataProvider
          settings={typedSettings.content}
          datasourceObject={dataSourceObject}
          cases={casesData}
        >
          <NavBar settings={typedSettings} />
          <StoryblokProvider>{children}</StoryblokProvider>
        </DataProvider>
      </body>
    </html>
  );
}
