"use client";
import { AssetBlok as AssetBlokType, ObjectFit } from "@/types";
import { getMediaType } from "@/utils/mediaDetector";
import ImageAsset, { ImageAssetProps } from "./ImageAsset";
import VideoAsset, { VideoAssetProps } from "./VideoAsset";
// import ModelAsset from "./3DAsset";
import classNames from "classnames";
import ModelAsset from "./3DAsset";
import { storyblokEditable } from "@storyblok/react";

/* TODO: CHECK 3D MODEL FROM SB */

export type AssetBlokProps = {
  blok: AssetBlokType;
  mediaRef?: React.Ref<HTMLImageElement | HTMLVideoElement>;
  imageProps?: Omit<
    ImageAssetProps,
    "asset" | "lazy" | "width" | "height" | "objectFit"
  >;
  videoProps?: Omit<VideoAssetProps, "asset" | "lazy" | "width" | "height">;
  width?: number | `${number}`;
  height?: number | `${number}`;
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
  objectFit = "contain",
  ...props
}: AssetBlokProps) {
  const asset = blok.asset;
  const assetType = getMediaType(asset);

  if (!asset || assetType === "unknown") return null;
  if (!asset.filename) return null;
  return (
    <div className="size-full" {...props}>
      {assetType === "image" && (
        <ImageAsset
          ref={mediaRef as React.Ref<HTMLImageElement>}
          asset={asset}
          width={width}
          height={height}
          lazy={assetType === "image" ? lazy : false}
          className={classNames(
            "relative size-full",
            {
              "object-cover": objectFit === "cover",
              "object-contain": objectFit === "contain",
              "object-fill": objectFit === "fill",
              "object-none": objectFit === "none",
            },
            className,
          )}
          {...storyblokEditable(blok as any)}
          {...imageProps}
        />
      )}
      {assetType === "video" && (
        <VideoAsset
          ref={mediaRef as React.Ref<HTMLVideoElement>}
          src={asset.filename}
          width={width}
          height={height}
          className={classNames(
            "relative size-full",
            {
              "object-cover": objectFit === "cover",
              "object-contain": objectFit === "contain",
              "object-fill": objectFit === "fill",
              "object-none": objectFit === "none",
            },
            className,
          )}
          {...storyblokEditable(blok as any)}
          {...videoProps}
          autoPlay
        />
      )}
      {assetType === "model" && (
        <ModelAsset url={asset.filename} {...storyblokEditable(blok as any)} />
      )}
    </div>
  );
}
