import { useTexture } from "@react-three/drei";
import {  useMemo } from "react";
import { type Texture } from "three";
import { isImage } from "@/utils/file";
import * as THREE from "three";

export type MediaTexture = {
  texture: Texture;
  width: number;
  height: number;
};

const DEFAULT_SIZE = 1024;


export function useMediaTexture(
  src: string = "",
  // width = DEFAULT_SIZE,
): MediaTexture {
  const isImg = isImage(src);
  // const optimsedImage = isImg ? storyblokImageLoader(src) : null;
  const encodedSrc = src.replace("a.storyblok", "a2.storyblok");

  const imageTexture = useTexture(
    isImg ? encodedSrc : "/empty/jpeg.jpg",
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    },
  );

  const { width, height } = useMemo(() => {
    const ImgWidth = imageTexture?.image.width ?? DEFAULT_SIZE;
    const ImgHeight = imageTexture?.image?.height ?? DEFAULT_SIZE;

    return {
      texture: imageTexture,
      width: ImgWidth,
      height: ImgHeight,
    };
  }, [imageTexture]);

  const state = useMemo<MediaTexture>(
    () => ({
      texture: imageTexture,
      width,
      height,
    }),
    [imageTexture, width, height],
  );
  // applyObjectContain(state.texture, state.width, state.height);
  return state;
}

export default useMediaTexture;
