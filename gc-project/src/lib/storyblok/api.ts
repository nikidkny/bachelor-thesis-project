import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokClient from "storyblok-js-client";

import components from "./components";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_PUBLIC_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components,
});

export default function getStoryblokApi(isDev = false) {
  const accessToken = isDev
    ? process.env.STORYBLOK_DELIVERY_API_PREVIEW_TOKEN
    : process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_PUBLIC_TOKEN;

  return new StoryblokClient({
    accessToken,
    region: "eu",
  });
}
