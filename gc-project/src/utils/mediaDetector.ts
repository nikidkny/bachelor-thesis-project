import { StoryblokAsset } from "@/types";

export type AssetType = "image" | "video" | "model" | "unknown";

export function getMediaType(asset?: StoryblokAsset | undefined): AssetType {
  if (!asset?.filename) return "unknown";
    const extension = asset.filename.split(".").pop()?.toLowerCase();
    if (!extension) return "unknown";

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg", "webp"];
    const videoExtensions = ["mp4", "webm"];
    const modelExtensions = ["glb", "gltf"];

    if (imageExtensions.includes(extension)) {
        return "image";
    } else if (videoExtensions.includes(extension)) {
        return "video";
    } else if (modelExtensions.includes(extension)) {
        return "model";
    } else {
        return "unknown";
    }
}
