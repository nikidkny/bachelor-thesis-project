"use client";
import Image, { ImageProps } from "next/image";
import { storyblokImageLoader } from "@/lib/storyblok/imageLoader";
import { ImageSizePresets, StoryblokAsset } from "@/types";
import { forwardRef, memo } from "react";
import classNames from "classnames";
import { IMAGE_SIZES } from "@/data/constants";
/* TODO: FIX ASPECT RATIO WHEN SCALING */
export type ImageAssetProps = Omit<
  ImageProps,
  "src" | "loading" | "alt" | "sizes"
> & {
  asset: StoryblokAsset;
  lazy?: boolean;
  sizes?: ImageProps["sizes"];
  sizePreset?: ImageSizePresets;
  onLoad?: () => void;
};

const ImageAsset = forwardRef<HTMLImageElement, ImageAssetProps>(
  (
    {
      className,
      asset,
      width,
      height,
      sizes,
      lazy = true,
      sizePreset = "full",
      onLoad,
      ...props
    },
    ref,
  ) => {
    if (!asset.filename) return null;
    const isFixedSize = Boolean(width && height);
    const loading = lazy ? "lazy" : "eager";

    return (
      <Image
        ref={ref}
        className={classNames("col-span-full", className)}
        src={asset.filename}
        alt={asset.alt || asset.name || "Image"}
        loading={loading}
        width={isFixedSize ? width : undefined}
        height={isFixedSize ? height : undefined}
        fill={isFixedSize === false}
        sizes={isFixedSize ? sizes : (sizes ?? IMAGE_SIZES[sizePreset])}
        loader={storyblokImageLoader}
        {...props}
      />
    );
  },
);

ImageAsset.displayName = "ImageAsset";

export default memo(ImageAsset);
