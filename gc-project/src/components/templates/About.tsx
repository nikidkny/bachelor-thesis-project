import { About as AboutType } from "@/types";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import Footer from "../organisms/Footer";

export default function About({ blok }: { blok: AboutType }) {
  return (
    <div>
      {blok.content?.map((nestedBlok) => (
        <StoryblokServerComponent key={nestedBlok._uid} blok={nestedBlok} />
      ))}
      <Footer  />
    </div>
  );
}
