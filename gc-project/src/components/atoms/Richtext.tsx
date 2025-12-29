import { StoryblokRichtext } from "@/types";
import { storyblokEditable } from "@storyblok/react";
import { memo } from "react";
import { render } from "storyblok-rich-text-react-renderer";


function Richtext({document}:{document:StoryblokRichtext}){
    /* TODO: ADD LINK STYLING */
    return <div {...storyblokEditable(document as any)}>{render(document)}</div>;
}

export default memo(Richtext);