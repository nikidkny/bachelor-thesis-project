import { StoryblokMultilink } from "@/types";

export interface ResolvedLink {
  href: string;
  target?: string;
  rel?: string;
}

export function resolveLink(
  storyblokLink?: StoryblokMultilink,
  href?: string,
): ResolvedLink | null {
  // internal story link
  if (storyblokLink) {
    if (storyblokLink.linktype === "story") {
      const cachedUrl = storyblokLink.cached_url;
      return {
        href: cachedUrl.startsWith("/") ? cachedUrl : `/${cachedUrl}`,
        target: storyblokLink.target ?? "_self",
        rel: storyblokLink.rel ?? undefined,
      };
    }
    if (storyblokLink.linktype === "url") {
      const url = storyblokLink.url;
      return {
        href: url,
        target: storyblokLink.target ?? "_self",
        rel: storyblokLink.rel ?? undefined,
      };
    }
    if (storyblokLink.linktype === "email") {
      const email = storyblokLink.email;
      return {
        href: `mailto:${email}`,
        target: "_blank",
        rel: storyblokLink.rel ?? undefined,
      };
    }
  }
  // extrernal link fallback
  if (href) {
    const isHttp = !!href?.match(/^http/);
    return {
      //  if the link is (http), use it as is, otherwise ensure it starts with /
      href: isHttp ? href : href.startsWith("/") ? href : `/${href}`,
      //open external links in a new tab
      target: isHttp ? "_blank" : "_self",
      // relationship attribute for external links
      rel: isHttp ? "noopener noreferrer" : undefined,
    };
  }
  return null;
}
