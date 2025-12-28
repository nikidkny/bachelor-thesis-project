"use client";
import { AssetBlok as AssetBlokType, ObjectFit } from "@/types";
import { getMediaType } from "@/utils/mediaDetector";
import ImageAsset, { ImageAssetProps } from "./ImageAsset";
import VideoAsset, { VideoAssetProps } from "./VideoAsset";
// import ModelAsset from "./3DAsset";
import classNames from "classnames";
import ModelAsset from "./3DAsset";

/* TODO: CHECK 3D MODEL FROM SB */

export type AssetBlokProps = {
  blok: AssetBlokType;
  mediaRef?: React.Ref<HTMLImageElement | HTMLVideoElement >;
  imageProps?: Omit<
    ImageAssetProps,
    "asset" | "lazy" | "width" | "height" | "objectFit"
  >;
  videoProps?: Omit<
    VideoAssetProps,
    "asset"  | "lazy" | "width" | "height"
  >;
  width?: number;
  height?: number;
  lazy?: boolean;
  objectFit?: Extract<ObjectFit, "cover" | "contain" | "fill"> | "none";
  className?: string;
};

export default function AssetBlok({
  className,
  blok,
  mediaRef,
  imageProps,
  videoProps,
  width,
  height,
  lazy,
  objectFit = "none",
  ...props
}: AssetBlokProps) {
  const asset = blok.asset;
  const assetType = getMediaType(asset);

  if (!asset || assetType === "unknown") return null;
  if (!asset.filename) return null;
  return (
    <>
      {assetType === "image" && (
        <ImageAsset
          ref={mediaRef as React.Ref<HTMLImageElement>}
          asset={asset}
          lazy={lazy}
          width={width}
          height={height}
          className={classNames("relative size-full",{
            "object-cover": objectFit === "cover",
            "object-contain": objectFit === "contain",
            "object-fill": objectFit === "fill",
          }, className)}
          {...imageProps}
        />
      )}
      {assetType === "video" && (
        <VideoAsset
          ref={mediaRef as React.Ref<HTMLVideoElement>}
          src={asset.filename}
          width={width}
          height={height}
          className={classNames("relative size-full", className)}
          {...videoProps}
        />
      )}
      {assetType === "model" && (
            <ModelAsset
               url={asset.filename}
            />
        )}  
    </>
  );
}
