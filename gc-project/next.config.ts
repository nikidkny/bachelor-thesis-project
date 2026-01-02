import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img2.storyblok.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
