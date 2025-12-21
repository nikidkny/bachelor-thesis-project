import { ImageLoaderProps } from "next/image";

export function storyblokImageLoader({
  src,
  width,
  quality = 75,
}: ImageLoaderProps) {
  if (!src.startsWith("https://a.storyblok.com")) return src;

  const baseUrl = src.replace("a.storyblok.com", "img2.storyblok.com");

  return baseUrl.replace(
    "/f/",
    `/${width}x0/smart/filters:format(webp):quality(${quality})/f/`,
  );
}
