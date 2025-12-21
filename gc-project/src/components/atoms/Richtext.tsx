import { StoryblokRichtext } from "@/types";
import { memo } from "react";
import { render } from "storyblok-rich-text-react-renderer";


function Richtext({document}:{document:StoryblokRichtext}){
    /* TODO: ADD LINK STYLING */
    return <div>{render(document)}</div>;
}

export default memo(Richtext);