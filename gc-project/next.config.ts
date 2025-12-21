import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://a.storyblok.com/**"),
      new URL("https://img2.storyblok.com/**"),
    ],
  },
};

export default nextConfig;
