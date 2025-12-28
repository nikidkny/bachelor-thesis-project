import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { type Texture } from "three";
import { isImage } from "@/utils/file";

export type MediaTexture = {
  texture: Texture;
  width: number;
  height: number;
};

const DEFAULT_SIZE = 1024;


export function useMediaTexture(src: string =""): MediaTexture {
    const isImg= isImage(src)
  const encodedSrc = src.replace("a.storyblok", "a2.storyblok");;


  const imageTexture = useTexture( isImg? encodedSrc : "/empty/jpeg.jpg");

  const { width, height } = useMemo(() => {
    const width = imageTexture?.image ?? DEFAULT_SIZE;
    const height = imageTexture?.image?.height ?? DEFAULT_SIZE;

    return {
      texture: imageTexture,
      width: width,
      height: height,
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

  return state;
}

export default useMediaTexture;