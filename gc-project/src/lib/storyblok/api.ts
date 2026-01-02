import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokClient from "storyblok-js-client";

import components from "./components";

storyblokInit({
  accessToken: process.env.NEXT_STORYBLOK_DELIVERY_API_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components,
});

export default function getStoryblokApi() {
  const accessToken = process.env.NEXT_STORYBLOK_DELIVERY_API_PREVIEW_TOKEN;

  return new StoryblokClient({
    accessToken,
    region: "eu",
  });
}
