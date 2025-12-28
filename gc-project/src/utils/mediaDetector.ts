import { StoryblokAsset } from "@/types";

export type AssetType = "image" | "video" | "model" | "unknown";

export const IMAGE_EXTENSIONS= ["jpg", "jpeg", "png", "gif", "svg", "webp"]
export const VIDEO_EXTENSIONS= ["mp4", "webm","mov"];
export const MODEL_EXTENSIONS = ["glb", "gltf"];

export function getMediaType(asset?: StoryblokAsset | undefined): AssetType {
  if (!asset?.filename) return "unknown";
    const extension = asset.filename.split(".").pop()?.toLowerCase();
    if (!extension) return "unknown";


    if (IMAGE_EXTENSIONS.includes(extension)) {
        return "image";
    } else if (VIDEO_EXTENSIONS.includes(extension)) {
        return "video";
    } else if (MODEL_EXTENSIONS.includes(extension)) {
        return "model";
    } else {
        return "unknown";
    }
}
